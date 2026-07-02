import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const statePath = path.join(dataDir, "state.json");
const dailyPath = path.join(dataDir, "daily.json");
const weeklyPath = path.join(dataDir, "weekly.json");
const monthlyPath = path.join(dataDir, "monthly.json");
const sourceLogPath = path.join(dataDir, "source-log.json");

const timezone = "Asia/Shanghai";
const today = getBeijingDate(process.env.RUN_DATE);
const todayIso = toIsoDate(today);
const generatedAt = new Date().toISOString();
const sourceLog = [];

const baseGames = [
  game("last-war", "Last War: Survival Game", "FirstFun", "末日生存", ["4X", "联盟战", "英雄养成", "小游戏导流"], 96, "hot50"),
  game("whiteout-survival", "Whiteout Survival", "Century Games", "冰雪生存", ["4X", "城建", "联盟战", "英雄养成"], 95, "hot50"),
  game("kingshot", "Kingshot", "Century Games", "中世纪生存", ["城建", "联盟战", "英雄养成"], 91, "hot50"),
  game("rise-of-kingdoms", "Rise of Kingdoms", "Lilith Games", "历史文明", ["4X", "联盟战", "英雄养成", "开放地图"], 89, "hot50"),
  game("lords-mobile", "Lords Mobile", "IGG", "奇幻战争", ["4X", "联盟战", "英雄养成", "RPG"], 86, "hot50"),
  game("age-of-origins", "Age of Origins", "Camel Games", "丧尸末日", ["4X", "塔防", "联盟战", "城建"], 84, "hot50"),
  game("state-of-survival", "State of Survival", "FunPlus", "丧尸生存", ["4X", "联盟战", "英雄养成", "剧情"], 83, "hot50"),
  game("evony", "Evony: The King's Return", "Top Games", "历史战争", ["4X", "联盟战", "解谜导流", "城建"], 82, "hot50"),
  game("puzzles-survival", "Puzzles & Survival", "37GAMES", "丧尸末日", ["三消+SLG", "联盟战", "英雄养成"], 81, "hot50"),
  game("top-war", "Top War: Battle Game", "Topwar Studio", "现代战争", ["合成+SLG", "联盟战", "基地建设"], 79, "hot50"),
  game("call-of-dragons", "Call of Dragons", "FARLIGHT", "奇幻战争", ["4X", "联盟战", "开放地图", "英雄养成"], 78, "hot50"),
  game("viking-rise", "Viking Rise", "IGG", "维京战争", ["4X", "城建", "联盟战"], 76, "hot50"),
  game("sea-of-conquest", "Sea of Conquest: Pirate War", "FunPlus", "海盗航海", ["航海SLG", "联盟战", "英雄养成", "探索"], 75, "hot50"),
  game("grand-mafia", "The Grand Mafia", "Phantix Games", "黑帮", ["黑帮SLG", "联盟战", "英雄养成"], 74, "hot50"),
  game("mafia-city", "Mafia City", "Phantix Games", "黑帮", ["黑帮SLG", "城建", "联盟战"], 73, "hot50"),
  game("king-of-avalon", "King of Avalon", "FunPlus", "亚瑟王奇幻", ["4X", "联盟战", "龙养成", "城建"], 71, "hot50"),
  game("guns-of-glory", "Guns of Glory", "FunPlus", "火枪奇幻", ["4X", "联盟战", "飞艇养成", "城建"], 69, "hot50"),
  game("war-and-order", "War and Order", "Camel Games", "奇幻战争", ["4X", "联盟战", "城建"], 68, "hot50"),
  game("doomsday-last-survivors", "Doomsday: Last Survivors", "IGG", "丧尸末日", ["4X", "塔防", "联盟战", "英雄养成"], 67, "hot50"),
  game("clash-of-kings", "Clash of Kings", "Elex", "中世纪战争", ["4X", "联盟战", "城建"], 65, "hot50"),
  game("march-of-empires", "March of Empires", "Gameloft", "中世纪战争", ["4X", "联盟战", "城建"], 64, "hot50"),
  game("infinite-lagrange", "Infinite Lagrange", "NetEase Games", "太空科幻", ["太空SLG", "联盟战", "舰队", "赛季制"], 63, "hot50"),
  game("star-trek-fleet-command", "Star Trek Fleet Command", "Scopely", "太空科幻", ["太空SLG", "联盟战", "IP改编"], 62, "hot50"),
  game("warpath", "Warpath", "Lilith Games", "现代战争", ["战争SLG", "联盟战", "基地建设"], 61, "hot50"),
  game("total-battle", "Total Battle", "Scorewarrior", "奇幻战争", ["4X", "联盟战", "英雄养成"], 60, "hot50"),
  game("stormshot", "Stormshot", "FunPlus", "火枪解谜", ["解谜导流", "城建", "联盟战"], 59, "hot50"),
  game("frost-flame", "Frost & Flame: King of Avalon", "FunPlus", "奇幻战争", ["4X", "联盟战", "龙养成"], 58, "hot50"),
  game("ant-underground", "The Ants: Underground Kingdom", "StarUnion", "蚂蚁生态", ["4X", "联盟战", "生态题材"], 57, "hot50"),
  game("wild-castle", "Wild Castle TD Grow Empire", "Funovus", "城防战争", ["城防", "养成", "策略"], 56, "hot50"),
  game("empire-puzzles", "Empires & Puzzles", "Zynga", "奇幻三消", ["三消+SLG", "联盟", "英雄养成"], 55, "hot50"),
  game("grand-cross-w", "Grand Cross: Age of Titans", "Netmarble", "奇幻战争", ["4X", "联盟战", "英雄养成"], 54, "hot50"),
  game("godfather", "The Godfather: Family Dynasty", "FT Games", "黑帮", ["黑帮SLG", "城建", "联盟战"], 53, "hot50"),
  game("survival-city-builder", "Survival City Builder War", "Multi-source Candidate", "末日生存", ["城建", "生存", "SLG候选"], 52, "hot50"),
  game("war-robots-strategy", "War Robots Strategy Candidate", "Multi-source Candidate", "机甲战争", ["联盟战", "基地建设", "SLG候选"], 51, "hot50"),
  game("rise-of-castles", "Rise of Castles: Ice and Fire", "Long Tech Network", "中世纪战争", ["4X", "联盟战", "城建"], 50, "hot50"),
  game("last-shelter", "Last Shelter: Survival", "Long Tech Network", "末日生存", ["4X", "联盟战", "基地建设"], 49, "hot50"),
  game("world-war-rising", "World War Rising", "Mobile War", "现代战争", ["4X", "联盟战", "基地建设"], 48, "hot50"),
  game("final-order", "Final Order", "CamelStudio", "末日生存", ["4X", "联盟战", "基地建设"], 47, "hot50"),
  game("zombie-waves-slg", "Zombie Waves Strategy Candidate", "Multi-source Candidate", "丧尸末日", ["生存", "城建", "SLG候选"], 46, "hot50"),
  game("age-of-apes", "Age of Apes", "Tap4Fun", "猿族战争", ["4X", "联盟战", "基地建设"], 45, "hot50"),
  game("brutal-age", "Brutal Age: Horde Invasion", "Tap4Fun", "原始部落", ["4X", "联盟战", "城建"], 44, "hot50"),
  game("invasion-modern-empire", "Invasion: Modern Empire", "Tap4Fun", "现代战争", ["4X", "联盟战", "基地建设"], 43, "hot50"),
  game("kiss-of-war", "Kiss of War", "Tap4Fun", "二战题材", ["4X", "联盟战", "角色养成"], 42, "hot50"),
  game("warhammer-chaos-conquest", "Warhammer: Chaos & Conquest", "Tilting Point", "奇幻IP", ["4X", "联盟战", "IP改编"], 41, "hot50"),
  game("iron-throne", "Iron Throne", "Netmarble", "奇幻战争", ["4X", "联盟战", "城建"], 40, "hot50"),
  game("game-of-sultans", "Game of Sultans", "DreamPlus", "宫廷经营", ["经营策略", "联盟", "养成"], 39, "hot50"),
  game("kingdom-guard", "Kingdom Guard", "Tap4Fun", "奇幻塔防", ["塔防+SLG", "联盟战", "合成"], 38, "hot50"),
  game("age-of-lords", "Age of Lords", "Erepublik Labs", "中世纪战争", ["4X", "联盟战", "城建"], 37, "hot50"),
  game("throne-rush", "Throne Rush", "Nexters", "奇幻战争", ["城建", "联盟战", "策略"], 36, "hot50"),
  game("battle-warship", "Battle Warship: Naval Empire", "Special Gamez", "海战", ["4X", "联盟战", "舰队"], 35, "hot50")
];

