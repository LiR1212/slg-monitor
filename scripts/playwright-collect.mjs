import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "data", "playwright-candidates.json");

const targets = [
  {
    source: "Google Play games playwright",
    url: "https://play.google.com/store/games?device=phone",
    listType: "hot50"
  },
  {
    source: "APKCombo strategy playwright",
    url: "https://apkcombo.com/zh/game/strategy/",
    listType: "newLaunch"
  }
];

const positive = ["war", "wars", "king", "kingdom", "empire", "survival", "state", "rise", "clash", "lord", "mafia", "zombie", "doomsday", "shelter", "castle", "conquest", "battle", "commander", "fleet", "galaxy", "age", "order", "throne", "dragon", "viking", "pirate", "naval", "civilization", "alliance", "strategy"];
const negative = ["puzzle", "mahjong", "solitaire", "sudoku", "chess", "music", "dress", "color", "word", "casino", "slot", "racing", "football", "soccer"];

await main();

async function main() {
  const results = [];
  const logs = [];

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch (error) {
    await writeOutput(results, [{ source: "playwright", ok: false, message: "Playwright package not installed" }]);
    return;
  }

  const browser = await chromium.launch({ headless: true });
  try {
    for (const target of targets) {
      const page = await browser.newPage({
        locale: "zh-CN",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
      });
      try {
        await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 30000 });
        await page.waitForTimeout(2500);
        const names = await page.evaluate(() => {
          const values = [];
          document.querySelectorAll("[aria-label], img[alt], a, div, span").forEach((node) => {
            const aria = node.getAttribute && node.getAttribute("aria-label");
            const alt = node.getAttribute && node.getAttribute("alt");
            const text = node.innerText || node.textContent || "";
            [aria, alt, text].forEach((value) => {
              if (value && value.length >= 3 && value.length <= 80) values.push(value.trim());
            });
          });
          return values;
        });
        const candidates = uniqueByName(names.map(cleanName).filter(isLikelySlgName)).slice(0, 30).map((name, index) => ({
          id: `${target.listType}-${slugify(name)}-pw`,
          name,
          source: target.source,
          sourceUrl: target.url,
          rank: index + 1,
          listType: target.listType
        }));
        results.push(...candidates);
        logs.push({ source: target.source, ok: true, extracted: candidates.length });
      } catch (error) {
        logs.push({ source: target.source, ok: false, message: error.message });
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  await writeOutput(results, logs);
}

async function writeOutput(candidates, logs) {
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), candidates, logs }, null, 2), "utf8");
  console.log(`Playwright candidates=${candidates.length}`);
}

function cleanName(value) {
  return String(value || "")
    .replace(/Google Play|APKCombo|Android|Games|游戏|策略|排行榜|热门|新上线|广告|安装|评分/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isLikelySlgName(name) {
  const text = name.toLowerCase();
  return name.length >= 3 && name.length <= 64 && positive.some((word) => text.includes(word)) && !negative.some((word) => text.includes(word));
}

function uniqueByName(names) {
  const seen = new Set();
  const out = [];
  for (const name of names) {
    const key = name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "");
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(name);
  }
  return out;
}

function slugify(name) {
  const slug = String(name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return slug || `candidate-${Math.random().toString(36).slice(2, 8)}`;
}