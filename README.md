# SLG 增量监控 H5 工具

## 当前版本

这是在线数据版 H5。前端会优先读取 `data/state.json`，适合部署到 GitHub Pages。没有网络或本地直接打开时，会回退到内置数据和浏览器 `localStorage`。

## 打开方式

本地打开：

`C:\Users\TU\Desktop\H5文件\260701\SLG增量监控\index.html`

GitHub Pages 上线后访问：

`https://lir1212.github.io/mesmer/`

## 已实现功能

- 热度最高 50 款 SLG 手游监控池，可参考 Google Play 手机游戏榜单
- 上周新测试或新上线 SLG 候选池
- 日报随时查看，支持日期、游戏多选、广告平台和关键词筛选
- 游戏库基础信息：发行商、题材、玩法标签、App ID、包名、官网、商店链接、主要市场、热度分
- 版本活动时间线
- 买量素材卡片：平台、国家、语言、格式、钩子、标签、来源、置信度
- 周报：每周一生成上个自然周 `[上周一, 本周一)`
- 月报：每月 30 号所在周的下一周周一生成；如果当月未结束，顺延到月末后的第一个周一
- GitHub Actions 每天北京时间 09:00 自动更新 `data/*.json`
- 自动尝试采集 Google Play 手机游戏榜单候选和 APKCombo 策略候选，失败会写入日志但不阻断报告
- OpenAI API 可选：只在配置 `OPENAI_API_KEY` 时对新游候选做低成本 SLG 初筛

## 在线数据文件

- `data/state.json`：前端主要读取的数据源
- `data/daily.json`：当前日报快照
- `data/weekly.json`：当前周报快照
- `data/monthly.json`：当前月报快照
- `data/manual-import.json`：人工补充数据入口，会被脚本合并进 `state.json`
- `data/source-log.json`：自动采集日志，记录 Google Play / APKCombo 成功或失败状态

## GitHub Pages 启用

1. 上传整个项目到 GitHub 仓库。
2. 进入仓库 `Settings`。
3. 左侧点 `Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，Folder 选择 `/root`。
6. 保存后等待 1-3 分钟。

## GitHub Actions 自动更新

工作流文件：`.github/workflows/update-slg-data.yml`

默认每天 UTC 01:00 运行，即北京时间 09:00。脚本每次都会更新：

- `data/state.json`
- `data/daily.json`
- `data/weekly.json`
- `data/monthly.json`

周报和月报不需要单独任务，`scripts/update-data.mjs` 会按日期规则计算当前应该展示的报告周期。脚本会先尝试远程采集候选，采集失败只写入 `data/source-log.json`，不会阻断日报、周报和月报生成。

## OpenAI API Key 设置

如果需要 AI 低成本初筛：

1. 进入 GitHub 仓库 `Settings`。
2. 点 `Secrets and variables`。
3. 点 `Actions`。
4. 新建 Repository secret：

`OPENAI_API_KEY`

值填你的 OpenAI API key。

不设置也能运行，只是不会调用 AI，不会消耗 token。

## 自动采集和低 token 策略

当前脚本默认尽量不花 token：

- 普通统计、远程页面候选提取、周报/月报日期计算、JSON 更新都不调用模型。
- 只有发现新测试/新上线候选，并且存在 `OPENAI_API_KEY` 时，才调用一次模型做 SLG 初筛。
- 默认模型是 `gpt-4.1-mini`，输出限制为 `max_output_tokens: 500`。
- 不上传视频、不处理大文本、不重复分析已存在游戏。
- 如需临时关闭远程采集，可在 Actions 环境变量中设置 `DISABLE_REMOTE_COLLECT=1`。

后续如果接公告总结和买量视频标签，建议继续遵守：只分析新增 hash、先规则过滤、缓存模型结果、周报用已有结构化数据生成。


## 商业数据源接入

已预留 AppMagic、Sensor Tower、data.ai、Apptica 四类入口。没有账号或 URL 时会自动跳过，不影响报告。

GitHub Secrets 可选配置：

- `APPMAGIC_URL` / `APPMAGIC_API_KEY`
- `SENSOR_TOWER_URL` / `SENSOR_TOWER_API_KEY`
- `DATA_AI_URL` / `DATA_AI_API_KEY`
- `APPTICA_URL` / `APPTICA_API_KEY`

如果平台导出 CSV，也可以放到：

`data/commercial-sources/`

文件名前缀建议：

- `appmagic-*.csv`
- `sensor-tower-*.csv`
- `data-ai-*.csv`
- `apptica-*.csv`

模板文件已放在同目录，文件名含 `template` 的不会被导入。

支持字段包括：`name/app_name/title`、`publisher/developer`、`type/listType/category`、`markets/countries`、`heatScore/score/revenue/downloads`、`sourceUrl/url`。

## Playwright 浏览器采集

GitHub Actions 会安装 Playwright 并运行：

`node scripts/playwright-collect.mjs`

它会浏览器级访问 Google Play 和 APKCombo，并输出：

`data/playwright-candidates.json`

如果浏览器采集失败，工作流会继续运行主脚本，失败信息会进入 `data/source-log.json`。
## 人工补充数据

把人工整理的数据写入 `data/manual-import.json`，格式如下：

```json
{
  "games": [
    {
      "id": "new-slg-唯一ID",
      "name": "New SLG Candidate",
      "publisher": "APKCombo/人工候选",
      "theme": "末日生存",
      "gameplay": ["城建", "联盟战", "SLG候选"],
      "lastUpdated": "2026-07-02",
      "heatScore": 0,
      "confidence": "低",
      "status": "待人工确认",
      "listType": "newLaunch",
      "sourceHint": "APKCombo 策略新上线候选，需确认是 SLG 手游"
    }
  ],
  "events": [],
  "creatives": []
}
```

保存后手动运行一次 GitHub Actions，或等第二天自动运行。

## 注意

Google Play 手机游戏榜单可作为热度池参考，APKCombo 可作为“上周新测试或新上线”候选源，但必须用 SLG 规则过滤。当前脚本没有强爬第三方网站，避免因为反爬、页面结构变化或条款限制导致任务不稳定。要实现真实全球热度 50 款，建议接 Sensor Tower、data.ai、AppMagic、Apptica 或你们内部榜单。