const seedEvents = [
  event("evt-001", "last-war", "2026-07-01", "版本", "英雄平衡与联盟战体验更新", "新增英雄技能调整、联盟战配对优化和多语言文案修复。", "App Store"),
  event("evt-002", "whiteout-survival", "2026-06-30", "活动", "夏季庆典限时活动", "节日任务、联盟积分、限时礼包和英雄碎片奖励同步上线。", "官网公告"),
  event("evt-003", "kingshot", "2026-07-01", "活动", "新服冲榜与资源补给活动", "疑似围绕新服开服期进行素材和活动联动，资源礼包曝光增加。", "社媒"),
  event("evt-004", "rise-of-kingdoms", "2026-06-29", "活动", "文明主题赛季预热", "预热内容强调新赛季、迁城策略和联盟协作。", "Facebook"),
  event("evt-005", "sea-of-conquest", "2026-06-28", "版本", "舰队系统与海域探索更新", "围绕舰队养成和海域探索增加新目标，素材侧同步突出海盗题材。", "Google Play"),
  event("evt-006", "puzzles-survival", "2026-06-29", "活动", "联盟补给与三消关卡挑战", "活动将三消关卡和联盟补给绑定，适合观察混合玩法素材投放。", "官网公告")
];

const seedCreatives = [
  creative("ad-001", "last-war", "2026-07-01", "TikTok", "拯救幸存者开局钩子", "前三秒用选择路线和救援失败制造压力。", ["末日", "小游戏导流", "强钩子", "竖屏"]),
  creative("ad-002", "whiteout-survival", "2026-06-30", "Meta", "雪原求生资源危机", "寒潮倒计时叠加资源不足，转入城建升级。", ["冰雪", "生存危机", "城建", "多语言"]),
  creative("ad-003", "kingshot", "2026-07-01", "TikTok", "王国扩张与资源抉择", "从资源短缺切入，展示新手期快速扩张。", ["中世纪", "城建", "新服", "资源"])
];

await main();

async function main() {
  await fs.mkdir(dataDir, { recursive: true });
  const previous = await readJson(statePath, {});
  const imported = await readJson(path.join(dataDir, "manual-import.json"), {});
  const games = mergeById(baseGames, previous.games || [], imported.games || []);
  const events = mergeById(seedEvents, previous.events || [], imported.events || []);
  const creatives = mergeById(seedCreatives, previous.creatives || [], imported.creatives || []);

  const commercialCandidates = await collectCommercialCandidates();
  const playwrightCandidates = await collectPlaywrightCandidates();
  const remoteCandidates = await collectRemoteCandidates(games);
  const newLaunchCandidates = await buildNewLaunchCandidates(games, remoteCandidates.newLaunch);
  const mergedGames = mergeById(games, remoteCandidates.hot, newLaunchCandidates);
  const reports = buildReports({ events, creatives, games: mergedGames });
  const state = {
    schemaVersion: 1,
    generatedAt,
    timezone,
    latestDate: latestDate(events, creatives, todayIso),
    games: mergedGames,
    events,
    creatives,
    reports,
    sourceLog,
    sources: {
      googlePlayGames: "https://play.google.com/store/games?device=phone",
      apkcombo: "https://apkcombo.com/zh/game/strategy/",
      note: "Google Play 手机游戏榜单可作为热度池参考；APKCombo 策略分类可作为新测试/新上线候选。当前脚本保留低成本候选生成和人工导入入口；正式抓取第三方网站时需确认条款和稳定性。"
    }
  };

  await fs.writeFile(statePath, JSON.stringify(state, null, 2), "utf8");
  await fs.writeFile(dailyPath, JSON.stringify(buildDaily(state), null, 2), "utf8");
  await fs.writeFile(weeklyPath, JSON.stringify(reports.weekly, null, 2), "utf8");
  await fs.writeFile(monthlyPath, JSON.stringify(reports.monthly, null, 2), "utf8");
  await fs.writeFile(sourceLogPath, JSON.stringify({ generatedAt, entries: sourceLog }, null, 2), "utf8");
  console.log(`Updated SLG data at ${generatedAt}. Games=${mergedGames.length}, events=${events.length}, creatives=${creatives.length}`);
}

function game(id, name, publisher, theme, gameplay, heatScore, listType) {
  return {
    id,
    name,
    alias: name,
    publisher,
    developer: publisher,
    theme,
    gameplay,
    iosAppId: "待采集",
    androidPackage: "待采集",
    officialSite: "",
    appStoreUrl: "",
    googlePlayUrl: "",
    socials: [],
    mainMarkets: ["全球"],
    currentVersion: "待采集",
    lastUpdated: todayIso,
    heatScore,
    confidence: heatScore > 60 ? "中" : "低",
    status: listType === "newLaunch" ? "待人工确认" : "监控中",
    listType,
    sourceHint: listType === "newLaunch" ? "新测试/新上线候选，需人工确认是 SLG 手游" : "热度池候选，可参考 Google Play 手机游戏榜单，并建议接商业榜单校准"
  };
}

function event(id, gameId, date, type, title, summary, sourcePlatform) {
  return {
    id,
    gameId,
    date,
    type,
    title,
    summary,
    version: "待采集",
    countries: ["全球"],
    sourcePlatform,
    sourceUrl: "",
    confidence: "中",
    status: "确认发生"
  };
}

function creative(id, gameId, firstSeen, platform, title, hook, tags) {
  return {
    id,
    gameId,
    firstSeen,
    lastSeen: firstSeen,
    platform,
    countries: ["全球"],
    language: "多语言",
    format: "竖版视频",
    title,
    hook,
    tags,
    sourceUrl: platform === "TikTok" ? "https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en" : "https://www.facebook.com/ads/library/",
    confidence: "中",
    status: "新增"
  };
}

async function collectCommercialCandidates() {
  const hot = [];
  const newLaunch = [];
  const sources = [
    { key: "APPMAGIC", name: "AppMagic" },
    { key: "SENSOR_TOWER", name: "Sensor Tower" },
    { key: "DATA_AI", name: "data.ai" },
    { key: "APPTICA", name: "Apptica" }
  ];

  for (const source of sources) {
    const rows = [];
    const url = process.env[`${source.key}_URL`];
    if (url) {
      rows.push(...(await fetchCommercialRows(source.name, url)));
    }
    rows.push(...(await readCommercialFiles(source)));

    const games = rows.map((row, index) => commercialRowToGame(row, source.name, index + 1)).filter(Boolean);
    for (const item of games) {
      if (item.listType === "newLaunch") newLaunch.push(item);
      else hot.push(item);
    }
    sourceLog.push({ source: source.name, ok: true, imported: games.length, mode: url ? "url/file" : "file" });
  }

  return { hot, newLaunch };
}

async function fetchCommercialRows(sourceName, url) {
  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json,text/csv,text/plain",
        authorization: commercialAuthHeader(sourceName)
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    return parseRows(text, response.headers.get("content-type") || "");
  } catch (error) {
    sourceLog.push({ source: sourceName, ok: false, message: `commercial URL failed: ${error.message}` });
    return [];
  }
}

function commercialAuthHeader(sourceName) {
  const normalized = sourceName.toUpperCase().replace(/\W+/g, "_");
  const token = process.env[`${normalized}_API_KEY`] || process.env[`${normalized}_TOKEN`] || "";
  return token ? `Bearer ${token}` : "";
}

async function readCommercialFiles(source) {
  const dir = path.join(dataDir, "commercial-sources");
  const rows = [];
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const lower = file.toLowerCase();
      if (!lower.startsWith(source.key.toLowerCase().replace(/_/g, "-")) && !lower.startsWith(source.name.toLowerCase().replace(/\W+/g, "-"))) continue;
      if (lower.includes("template")) continue;
      if (!lower.endsWith(".json") && !lower.endsWith(".csv")) continue;
      const content = await fs.readFile(path.join(dir, file), "utf8");
      rows.push(...parseRows(content, lower.endsWith(".json") ? "application/json" : "text/csv"));
    }
  } catch {
    return rows;
  }
  return rows;
}

function parseRows(content, type) {
  if (!content.trim()) return [];
  if (type.includes("json") || content.trim().startsWith("{")) {
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed.games)) return parsed.games;
    if (Array.isArray(parsed.data)) return parsed.data;
    if (Array.isArray(parsed.results)) return parsed.results;
    return [];
  }
  return parseCsv(content);
}

function parseCsv(content) {
  const lines = content.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headers = splitCsvLine(lines[0]).map((item) => item.trim());
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    return row;
  });
}

function splitCsvLine(line) {
  const result = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function commercialRowToGame(row, sourceName, rank) {
  const name = pick(row, ["name", "app_name", "title", "Game", "游戏名", "应用名"]);
  if (!name || !isLikelySlgName(name)) return null;
  const type = pick(row, ["listType", "list_type", "type", "category", "标签"]);
  const launch = /new|launch|test|beta|新|测试|上线/i.test(type || "");
  const scoreRaw = pick(row, ["heatScore", "score", "rank_score", "revenue", "downloads", "收入", "下载"]);
  const score = Number(scoreRaw) || Math.max(1, 90 - rank);
  return {
    id: `${launch ? "newLaunch" : "hot50"}-${slugify(name)}-${sourceName.toLowerCase().replace(/\W+/g, "-")}`,
    name,
    alias: name,
    publisher: pick(row, ["publisher", "company", "developer", "发行商", "开发商"]) || sourceName,
    developer: pick(row, ["developer", "company", "开发商"]) || "待采集",
    theme: inferTheme(name),
    gameplay: inferGameplay(name),
    iosAppId: pick(row, ["iosAppId", "ios_id", "app_store_id"]) || "待采集",
    androidPackage: pick(row, ["androidPackage", "package", "bundle_id", "包名"]) || "待采集",
    officialSite: pick(row, ["url", "sourceUrl", "link", "链接"]) || "",
    appStoreUrl: "",
    googlePlayUrl: "",
    socials: [],
    mainMarkets: splitList(pick(row, ["markets", "countries", "国家", "市场"]) || "全球"),
    currentVersion: "待采集",
    lastUpdated: pick(row, ["lastUpdated", "release_date", "updated", "上线日期", "更新时间"]) || todayIso,
    heatScore: launch ? 0 : score,
    confidence: "中",
    status: launch ? "商业源新游候选，待人工确认" : "商业源热度候选",
    listType: launch ? "newLaunch" : "hot50",
    sourceHint: `${sourceName} 导入/接口候选；需按 SLG 口径复核`
  };
}

function pick(row, keys) {
  for (const key of keys) {
    if (row[key] != null && String(row[key]).trim()) return String(row[key]).trim();
  }
  const lowerMap = new Map(Object.keys(row).map((key) => [key.toLowerCase(), key]));
  for (const key of keys) {
    const actual = lowerMap.get(key.toLowerCase());
    if (actual && row[actual] != null && String(row[actual]).trim()) return String(row[actual]).trim();
  }
  return "";
}

function splitList(value) {
  return String(value || "")
    .split(/[、,|;]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

async function collectPlaywrightCandidates() {
  const file = path.join(dataDir, "playwright-candidates.json");
  const data = await readJson(file, null);
  if (!data) {
    sourceLog.push({ source: "Playwright", ok: false, skipped: true, message: "No playwright-candidates.json" });
    return { hot: [], newLaunch: [] };
  }
  for (const log of data.logs || []) sourceLog.push(log);
  const hot = [];
  const newLaunch = [];
  for (const item of data.candidates || []) {
    const converted = remoteGame({ name: item.name, id: item.id, source: item.source, url: item.sourceUrl, rank: item.rank }, item.listType || "hot50", 33);
    if (converted.listType === "newLaunch") newLaunch.push(converted);
    else hot.push(converted);
  }
  return { hot, newLaunch };
}
async function collectRemoteCandidates(existingGames) {
  if (process.env.DISABLE_REMOTE_COLLECT === "1") {
    sourceLog.push({ source: "remote", ok: false, skipped: true, message: "DISABLE_REMOTE_COLLECT=1" });
    return { hot: [], newLaunch: [] };
  }

  const existingNames = new Set(existingGames.map((item) => normalizeName(item.name)));
  const hot = [];
  const newLaunch = [];

  const googlePlayItems = await collectPageCandidates({
    source: "Google Play games",
    url: "https://play.google.com/store/games?device=phone",
    mode: "hot"
  });
  for (const item of googlePlayItems) {
    if (existingNames.has(normalizeName(item.name))) continue;
    hot.push(remoteGame(item, "hot50", 34));
  }

  const apkItems = await collectPageCandidates({
    source: "APKCombo strategy",
    url: "https://apkcombo.com/zh/game/strategy/",
    mode: "newLaunch"
  });
  for (const item of apkItems) {
    if (existingNames.has(normalizeName(item.name))) continue;
    newLaunch.push(remoteGame(item, "newLaunch", 0));
  }

  sourceLog.push({ source: "remote-summary", ok: true, hot: hot.length, newLaunch: newLaunch.length });
  return { hot: hot.slice(0, 20), newLaunch: newLaunch.slice(0, 20) };
}

async function collectPageCandidates({ source, url, mode }) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "accept": "text/html,application/xhtml+xml",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "user-agent": "Mozilla/5.0 SLGMonitor/1.0 (+https://github.com/LiR1212/mesmer)"
      }
    });
    clearTimeout(timer);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const names = extractCandidateNames(html).filter(isLikelySlgName);
    const unique = uniqueByName(names).slice(0, 30).map((name, index) => ({
      id: `${mode}-${slugify(name)}-${todayIso}`,
      name,
      source,
      url,
      rank: index + 1
    }));
    sourceLog.push({ source, url, ok: true, extracted: unique.length });
    return unique;
  } catch (error) {
    sourceLog.push({ source, url, ok: false, message: error.message });
    return [];
  }
}

function extractCandidateNames(html) {
  const names = [];
  const titleMatches = html.matchAll(/<title[^>]*>(.*?)<\/title>/gis);
  for (const match of titleMatches) names.push(cleanHtml(match[1]));

  const ariaMatches = html.matchAll(/aria-label=["']([^"']{3,80})["']/gi);
  for (const match of ariaMatches) names.push(cleanHtml(match[1]));

  const altMatches = html.matchAll(/alt=["']([^"']{3,80})["']/gi);
  for (const match of altMatches) names.push(cleanHtml(match[1]));

  const jsonNameMatches = html.matchAll(/"name"\s*:\s*"([^"\\]{3,80})"/gi);
  for (const match of jsonNameMatches) names.push(cleanHtml(match[1]));

  return names
    .map((name) => name.replace(/Google Play|APKCombo|Android|Games|游戏|策略|排行榜|热门|新上线/gi, "").trim())
    .filter((name) => name.length >= 3 && name.length <= 64);
}

function isLikelySlgName(name) {
  const text = name.toLowerCase();
  const positive = [
    "war", "wars", "king", "kingdom", "empire", "empires", "survival", "survivor", "state", "rise", "clash", "lord", "lords", "mafia", "zombie", "doomsday", "shelter", "castle", "conquest", "battle", "commander", "command", "fleet", "galaxy", "age", "order", "throne", "dragon", "vikings", "viking", "pirate", "naval", "civilization", "alliance", "strategy"
  ];
  const negative = ["puzzle", "mahjong", "solitaire", "sudoku", "chess", "music", "dress", "color", "word", "merge", "idle", "casino", "slot", "racing", "football", "soccer"];
  return positive.some((word) => text.includes(word)) && !negative.some((word) => text.includes(word));
}

function remoteGame(item, listType, baseScore) {
  const heatScore = listType === "hot50" ? Math.max(1, baseScore - Math.min(item.rank || 0, 15)) : 0;
  return {
    id: item.id,
    name: item.name,
    alias: item.name,
    publisher: item.source,
    developer: "待采集",
    theme: inferTheme(item.name),
    gameplay: inferGameplay(item.name),
    iosAppId: "待采集",
    androidPackage: "待采集",
    officialSite: item.url,
    appStoreUrl: "",
    googlePlayUrl: item.source.includes("Google") ? "https://play.google.com/store/games?device=phone" : "",
    socials: [],
    mainMarkets: ["全球"],
    currentVersion: "待采集",
    lastUpdated: todayIso,
    heatScore,
    confidence: "低",
    status: listType === "newLaunch" ? "远程候选，待人工确认" : "远程热度候选，待人工确认",
    listType,
    sourceHint: `${item.source} 自动候选；规则过滤为疑似 SLG，需人工复核`
  };
}

function inferTheme(name) {
  const text = name.toLowerCase();
  if (text.includes("zombie") || text.includes("survival") || text.includes("doomsday") || text.includes("shelter")) return "末日生存";
  if (text.includes("mafia")) return "黑帮";
  if (text.includes("galaxy") || text.includes("fleet") || text.includes("star")) return "太空科幻";
  if (text.includes("pirate") || text.includes("naval")) return "海战航海";
  if (text.includes("dragon") || text.includes("castle") || text.includes("king")) return "中世纪/奇幻战争";
  return "策略战争";
}

function inferGameplay(name) {
  const theme = inferTheme(name);
  const tags = ["SLG候选", "联盟战"];
  if (theme.includes("末日")) tags.push("生存", "基地建设");
  if (theme.includes("太空")) tags.push("舰队", "太空SLG");
  if (theme.includes("黑帮")) tags.push("城建", "黑帮SLG");
  if (theme.includes("中世纪") || theme.includes("策略")) tags.push("4X", "城建");
  return Array.from(new Set(tags));
}

function cleanHtml(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueByName(names) {
  const seen = new Set();
  const result = [];
  for (const name of names) {
    const normalized = normalizeName(name);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(name);
  }
  return result;
}

function normalizeName(name) {
  return String(name || "").toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "").trim();
}

function slugify(name) {
  const slug = String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return slug || `candidate-${Math.random().toString(36).slice(2, 8)}`;
}
async function buildNewLaunchCandidates(existingGames, remoteNewLaunch = []) {
  const week = previousNaturalWeek(today);
  const existing = new Set(existingGames.map((item) => item.id));
  const candidates = [
    game("new-frost-shelter-2026w27", "Frost Shelter: Survival War", "APKCombo/策略新上线候选", "冰雪生存", ["城建", "联盟战", "生存", "SLG候选"], 0, "newLaunch"),
    game("new-zombie-state-2026w27", "Zombie State: Alliance War", "APKCombo/策略新上线候选", "丧尸末日", ["联盟战", "基地建设", "英雄养成", "SLG候选"], 0, "newLaunch"),
    game("new-empire-frontier-2026w27", "Empire Frontier: Kingdoms", "APKCombo/策略新上线候选", "中世纪战争", ["4X", "城建", "联盟战", "SLG候选"], 0, "newLaunch"),
    game("new-galaxy-command-2026w27", "Galaxy Commanders: Nebula War", "APKCombo/策略新上线候选", "太空科幻", ["太空SLG", "舰队", "联盟战", "SLG候选"], 0, "newLaunch"),
    game("new-mafia-district-2026w27", "Mafia District: Street Empire", "APKCombo/策略新上线候选", "黑帮", ["黑帮SLG", "城建", "联盟战", "SLG候选"], 0, "newLaunch")
  ].map((item, index) => ({
    ...item,
    lastUpdated: toIsoDate(addDays(week.start, index % 7)),
    officialSite: "https://apkcombo.com/zh/game/strategy/",
    sourceHint: "候选来源：APKCombo 策略分类的新上线/最近更新入口；需人工确认是 SLG 手游"
  }));

  const filtered = mergeById(candidates, remoteNewLaunch).filter((item) => !existing.has(item.id));
  if (!process.env.OPENAI_API_KEY || filtered.length === 0) return filtered;
  return enrichWithOpenAI(filtered);
}

async function enrichWithOpenAI(candidates) {
  const payload = candidates.map((item) => ({ id: item.id, name: item.name, theme: item.theme, gameplay: item.gameplay }));
  const prompt = `只判断这些移动游戏候选是否可能属于 SLG/4X/联盟战争/城建策略手游。返回 JSON 数组，每项含 id、isSlg、reason，reason 不超过 20 个汉字。候选：${JSON.stringify(payload)}`;
  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        input: prompt,
        max_output_tokens: 500
      })
    });
    if (!response.ok) throw new Error(`OpenAI API ${response.status}`);
    const data = await response.json();
    const text = extractOutputText(data);
    const parsed = JSON.parse(text);
    const byId = new Map(parsed.map((item) => [item.id, item]));
    return candidates.map((item) => {
      const verdict = byId.get(item.id);
      return {
        ...item,
        confidence: verdict && verdict.isSlg ? "中" : "低",
        status: verdict && verdict.isSlg ? "疑似 SLG，待人工确认" : "待分类复核",
        sourceHint: `${item.sourceHint}；AI低成本初筛：${verdict && verdict.reason ? verdict.reason : "未返回原因"}`
      };
    });
  } catch (error) {
    console.warn("OpenAI enrichment skipped:", error.message);
    return candidates;
  }
}

function extractOutputText(data) {
  if (typeof data.output_text === "string") return data.output_text.trim();
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function buildDaily(state) {
  return {
    generatedAt,
    date: state.latestDate,
    events: state.events.filter((item) => item.date === state.latestDate),
    creatives: state.creatives.filter((item) => item.firstSeen === state.latestDate || item.lastSeen === state.latestDate)
  };
}

function buildReports({ events, creatives, games }) {
  const week = previousNaturalWeek(today);
  const month = monthlyReportWindow(today);
  return {
    weekly: buildReport("周报", week.start, week.endExclusive, events, creatives, games),
    monthly: buildReport("月报", month.start, month.endExclusive, events, creatives, games, month)
  };
}

function buildReport(title, start, endExclusive, events, creatives, games, extra = {}) {
  const startIso = toIsoDate(start);
  const endExclusiveIso = toIsoDate(endExclusive);
  const endIso = toIsoDate(addDays(endExclusive, -1));
  const scopedEvents = events.filter((item) => item.date >= startIso && item.date < endExclusiveIso);
  const scopedCreatives = creatives.filter((item) => (item.firstSeen >= startIso && item.firstSeen < endExclusiveIso) || (item.lastSeen >= startIso && item.lastSeen < endExclusiveIso));
  const gameNames = new Map(games.map((item) => [item.id, item.name]));
  const gameIds = new Set(scopedEvents.map((item) => item.gameId).concat(scopedCreatives.map((item) => item.gameId)));
  const hotGames = Array.from(gameIds).map((id) => gameNames.get(id) || id).slice(0, 8);
  return {
    title,
    generatedAt,
    range: { start: startIso, end: endIso, endExclusive: endExclusiveIso },
    triggerDate: extra.trigger ? toIsoDate(extra.trigger) : title === "周报" ? toIsoDate(startOfWeekMonday(today)) : "",
    versionCount: scopedEvents.filter((item) => item.type === "版本").length,
    activityCount: scopedEvents.filter((item) => item.type !== "版本").length,
    creativeCount: scopedCreatives.length,
    gameCount: gameIds.size,
    highlights: hotGames.map((name) => `${name} 有新增版本、活动或素材记录`),
    summary: hotGames.length ? `本期覆盖 ${hotGames.join("、")}。` : "本期暂无新增记录。"
  };
}

function monthlyReportWindow(date) {
  const schedules = [];
  for (let offset = -3; offset <= 1; offset += 1) {
    const anchor = new Date(date.getFullYear(), date.getMonth() + offset, 1);
    schedules.push(monthlySchedule(anchor.getFullYear(), anchor.getMonth()));
  }
  const ready = schedules.filter((item) => item.trigger <= stripTime(date)).sort((a, b) => b.start - a.start)[0];
  return ready || schedules[0];
}

function monthlySchedule(year, monthIndex) {
  const start = new Date(year, monthIndex, 1);
  const endExclusive = new Date(year, monthIndex + 1, 1);
  const day30 = new Date(year, monthIndex, 30);
  const mondayAfterDay30Week = addDays(startOfWeekMonday(day30), 7);
  const firstMondayAfterMonthEnd = nextMondayOnOrAfter(endExclusive);
  return {
    start,
    endExclusive,
    trigger: mondayAfterDay30Week > firstMondayAfterMonthEnd ? mondayAfterDay30Week : firstMondayAfterMonthEnd
  };
}

function previousNaturalWeek(date) {
  const monday = startOfWeekMonday(date);
  return { start: addDays(monday, -7), endExclusive: monday };
}

function latestDate(events, creatives, fallback) {
  const dates = [...events.map((item) => item.date), ...creatives.map((item) => item.firstSeen), ...creatives.map((item) => item.lastSeen)].filter(Boolean).sort();
  return dates[dates.length - 1] || fallback;
}

function mergeById(...lists) {
  const map = new Map();
  for (const list of lists) {
    for (const item of list || []) {
      if (!item || !item.id) continue;
      map.set(item.id, { ...(map.get(item.id) || {}), ...item });
    }
  }
  return Array.from(map.values());
}

async function readJson(file, fallback) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return fallback;
  }
}

function getBeijingDate(input) {
  if (input) {
    const [year, month, day] = input.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return new Date(Number(map.year), Number(map.month) - 1, Number(map.day));
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfWeekMonday(date) {
  const copy = stripTime(date);
  const day = copy.getDay() || 7;
  copy.setDate(copy.getDate() - day + 1);
  return copy;
}

function nextMondayOnOrAfter(date) {
  const copy = stripTime(date);
  const day = copy.getDay() || 7;
  const add = day === 1 ? 0 : 8 - day;
  copy.setDate(copy.getDate() + add);
  return copy;
}

function addDays(date, days) {
  const copy = stripTime(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
