(function () {
  "use strict";

  const STORAGE_KEY = "slg-monitor-state-v1";
  const ONLINE_STATE_URL = "./data/state.json";
  const today = new Date();
  const todayIso = toDateInput(today);

  const seedGames = [
    {
      id: "last-war",
      name: "Last War: Survival Game",
      alias: "Last War",
      publisher: "FirstFun",
      developer: "FirstFun",
      theme: "末日生存",
      gameplay: ["4X", "联盟战", "英雄养成", "小游戏导流"],
      iosAppId: "6448786147",
      androidPackage: "com.fun.lastwar.gp",
      officialSite: "https://lastwar.com/",
      appStoreUrl: "https://apps.apple.com/app/id6448786147",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.fun.lastwar.gp",
      socials: ["Facebook", "YouTube", "TikTok"],
      mainMarkets: ["US", "JP", "KR", "DE", "BR"],
      currentVersion: "1.0.310",
      lastUpdated: "2026-07-01",
      heatScore: 96,
      confidence: "高",
      status: "重点监控"
    },
    {
      id: "whiteout-survival",
      name: "Whiteout Survival",
      alias: "无尽冬日",
      publisher: "Century Games",
      developer: "Century Games",
      theme: "冰雪生存",
      gameplay: ["4X", "城建", "联盟战", "英雄养成"],
      iosAppId: "6443575749",
      androidPackage: "com.gof.global",
      officialSite: "https://www.whiteoutsurvival.com/",
      appStoreUrl: "https://apps.apple.com/app/id6443575749",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.gof.global",
      socials: ["Facebook", "Discord", "YouTube", "TikTok"],
      mainMarkets: ["US", "JP", "KR", "TW", "DE"],
      currentVersion: "1.24.5",
      lastUpdated: "2026-06-30",
      heatScore: 95,
      confidence: "高",
      status: "重点监控"
    },
    {
      id: "kingshot",
      name: "Kingshot",
      alias: "Kingshot",
      publisher: "Century Games",
      developer: "Century Games",
      theme: "中世纪生存",
      gameplay: ["城建", "联盟战", "英雄养成"],
      iosAppId: "6740096958",
      androidPackage: "com.centurygame.kingshot",
      officialSite: "https://www.centurygames.com/",
      appStoreUrl: "https://apps.apple.com/app/id6740096958",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.centurygame.kingshot",
      socials: ["Facebook", "TikTok"],
      mainMarkets: ["US", "JP", "KR", "SEA"],
      currentVersion: "1.6.8",
      lastUpdated: "2026-07-01",
      heatScore: 91,
      confidence: "中",
      status: "增长监控"
    },
    {
      id: "rise-of-kingdoms",
      name: "Rise of Kingdoms",
      alias: "万国觉醒",
      publisher: "Lilith Games",
      developer: "Lilith Games",
      theme: "历史文明",
      gameplay: ["4X", "联盟战", "英雄养成", "开放地图"],
      iosAppId: "1354260888",
      androidPackage: "com.lilithgame.roc.gp",
      officialSite: "https://rok.lilith.com/",
      appStoreUrl: "https://apps.apple.com/app/id1354260888",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.lilithgame.roc.gp",
      socials: ["Facebook", "Discord", "YouTube"],
      mainMarkets: ["US", "KR", "TW", "DE", "FR"],
      currentVersion: "1.0.98",
      lastUpdated: "2026-06-28",
      heatScore: 89,
      confidence: "高",
      status: "成熟监控"
    },
    {
      id: "lords-mobile",
      name: "Lords Mobile",
      alias: "王国纪元",
      publisher: "IGG",
      developer: "IGG",
      theme: "奇幻战争",
      gameplay: ["4X", "联盟战", "英雄养成", "RPG"],
      iosAppId: "1071976327",
      androidPackage: "com.igg.android.lordsmobile",
      officialSite: "https://lordsmobile.igg.com/",
      appStoreUrl: "https://apps.apple.com/app/id1071976327",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.igg.android.lordsmobile",
      socials: ["Facebook", "YouTube", "TikTok"],
      mainMarkets: ["US", "BR", "TR", "DE", "SEA"],
      currentVersion: "2.158",
      lastUpdated: "2026-06-25",
      heatScore: 86,
      confidence: "高",
      status: "成熟监控"
    },
    {
      id: "age-of-origins",
      name: "Age of Origins",
      alias: "Age of Z Origins",
      publisher: "Camel Games",
      developer: "Camel Games",
      theme: "丧尸末日",
      gameplay: ["4X", "塔防", "联盟战", "城建"],
      iosAppId: "1376515087",
      androidPackage: "com.camelgames.aoz",
      officialSite: "https://www.camelgames.com/",
      appStoreUrl: "https://apps.apple.com/app/id1376515087",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.camelgames.aoz",
      socials: ["Facebook", "YouTube"],
      mainMarkets: ["US", "JP", "DE", "FR", "BR"],
      currentVersion: "1.3.763",
      lastUpdated: "2026-06-27",
      heatScore: 84,
      confidence: "中",
      status: "成熟监控"
    },
    {
      id: "state-of-survival",
      name: "State of Survival",
      alias: "SOS",
      publisher: "FunPlus",
      developer: "FunPlus",
      theme: "丧尸生存",
      gameplay: ["4X", "联盟战", "英雄养成", "剧情"],
      iosAppId: "1452474937",
      androidPackage: "com.kingsgroup.sos",
      officialSite: "https://www.stateofsurvival.com/",
      appStoreUrl: "https://apps.apple.com/app/id1452474937",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.kingsgroup.sos",
      socials: ["Facebook", "Discord", "YouTube"],
      mainMarkets: ["US", "DE", "FR", "BR", "SEA"],
      currentVersion: "1.23.50",
      lastUpdated: "2026-06-26",
      heatScore: 83,
      confidence: "高",
      status: "成熟监控"
    },
    {
      id: "evony",
      name: "Evony: The King's Return",
      alias: "Evony",
      publisher: "Top Games",
      developer: "Top Games",
      theme: "历史战争",
      gameplay: ["4X", "联盟战", "解谜导流", "城建"],
      iosAppId: "1098157959",
      androidPackage: "com.topgamesinc.evony",
      officialSite: "https://www.evony.com/",
      appStoreUrl: "https://apps.apple.com/app/id1098157959",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.topgamesinc.evony",
      socials: ["Facebook", "YouTube", "TikTok"],
      mainMarkets: ["US", "JP", "KR", "DE", "UK"],
      currentVersion: "4.91.0",
      lastUpdated: "2026-06-24",
      heatScore: 82,
      confidence: "高",
      status: "成熟监控"
    },
    {
      id: "puzzles-survival",
      name: "Puzzles & Survival",
      alias: "末日喧嚣",
      publisher: "37GAMES",
      developer: "37GAMES",
      theme: "丧尸末日",
      gameplay: ["三消+SLG", "联盟战", "英雄养成"],
      iosAppId: "1517980891",
      androidPackage: "com.global.ztmslg",
      officialSite: "https://pns.37games.com/",
      appStoreUrl: "https://apps.apple.com/app/id1517980891",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.global.ztmslg",
      socials: ["Facebook", "Discord"],
      mainMarkets: ["US", "JP", "KR", "TW", "DE"],
      currentVersion: "7.0.190",
      lastUpdated: "2026-06-29",
      heatScore: 81,
      confidence: "高",
      status: "成熟监控"
    },
    {
      id: "top-war",
      name: "Top War: Battle Game",
      alias: "Top War",
      publisher: "Topwar Studio",
      developer: "RiverGame",
      theme: "现代战争",
      gameplay: ["合成+SLG", "联盟战", "基地建设"],
      iosAppId: "1479198816",
      androidPackage: "com.topwar.gp",
      officialSite: "https://www.topwargame.com/",
      appStoreUrl: "https://apps.apple.com/app/id1479198816",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.topwar.gp",
      socials: ["Facebook", "YouTube"],
      mainMarkets: ["US", "JP", "KR", "DE", "BR"],
      currentVersion: "1.523.0",
      lastUpdated: "2026-06-23",
      heatScore: 79,
      confidence: "中",
      status: "成熟监控"
    },
    {
      id: "call-of-dragons",
      name: "Call of Dragons",
      alias: "龙与家园",
      publisher: "FARLIGHT",
      developer: "Legou Games",
      theme: "奇幻战争",
      gameplay: ["4X", "联盟战", "开放地图", "英雄养成"],
      iosAppId: "1605557132",
      androidPackage: "com.farlightgames.samo.gp",
      officialSite: "https://callofdragons.farlightgames.com/",
      appStoreUrl: "https://apps.apple.com/app/id1605557132",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.farlightgames.samo.gp",
      socials: ["Facebook", "Discord", "YouTube"],
      mainMarkets: ["US", "KR", "DE", "FR", "SEA"],
      currentVersion: "1.0.33",
      lastUpdated: "2026-06-22",
      heatScore: 78,
      confidence: "高",
      status: "增长监控"
    },
    {
      id: "viking-rise",
      name: "Viking Rise",
      alias: "Viking Rise",
      publisher: "IGG",
      developer: "IGG",
      theme: "维京战争",
      gameplay: ["4X", "城建", "联盟战"],
      iosAppId: "6443643987",
      androidPackage: "com.igg.android.vikingriseglobal",
      officialSite: "https://vikingrise.igg.com/",
      appStoreUrl: "https://apps.apple.com/app/id6443643987",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.igg.android.vikingriseglobal",
      socials: ["Facebook", "YouTube", "TikTok"],
      mainMarkets: ["US", "DE", "FR", "TR", "BR"],
      currentVersion: "1.4.288",
      lastUpdated: "2026-06-21",
      heatScore: 76,
      confidence: "高",
      status: "增长监控"
    },
    {
      id: "sea-of-conquest",
      name: "Sea of Conquest: Pirate War",
      alias: "Sea of Conquest",
      publisher: "FunPlus",
      developer: "FunPlus",
      theme: "海盗航海",
      gameplay: ["航海SLG", "联盟战", "英雄养成", "探索"],
      iosAppId: "6466773554",
      androidPackage: "com.seaofconquest.global",
      officialSite: "https://soc.funplus.com/",
      appStoreUrl: "https://apps.apple.com/app/id6466773554",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.seaofconquest.global",
      socials: ["Facebook", "Discord", "YouTube"],
      mainMarkets: ["US", "JP", "KR", "DE", "SEA"],
      currentVersion: "1.1.390",
      lastUpdated: "2026-06-28",
      heatScore: 75,
      confidence: "中",
      status: "增长监控"
    },
    {
      id: "grand-mafia",
      name: "The Grand Mafia",
      alias: "The Grand Mafia",
      publisher: "Phantix Games",
      developer: "Phantix Games",
      theme: "黑帮",
      gameplay: ["黑帮SLG", "联盟战", "英雄养成"],
      iosAppId: "1485428342",
      androidPackage: "com.yottagames.gameofmafia",
      officialSite: "https://tgm.phantixgames.com/",
      appStoreUrl: "https://apps.apple.com/app/id1485428342",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.yottagames.gameofmafia",
      socials: ["Facebook", "YouTube"],
      mainMarkets: ["US", "JP", "KR", "DE", "BR"],
      currentVersion: "1.2.795",
      lastUpdated: "2026-06-20",
      heatScore: 74,
      confidence: "中",
      status: "成熟监控"
    },
    {
      id: "mafia-city",
      name: "Mafia City",
      alias: "Mafia City",
      publisher: "Phantix Games",
      developer: "Phantix Games",
      theme: "黑帮",
      gameplay: ["黑帮SLG", "城建", "联盟战"],
      iosAppId: "1235569398",
      androidPackage: "com.yottagames.mafiawar",
      officialSite: "https://mafiacity.yottagames.com/",
      appStoreUrl: "https://apps.apple.com/app/id1235569398",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.yottagames.mafiawar",
      socials: ["Facebook", "YouTube"],
      mainMarkets: ["US", "JP", "KR", "DE", "BR"],
      currentVersion: "1.7.383",
      lastUpdated: "2026-06-18",
      heatScore: 73,
      confidence: "中",
      status: "成熟监控"
    },
    {
      id: "king-of-avalon",
      name: "King of Avalon",
      alias: "阿瓦隆之王",
      publisher: "FunPlus",
      developer: "FunPlus",
      theme: "亚瑟王奇幻",
      gameplay: ["4X", "联盟战", "龙养成", "城建"],
      iosAppId: "1097631505",
      androidPackage: "com.funplus.kingofavalon",
      officialSite: "https://koa.funplus.com/",
      appStoreUrl: "https://apps.apple.com/app/id1097631505",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.funplus.kingofavalon",
      socials: ["Facebook", "YouTube"],
      mainMarkets: ["US", "DE", "FR", "TR", "BR"],
      currentVersion: "20.5.0",
      lastUpdated: "2026-06-17",
      heatScore: 71,
      confidence: "中",
      status: "成熟监控"
    },
    {
      id: "guns-of-glory",
      name: "Guns of Glory",
      alias: "火枪纪元",
      publisher: "FunPlus",
      developer: "FunPlus",
      theme: "火枪奇幻",
      gameplay: ["4X", "联盟战", "飞艇养成", "城建"],
      iosAppId: "1274354704",
      androidPackage: "com.diandian.gog",
      officialSite: "https://gog.funplus.com/",
      appStoreUrl: "https://apps.apple.com/app/id1274354704",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.diandian.gog",
      socials: ["Facebook", "YouTube"],
      mainMarkets: ["US", "DE", "FR", "BR", "TR"],
      currentVersion: "13.11.0",
      lastUpdated: "2026-06-15",
      heatScore: 69,
      confidence: "中",
      status: "成熟监控"
    },
    {
      id: "war-and-order",
      name: "War and Order",
      alias: "War and Order",
      publisher: "Camel Games",
      developer: "Camel Games",
      theme: "奇幻战争",
      gameplay: ["4X", "联盟战", "城建"],
      iosAppId: "1071744151",
      androidPackage: "com.camelgames.superking",
      officialSite: "https://www.camelgames.com/",
      appStoreUrl: "https://apps.apple.com/app/id1071744151",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.camelgames.superking",
      socials: ["Facebook"],
      mainMarkets: ["US", "DE", "FR", "BR", "TR"],
      currentVersion: "3.0.128",
      lastUpdated: "2026-06-14",
      heatScore: 68,
      confidence: "中",
      status: "成熟监控"
    },
    {
      id: "doomsday-last-survivors",
      name: "Doomsday: Last Survivors",
      alias: "Doomsday",
      publisher: "IGG",
      developer: "IGG",
      theme: "丧尸末日",
      gameplay: ["4X", "塔防", "联盟战", "英雄养成"],
      iosAppId: "1552206075",
      androidPackage: "com.igg.android.doomsdaylastsurvivors",
      officialSite: "https://doomsday.igg.com/",
      appStoreUrl: "https://apps.apple.com/app/id1552206075",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.igg.android.doomsdaylastsurvivors",
      socials: ["Facebook", "YouTube", "TikTok"],
      mainMarkets: ["US", "JP", "KR", "DE", "SEA"],
      currentVersion: "1.39.0",
      lastUpdated: "2026-06-19",
      heatScore: 67,
      confidence: "中",
      status: "增长监控"
    },
    {
      id: "clash-of-kings",
      name: "Clash of Kings",
      alias: "列王的纷争",
      publisher: "Elex",
      developer: "Elex",
      theme: "中世纪战争",
      gameplay: ["4X", "联盟战", "城建"],
      iosAppId: "945274928",
      androidPackage: "com.hcg.cok.gp",
      officialSite: "https://cok.elex.com/",
      appStoreUrl: "https://apps.apple.com/app/id945274928",
      googlePlayUrl: "https://play.google.com/store/apps/details?id=com.hcg.cok.gp",
      socials: ["Facebook"],
      mainMarkets: ["US", "TR", "BR", "DE", "SEA"],
      currentVersion: "10.04.0",
      lastUpdated: "2026-06-12",
      heatScore: 65,
      confidence: "中",
      status: "成熟监控"
    }
  ];


  const supplementalHotGames = [
    makeGame("march-of-empires", "March of Empires", "March of Empires", "Gameloft", "Gameloft", "中世纪战争", ["4X", "联盟战", "城建"], "com.gameloft.android.ANMP.GloftGHHM", 64, ["US", "DE", "FR", "TR"], "成熟监控"),
    makeGame("infinite-lagrange", "Infinite Lagrange", "无尽的拉格朗日", "NetEase Games", "NetEase Games", "太空科幻", ["太空SLG", "联盟战", "舰队", "赛季制"], "com.netease.lagrange", 63, ["US", "JP", "KR", "TW"], "成熟监控"),
    makeGame("star-trek-fleet-command", "Star Trek Fleet Command", "Star Trek", "Scopely", "Digit Game Studios", "太空科幻", ["太空SLG", "联盟战", "IP改编"], "com.scopely.startrek", 62, ["US", "UK", "DE", "FR"], "成熟监控"),
    makeGame("warpath", "Warpath", "Warpath", "Lilith Games", "Lilith Games", "现代战争", ["战争SLG", "联盟战", "基地建设"], "com.wondergames.warpath.gp", 61, ["US", "DE", "FR", "JP"], "成熟监控"),
    makeGame("total-battle", "Total Battle", "Total Battle", "Scorewarrior", "Scorewarrior", "奇幻战争", ["4X", "联盟战", "英雄养成"], "com.totalbattle", 60, ["US", "DE", "FR", "BR"], "成熟监控"),
    makeGame("stormshot", "Stormshot", "Stormshot", "FunPlus", "FunPlus", "火枪解谜", ["解谜导流", "城建", "联盟战"], "com.sivona.stormshot.e", 59, ["US", "DE", "FR", "JP"], "成熟监控"),
    makeGame("frost-fortress", "Frost & Flame: King of Avalon", "Frost & Flame", "FunPlus", "FunPlus", "奇幻战争", ["4X", "联盟战", "龙养成"], "com.funplus.kingofavalon", 58, ["US", "DE", "FR", "TR"], "成熟监控"),
    makeGame("ant-underground", "The Ants: Underground Kingdom", "小小蚁国", "StarUnion", "StarUnion", "蚂蚁生态", ["4X", "联盟战", "生态题材"], "com.star.union.planetant", 57, ["US", "JP", "KR", "DE"], "成熟监控"),
    makeGame("wild-castle", "Wild Castle TD Grow Empire", "Wild Castle", "Funovus", "Funovus", "城防战争", ["城防", "养成", "策略"], "com.wildsky.wildcastle", 56, ["US", "BR", "DE", "SEA"], "待分类复核"),
    makeGame("empire-puzzles", "Empires & Puzzles", "Empires & Puzzles", "Zynga", "Small Giant Games", "奇幻三消", ["三消+SLG", "联盟", "英雄养成"], "com.smallgiantgames.empires", 55, ["US", "DE", "FR", "BR"], "成熟监控"),
    makeGame("grand-cross-w", "Grand Cross: Age of Titans", "Grand Cross W", "Netmarble", "Netmarble", "奇幻战争", ["4X", "联盟战", "英雄养成"], "com.netmarble.grandcrossw", 54, ["US", "KR", "JP", "TW"], "增长监控"),
    makeGame("godfather", "The Godfather: Family Dynasty", "Godfather", "FT Games", "FT Games", "黑帮", ["黑帮SLG", "城建", "联盟战"], "com.ftxgames.godfather", 53, ["US", "DE", "FR", "BR"], "成熟监控"),
    makeGame("survivor-io-like-slg", "Survival City Builder War", "Survival City Builder", "Multi-source Candidate", "Unknown", "末日生存", ["城建", "生存", "SLG候选"], "unknown.survival.city.builder", 52, ["US", "SEA"], "待验证"),
    makeGame("war-robots-frontiers-mobile", "War Robots Strategy Candidate", "War Robots Strategy", "Multi-source Candidate", "Unknown", "机甲战争", ["联盟战", "基地建设", "SLG候选"], "unknown.war.robots.strategy", 51, ["US", "JP", "KR"], "待验证"),
    makeGame("rise-of-castles", "Rise of Castles: Ice and Fire", "Rise of Castles", "Long Tech Network", "Long Tech Network", "中世纪战争", ["4X", "联盟战", "城建"], "com.im30.ROE.gp", 50, ["US", "DE", "BR", "TR"], "成熟监控"),
    makeGame("last-shelter", "Last Shelter: Survival", "Last Shelter", "Long Tech Network", "Long Tech Network", "末日生存", ["4X", "联盟战", "基地建设"], "com.more.dayzsurvival.gp", 49, ["US", "JP", "KR", "DE"], "成熟监控"),
    makeGame("world-war-rising", "World War Rising", "World War Rising", "Mobile War", "Mobile War", "现代战争", ["4X", "联盟战", "基地建设"], "com.mobilewar.worldwarrising", 48, ["US", "UK", "DE"], "成熟监控"),
    makeGame("final-order", "Final Order", "Final Order", "CamelStudio", "CamelStudio", "末日生存", ["4X", "联盟战", "基地建设"], "com.camelgames.superkingdom", 47, ["US", "JP", "KR"], "待验证"),
    makeGame("zombie-waves-slg", "Zombie Waves Strategy Candidate", "Zombie Waves SLG", "Multi-source Candidate", "Unknown", "丧尸末日", ["生存", "城建", "SLG候选"], "unknown.zombie.waves.slg", 46, ["US", "JP", "SEA"], "待验证"),
    makeGame("age-of-apes", "Age of Apes", "Age of Apes", "Tap4Fun", "Tap4Fun", "猿族战争", ["4X", "联盟战", "基地建设"], "com.tap4fun.ape.gplay", 45, ["US", "DE", "FR", "BR"], "成熟监控"),
    makeGame("brutal-age", "Brutal Age: Horde Invasion", "Brutal Age", "Tap4Fun", "Tap4Fun", "原始部落", ["4X", "联盟战", "城建"], "com.tap4fun.brutalage_test", 44, ["US", "BR", "TR", "SEA"], "成熟监控"),
    makeGame("invasion-modern-empire", "Invasion: Modern Empire", "Invasion", "Tap4Fun", "Tap4Fun", "现代战争", ["4X", "联盟战", "基地建设"], "com.tap4fun.reignofwar", 43, ["US", "DE", "BR", "SEA"], "成熟监控"),
    makeGame("kiss-of-war", "Kiss of War", "Kiss of War", "Tap4Fun", "Tap4Fun", "二战题材", ["4X", "联盟战", "角色养成"], "com.tap4fun.kissofwar", 42, ["US", "JP", "KR", "DE"], "成熟监控"),
    makeGame("warhammer-chaos-conquest", "Warhammer: Chaos & Conquest", "Warhammer C&C", "Tilting Point", "Hunted Cow", "奇幻IP", ["4X", "联盟战", "IP改编"], "com.tiltingpoint.warhammer", 41, ["US", "UK", "DE", "FR"], "成熟监控"),
    makeGame("iron-throne", "Iron Throne", "Iron Throne", "Netmarble", "Netmarble", "奇幻战争", ["4X", "联盟战", "城建"], "com.netmarble.ironthrone", 40, ["US", "KR", "JP"], "待验证"),
    makeGame("game-of-sultans", "Game of Sultans", "Game of Sultans", "DreamPlus", "Mechanist", "宫廷经营", ["经营策略", "联盟", "养成"], "com.dc.hwsj", 39, ["US", "TR", "BR", "SEA"], "待分类复核"),
    makeGame("kingdom-guard", "Kingdom Guard", "Kingdom Guard", "Tap4Fun", "Tap4Fun", "奇幻塔防", ["塔防+SLG", "联盟战", "合成"], "com.tap4fun.odin.kingdomguard", 38, ["US", "JP", "KR", "DE"], "待分类复核"),
    makeGame("age-of-lords", "Age of Lords", "Age of Lords", "Erepublik Labs", "Erepublik Labs", "中世纪战争", ["4X", "联盟战", "城建"], "com.eRepublikLabs.AgeOfLords", 37, ["US", "DE", "FR", "BR"], "成熟监控"),
    makeGame("throne-rush", "Throne Rush", "Throne Rush", "Nexters", "Nexters", "奇幻战争", ["城建", "联盟战", "策略"], "com.progrestar.bft", 36, ["US", "DE", "BR"], "待验证"),
    makeGame("battle-warship", "Battle Warship: Naval Empire", "Battle Warship", "Special Gamez", "Special Gamez", "海战", ["4X", "联盟战", "舰队"], "com.special.warship", 35, ["US", "JP", "KR", "DE"], "成熟监控")
  ];

  const newLaunchCandidateGames = [
    makeNewGame("new-frost-shelter-2026w27", "Frost Shelter: Survival War", "APKCombo/策略新上线候选", "冰雪生存", ["城建", "联盟战", "生存", "SLG候选"], "unknown.frost.shelter", "2026-06-29", ["全球"], "待人工确认"),
    makeNewGame("new-zombie-state-2026w27", "Zombie State: Alliance War", "APKCombo/策略新上线候选", "丧尸末日", ["联盟战", "基地建设", "英雄养成", "SLG候选"], "unknown.zombie.state.alliance", "2026-06-30", ["全球"], "待人工确认"),
    makeNewGame("new-empire-frontier-2026w27", "Empire Frontier: Kingdoms", "APKCombo/策略新上线候选", "中世纪战争", ["4X", "城建", "联盟战", "SLG候选"], "unknown.empire.frontier.kingdoms", "2026-07-01", ["全球"], "待人工确认"),
    makeNewGame("new-galaxy-command-2026w27", "Galaxy Commanders: Nebula War", "APKCombo/策略新上线候选", "太空科幻", ["太空SLG", "舰队", "联盟战", "SLG候选"], "unknown.galaxy.commanders", "2026-07-01", ["全球"], "待人工确认"),
    makeNewGame("new-mafia-district-2026w27", "Mafia District: Street Empire", "APKCombo/策略新上线候选", "黑帮", ["黑帮SLG", "城建", "联盟战", "SLG候选"], "unknown.mafia.district", "2026-07-02", ["全球"], "待人工确认")
  ];

  function makeGame(id, name, alias, publisher, developer, theme, gameplay, androidPackage, heatScore, markets, status) {
    return {
      id,
      name,
      alias,
      publisher,
      developer,
      theme,
      gameplay,
      iosAppId: "待补充",
      androidPackage,
      officialSite: "",
      appStoreUrl: "",
      googlePlayUrl: androidPackage && !androidPackage.startsWith("unknown") ? `https://play.google.com/store/apps/details?id=${androidPackage}` : "",
      socials: [],
      mainMarkets: markets,
      currentVersion: "待采集",
      lastUpdated: "待采集",
      heatScore,
      confidence: status.includes("待") ? "低" : "中",
      status,
      listType: "hot50",
      sourceHint: "扩展热度池：可参考 Google Play 手机游戏榜单，需接商业榜单或人工复核更新"
    };
  }

  function makeNewGame(id, name, publisher, theme, gameplay, androidPackage, launchDate, markets, status) {
    return {
      id,
      name,
      alias: name,
      publisher,
      developer: "待采集",
      theme,
      gameplay,
      iosAppId: "待采集",
      androidPackage,
      officialSite: "https://apkcombo.com/zh/game/strategy/",
      appStoreUrl: "",
      googlePlayUrl: "",
      socials: [],
      mainMarkets: markets,
      currentVersion: "待采集",
      lastUpdated: launchDate,
      heatScore: 0,
      confidence: "低",
      status,
      listType: "newLaunch",
      sourceHint: "候选来源：APKCombo 策略分类的新上线/最近更新入口，需人工确认是 SLG 手游"
    };
  }

  const seedEvents = [
    {
      id: "evt-001",
      gameId: "last-war",
      date: "2026-07-01",
      type: "版本",
      title: "英雄平衡与联盟战体验更新",
      summary: "新增英雄技能调整、联盟战配对优化和多语言文案修复。",
      version: "1.0.310",
      countries: ["全球"],
      sourcePlatform: "App Store",
      sourceUrl: "https://apps.apple.com/app/id6448786147",
      confidence: "高",
      status: "确认发生"
    },
    {
      id: "evt-002",
      gameId: "whiteout-survival",
      date: "2026-06-30",
      type: "活动",
      title: "夏季庆典限时活动",
      summary: "节日任务、联盟积分、限时礼包和英雄碎片奖励同步上线。",
      version: "1.24.5",
      countries: ["US", "JP", "KR", "TW"],
      sourcePlatform: "官网公告",
      sourceUrl: "https://www.whiteoutsurvival.com/",
      confidence: "中",
      status: "确认发生"
    },
    {
      id: "evt-003",
      gameId: "kingshot",
      date: "2026-07-01",
      type: "活动",
      title: "新服冲榜与资源补给活动",
      summary: "疑似围绕新服开服期进行素材和活动联动，资源礼包曝光增加。",
      version: "1.6.8",
      countries: ["US", "SEA", "KR"],
      sourcePlatform: "社媒",
      sourceUrl: "https://www.centurygames.com/",
      confidence: "中",
      status: "疑似关联"
    },
    {
      id: "evt-004",
      gameId: "rise-of-kingdoms",
      date: "2026-06-29",
      type: "活动",
      title: "文明主题赛季预热",
      summary: "预热内容强调新赛季、迁城策略和联盟协作。",
      version: "1.0.98",
      countries: ["全球"],
      sourcePlatform: "Facebook",
      sourceUrl: "https://rok.lilith.com/",
      confidence: "中",
      status: "新增发现"
    },
    {
      id: "evt-005",
      gameId: "sea-of-conquest",
      date: "2026-06-28",
      type: "版本",
      title: "舰队系统与海域探索更新",
      summary: "围绕舰队养成和海域探索增加新目标，素材侧同步突出海盗题材。",
      version: "1.1.390",
      countries: ["US", "JP", "DE"],
      sourcePlatform: "Google Play",
      sourceUrl: "https://play.google.com/store/apps/details?id=com.seaofconquest.global",
      confidence: "中",
      status: "确认发生"
    },
    {
      id: "evt-006",
      gameId: "puzzles-survival",
      date: "2026-06-29",
      type: "活动",
      title: "联盟补给与三消关卡挑战",
      summary: "活动将三消关卡和联盟补给绑定，适合观察混合玩法素材投放。",
      version: "7.0.190",
      countries: ["US", "JP", "KR"],
      sourcePlatform: "官网公告",
      sourceUrl: "https://pns.37games.com/",
      confidence: "中",
      status: "确认发生"
    }
  ];

  const seedCreatives = [
    {
      id: "ad-001",
      gameId: "last-war",
      firstSeen: "2026-07-01",
      lastSeen: "2026-07-01",
      platform: "TikTok",
      countries: ["US", "JP", "KR"],
      language: "en/ja/ko",
      format: "竖版视频",
      title: "拯救幸存者开局钩子",
      hook: "前三秒用选择路线和救援失败制造压力。",
      tags: ["末日", "小游戏导流", "强钩子", "竖屏"],
      sourceUrl: "https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en",
      confidence: "中",
      status: "新增"
    },
    {
      id: "ad-002",
      gameId: "whiteout-survival",
      firstSeen: "2026-06-30",
      lastSeen: "2026-07-01",
      platform: "Meta",
      countries: ["US", "DE", "JP"],
      language: "en/de/ja",
      format: "竖版视频",
      title: "雪原求生资源危机",
      hook: "寒潮倒计时叠加资源不足，转入城建升级。",
      tags: ["冰雪", "生存危机", "城建", "多语言"],
      sourceUrl: "https://www.facebook.com/ads/library/",
      confidence: "中",
      status: "持续投放"
    },
    {
      id: "ad-003",
      gameId: "kingshot",
      firstSeen: "2026-07-01",
      lastSeen: "2026-07-01",
      platform: "TikTok",
      countries: ["US", "KR", "SEA"],
      language: "en/ko",
      format: "竖版视频",
      title: "王国扩张与资源抉择",
      hook: "从资源短缺切入，展示新手期快速扩张。",
      tags: ["中世纪", "城建", "新服", "资源"],
      sourceUrl: "https://ads.tiktok.com/business/creativecenter/inspiration/topads/pc/en",
      confidence: "低",
      status: "新增"
    },
    {
      id: "ad-004",
      gameId: "evony",
      firstSeen: "2026-06-29",
      lastSeen: "2026-07-01",
      platform: "YouTube",
      countries: ["US", "UK", "DE"],
      language: "en/de",
      format: "横版/竖版混投",
      title: "解谜失败转城建战争",
      hook: "用机关解谜失败吸引点击，再切到帝国发展。",
      tags: ["解谜导流", "历史战争", "混投"],
      sourceUrl: "https://adstransparency.google.com/",
      confidence: "低",
      status: "持续投放"
    },
    {
      id: "ad-005",
      gameId: "sea-of-conquest",
      firstSeen: "2026-06-28",
      lastSeen: "2026-06-30",
      platform: "Meta",
      countries: ["US", "JP", "DE"],
      language: "en/ja/de",
      format: "竖版视频",
      title: "海盗舰队从零起航",
      hook: "从小船到舰队成长，强调探索和掠夺收益。",
      tags: ["海盗", "舰队", "探索", "成长"],
      sourceUrl: "https://www.facebook.com/ads/library/",
      confidence: "中",
      status: "新增"
    },
    {
      id: "ad-006",
      gameId: "puzzles-survival",
      firstSeen: "2026-06-29",
      lastSeen: "2026-07-01",
      platform: "Meta",
      countries: ["US", "JP", "TW"],
      language: "en/ja/zh",
      format: "竖版视频",
      title: "三消救援转联盟战争",
      hook: "三消关卡失败后展示基地和联盟目标。",
      tags: ["三消+SLG", "末日", "联盟", "混合玩法"],
      sourceUrl: "https://www.facebook.com/ads/library/",
      confidence: "中",
      status: "持续投放"
    }
  ];


  function buildSeedGames() {
    const base = seedGames.map((game) =>
      Object.assign(
        {
          listType: "hot50",
          sourceHint: "初始重点监控池"
        },
        game
      )
    );
    return normalizeGames(base.concat(supplementalHotGames, newLaunchCandidateGames));
  }

  function normalizeGames(games) {
    const seen = new Map();
    games.forEach((game) => {
      if (!game || !game.id) return;
      const normalized = Object.assign(
        {
          alias: game.name || game.id,
          publisher: "待采集",
          developer: "待采集",
          theme: "待分类",
          gameplay: [],
          iosAppId: "待采集",
          androidPackage: "待采集",
          officialSite: "",
          appStoreUrl: "",
          googlePlayUrl: "",
          socials: [],
          mainMarkets: [],
          currentVersion: "待采集",
          lastUpdated: "待采集",
          heatScore: 0,
          confidence: "低",
          status: "待验证",
          listType: "hot50",
          sourceHint: "导入数据"
        },
        game
      );
      if (!Array.isArray(normalized.gameplay)) normalized.gameplay = String(normalized.gameplay || "").split(/[、,|]/).filter(Boolean);
      if (!Array.isArray(normalized.mainMarkets)) normalized.mainMarkets = String(normalized.mainMarkets || "").split(/[、,|]/).filter(Boolean);
      if (!Array.isArray(normalized.socials)) normalized.socials = String(normalized.socials || "").split(/[、,|]/).filter(Boolean);
      seen.set(normalized.id, Object.assign({}, seen.get(normalized.id) || {}, normalized));
    });
    return Array.from(seen.values());
  }

  let state = loadState();

  const elements = {
    content: document.getElementById("content"),
    summaryGrid: document.getElementById("summaryGrid"),
    viewTitle: document.getElementById("viewTitle"),
    dateFilter: document.getElementById("dateFilter"),
    gameFilterButton: document.getElementById("gameFilterButton"),
    gameFilterMenu: document.getElementById("gameFilterMenu"),
    gameFilterOptions: document.getElementById("gameFilterOptions"),
    platformFilter: document.getElementById("platformFilter"),
    searchInput: document.getElementById("searchInput"),
    latestDateBtn: document.getElementById("latestDateBtn"),
    exportJsonBtn: document.getElementById("exportJsonBtn"),
    exportCsvBtn: document.getElementById("exportCsvBtn"),
    sidebarGameCount: document.getElementById("sidebarGameCount")
  };

  const viewTitles = {
    daily: "日报",
    games: "游戏库",
    activities: "版本活动",
    creatives: "买量素材",
    reports: "报告",
    settings: "数据"
  };

  let currentView = "daily";
  let gameListTab = "hot50";

  init();

  async function init() {
    elements.dateFilter.value = state.filters.date || todayIso;
    elements.searchInput.value = state.filters.search || "";
    fillFilters();
    bindEvents();
    render();
    await loadOnlineState();
  }

  async function loadOnlineState() {
    try {
      const response = await fetch(`${ONLINE_STATE_URL}?t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) return;
      const online = await response.json();
      state = mergeState(state, online);
      if (!state.filters.date || state.filters.date === todayIso) {
        state.filters.date = online.latestDate || getLatestDate();
        elements.dateFilter.value = state.filters.date;
      }
      fillFilters();
      render();
    } catch (error) {
      console.info("在线数据不可用，使用本地数据。", error);
    }
  }

  function mergeState(local, incoming) {
    const online = incoming || {};
    return {
      games: normalizeGames(buildSeedGames().concat(Array.isArray(online.games) ? online.games : []).concat(Array.isArray(local.games) ? local.games : [])),
      events: mergeById(Array.isArray(online.events) ? online.events : [], Array.isArray(local.events) ? local.events : []),
      creatives: mergeById(Array.isArray(online.creatives) ? online.creatives : [], Array.isArray(local.creatives) ? local.creatives : []),
      filters: Object.assign({}, local.filters || {}, { date: local.filters && local.filters.date ? local.filters.date : online.latestDate || todayIso }),
      notes: Array.isArray(local.notes) ? local.notes : [],
      reports: online.reports || {},
      generatedAt: online.generatedAt || ""
    };
  }

  function loadState() {
    const fallback = {
      games: buildSeedGames(),
      events: seedEvents,
      creatives: seedCreatives,
      filters: {
        date: todayIso,
        gameIds: ["all"],
        platform: "all",
        search: ""
      },
      notes: []
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return fallback;
      }
      const parsed = JSON.parse(raw);
      return {
        games: normalizeGames(buildSeedGames().concat(Array.isArray(parsed.games) && parsed.games.length ? parsed.games : [])),
        events: Array.isArray(parsed.events) ? parsed.events : seedEvents,
        creatives: Array.isArray(parsed.creatives) ? parsed.creatives : seedCreatives,
        filters: Object.assign(fallback.filters, parsed.filters || {}),
        notes: Array.isArray(parsed.notes) ? parsed.notes : []
      };
    } catch (error) {
      console.warn("加载本地数据失败，使用内置样例。", error);
      return fallback;
    }
  }

  function saveState() {
    state.filters.date = elements.dateFilter.value;
    state.filters.gameIds = getSelectedGameIds();
    state.filters.platform = elements.platformFilter.value;
    state.filters.search = elements.searchInput.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function fillFilters() {
    renderGameFilterOptions();
    setSelectedGameIds(state.filters.gameIds || state.filters.gameId || ["all"]);

    const platforms = Array.from(new Set(state.creatives.map((item) => item.platform))).sort();
    elements.platformFilter.innerHTML = '<option value="all">全部平台</option>';
    platforms.forEach((platform) => {
      const option = document.createElement("option");
      option.value = platform;
      option.textContent = platform;
      elements.platformFilter.appendChild(option);
    });
    elements.platformFilter.value = platforms.includes(state.filters.platform) ? state.filters.platform : "all";

    elements.sidebarGameCount.textContent = `${state.games.length} 款`;
  }


  function renderGameFilterOptions() {
    const selected = new Set(state.filters.gameIds || state.filters.gameId || ["all"]);
    const options = [{ id: "all", name: "全部游戏", heatScore: 9999 }].concat(
      state.games.slice().sort((a, b) => b.heatScore - a.heatScore)
    );
    elements.gameFilterOptions.innerHTML = options
      .map(
        (game) => `
          <label class="multi-select-option ${selected.has(game.id) ? "is-selected" : ""}">
            <input type="checkbox" value="${escapeAttribute(game.id)}" ${selected.has(game.id) ? "checked" : ""}>
            <span>${escapeHtml(game.name)}</span>
          </label>
        `
      )
      .join("");
  }

  function getSelectedGameIds() {
    const checked = Array.from(elements.gameFilterOptions.querySelectorAll('input[type="checkbox"]:checked')).map((input) => input.value);
    return checked.length ? checked : ["all"];
  }

  function setSelectedGameIds(values) {
    const selected = Array.isArray(values) ? values : [values || "all"];
    Array.from(elements.gameFilterOptions.querySelectorAll('input[type="checkbox"]')).forEach((input) => {
      input.checked = selected.includes(input.value) || (selected.length === 0 && input.value === "all");
      input.closest(".multi-select-option").classList.toggle("is-selected", input.checked);
    });
    updateGameFilterButton();
  }

  function normalizeGameSelection(changedValue) {
    const inputs = Array.from(elements.gameFilterOptions.querySelectorAll('input[type="checkbox"]'));
    const allInput = inputs.find((input) => input.value === "all");
    if (changedValue === "all" && allInput && allInput.checked) {
      inputs.forEach((input) => {
        if (input.value !== "all") input.checked = false;
      });
    } else if (changedValue !== "all") {
      if (allInput) allInput.checked = false;
    }
    if (!inputs.some((input) => input.checked) && allInput) {
      allInput.checked = true;
    }
    inputs.forEach((input) => input.closest(".multi-select-option").classList.toggle("is-selected", input.checked));
    updateGameFilterButton();
  }

  function updateGameFilterButton() {
    const selected = getSelectedGameIds();
    if (selected.includes("all")) {
      elements.gameFilterButton.textContent = "全部游戏";
      return;
    }
    const names = selected.map((id) => gameName(id));
    elements.gameFilterButton.textContent = names.length <= 2 ? names.join("、") : `已选 ${names.length} 款游戏`;
  }

  function toggleGameFilterMenu(forceOpen) {
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : elements.gameFilterMenu.hidden;
    elements.gameFilterMenu.hidden = !shouldOpen;
    elements.gameFilterButton.setAttribute("aria-expanded", String(shouldOpen));
  }

  function bindEvents() {
    document.querySelectorAll(".nav-item").forEach((button) => {
      button.addEventListener("click", () => {
        currentView = button.dataset.view;
        document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        render();
      });
    });

    [elements.dateFilter, elements.platformFilter, elements.searchInput].forEach((control) => {
      control.addEventListener("input", () => {
        saveState();
        render();
      });
      control.addEventListener("change", () => {
        saveState();
        render();
      });
    });

    elements.gameFilterButton.addEventListener("click", () => {
      toggleGameFilterMenu();
    });

    elements.gameFilterOptions.addEventListener("change", (event) => {
      if (!event.target.matches('input[type="checkbox"]')) return;
      normalizeGameSelection(event.target.value);
      saveState();
      render();
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest(".game-multi-field")) return;
      toggleGameFilterMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") toggleGameFilterMenu(false);
    });

    elements.latestDateBtn.addEventListener("click", () => {
      elements.dateFilter.value = getLatestDate();
      saveState();
      render();
    });

    elements.exportJsonBtn.addEventListener("click", exportJson);
    elements.exportCsvBtn.addEventListener("click", exportCsv);
  }

  function render() {
    elements.viewTitle.textContent = viewTitles[currentView];
    renderSummary();

    const renderers = {
      daily: renderDaily,
      games: renderGames,
      activities: renderActivities,
      creatives: renderCreatives,
      reports: renderReports,
      settings: renderSettings
    };
    renderers[currentView]();
  }

  function getFilteredData() {
    const date = elements.dateFilter.value;
    const gameIds = getSelectedGameIds();
    const platform = elements.platformFilter.value;
    const search = elements.searchInput.value.trim().toLowerCase();

    const selectedGameIds = new Set(
      state.games.filter((game) => gameIds.includes("all") || gameIds.includes(game.id)).map((game) => game.id)
    );

    const events = state.events.filter((event) => {
      if (!selectedGameIds.has(event.gameId)) return false;
      if (date && event.date !== date) return false;
      return matchText(event, search) || matchText(gameById(event.gameId), search);
    });

    const creatives = state.creatives.filter((creative) => {
      if (!selectedGameIds.has(creative.gameId)) return false;
      if (platform !== "all" && creative.platform !== platform) return false;
      if (date && creative.firstSeen !== date && creative.lastSeen !== date) return false;
      return matchText(creative, search) || matchText(gameById(creative.gameId), search);
    });

    const games = state.games.filter((game) => {
      if (!selectedGameIds.has(game.id)) return false;
      if (!search) return true;
      return (
        matchText(game, search) ||
        events.some((event) => event.gameId === game.id) ||
        creatives.some((creative) => creative.gameId === game.id)
      );
    });
    return { games, events, creatives, date, gameIds, platform, search };
  }

  function renderSummary() {
    const { games, events, creatives } = getFilteredData();
    const versionCount = events.filter((event) => event.type === "版本").length;
    const activityCount = events.filter((event) => event.type !== "版本").length;
    const markets = new Set();
    creatives.forEach((creative) => creative.countries.forEach((country) => markets.add(country)));
    events.forEach((event) => event.countries.forEach((country) => markets.add(country)));

    const metrics = [
      ["监控游戏", games.length, "当前筛选范围"],
      ["版本更新", versionCount, "当日命中"],
      ["活动发现", activityCount, "含疑似关联"],
      ["新增/活跃素材", creatives.length, `${markets.size || 0} 个国家/地区`]
    ];

    elements.summaryGrid.innerHTML = metrics
      .map(
        ([label, value, note]) => `
          <article class="metric">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(String(value))}</strong>
            <small>${escapeHtml(note)}</small>
          </article>
        `
      )
      .join("");
  }

  function renderDaily() {
    const { events, creatives, date } = getFilteredData();
    const eventRows = events
      .map(
        (event) => `
          <tr>
            <td class="strong-cell">${escapeHtml(gameName(event.gameId))}</td>
            <td>${badge(event.type, event.type === "版本" ? "info" : "")}</td>
            <td>
              <div class="strong-cell">${escapeHtml(event.title)}</div>
              <div class="muted">${escapeHtml(event.summary)}</div>
            </td>
            <td>${escapeHtml(event.version || "-")}</td>
            <td>${renderTags(event.countries)}</td>
            <td>${escapeHtml(event.sourcePlatform)}<br>${link(event.sourceUrl, "来源")}</td>
            <td>${badge(event.status, event.status === "疑似关联" ? "warning" : "")}</td>
          </tr>
        `
      )
      .join("");

    const creativeRows = creatives
      .map(
        (creative) => `
          <tr>
            <td class="strong-cell">${escapeHtml(gameName(creative.gameId))}</td>
            <td>${badge(creative.platform, "info")}</td>
            <td>
              <div class="strong-cell">${escapeHtml(creative.title)}</div>
              <div class="muted">${escapeHtml(creative.hook)}</div>
            </td>
            <td>${escapeHtml(creative.format)}</td>
            <td>${renderTags(creative.countries)}</td>
            <td>${renderTags(creative.tags)}</td>
            <td>${badge(creative.status, creative.status === "新增" ? "warning" : "")}</td>
          </tr>
        `
      )
      .join("");

    elements.content.innerHTML = `
      ${panel("当日版本与活动", `${date} · ${events.length} 条`, table(["游戏", "类型", "内容", "版本", "国家", "来源", "状态"], eventRows))}
      ${panel("当日买量素材", `${date} · ${creatives.length} 条`, table(["游戏", "平台", "素材", "格式", "国家", "标签", "状态"], creativeRows))}
    `;
    showEmptyIfNeeded(events.length + creatives.length);
  }

  function renderGames() {
    const { games } = getFilteredData();
    const hotGames = games
      .filter((game) => game.listType !== "newLaunch")
      .slice()
      .sort((a, b) => b.heatScore - a.heatScore)
      .slice(0, 50);
    const newGames = games
      .filter((game) => game.listType === "newLaunch")
      .slice()
      .sort((a, b) => String(b.lastUpdated || "").localeCompare(String(a.lastUpdated || "")) || b.heatScore - a.heatScore);
    const visibleGames = gameListTab === "hot50" ? hotGames : newGames;
    const subtitle =
      gameListTab === "hot50"
        ? "热度最高 50 款 SLG 手游，可参考 Google Play 手机游戏榜单并接商业榜单每日刷新"
        : "上周新测试或新上线 SLG 候选，仅保留疑似 SLG，需人工复核来源";

    elements.content.innerHTML = `
      <section class="section-panel">
        <div class="section-header stacked-header">
          <div>
            <h2>${gameListTab === "hot50" ? "热度最高的 50 款 SLG 游戏" : "上周新测试或新上线的 SLG 游戏"}</h2>
            <span>${subtitle}</span>
          </div>
          <div class="tab-switch" role="tablist" aria-label="游戏库标签">
            <button class="tab-btn ${gameListTab === "hot50" ? "is-active" : ""}" data-game-tab="hot50" type="button">热度最高 50 款</button>
            <button class="tab-btn ${gameListTab === "newLaunch" ? "is-active" : ""}" data-game-tab="newLaunch" type="button">上周新测/新上线</button>
          </div>
        </div>
        <div class="source-note">
          热度池可参考 Google Play 手机游戏榜单；新游可参考 APKCombo 策略分类的最近更新/新上线入口。本工具只收 SLG 手游，塔防、纯卡牌、纯休闲策略需要剔除或标为待分类复核。
        </div>
        <div class="card-grid">
          ${visibleGames.map(renderGameCard).join("")}
        </div>
      </section>
    `;
    document.querySelectorAll("[data-game-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        gameListTab = button.dataset.gameTab;
        renderGames();
      });
    });
    showEmptyIfNeeded(visibleGames.length);
  }

  function renderActivities() {
    const { games, date, search } = getFilteredData();
    const gameSet = new Set(games.map((game) => game.id));
    const events = state.events
      .filter((event) => gameSet.has(event.gameId))
      .filter((event) => !date || event.date <= date)
      .filter((event) => !search || matchText(event, search) || matchText(gameById(event.gameId), search))
      .sort((a, b) => b.date.localeCompare(a.date));

    elements.content.innerHTML = `
      <section class="section-panel">
        <div class="section-header">
          <h2>版本活动时间线</h2>
          <span>${events.length} 条记录</span>
        </div>
        <div class="timeline">
          ${events
            .map(
              (event) => `
                <article class="timeline-item">
                  <div class="timeline-date">${escapeHtml(event.date)}</div>
                  <div class="timeline-body">
                    <h3>${escapeHtml(gameName(event.gameId))} · ${escapeHtml(event.title)}</h3>
                    <p>${escapeHtml(event.summary)}</p>
                    <div class="tag-row">
                      ${badge(event.type, event.type === "版本" ? "info" : "")}
                      ${badge(event.status, event.status === "疑似关联" ? "warning" : "")}
                      ${badge(`置信度 ${event.confidence}`, event.confidence === "低" ? "critical" : "")}
                      ${renderTags(event.countries)}
                    </div>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>
      </section>
    `;
    showEmptyIfNeeded(events.length);
  }

  function renderCreatives() {
    const { creatives } = getFilteredData();
    elements.content.innerHTML = `
      <section class="section-panel">
        <div class="section-header">
          <h2>买量视频与素材</h2>
          <span>按首次发现/最近发现日期进入日报</span>
        </div>
        <div class="card-grid">
          ${creatives.map(renderCreativeCard).join("")}
        </div>
      </section>
    `;
    showEmptyIfNeeded(creatives.length);
  }

  function renderReports() {
    const date = parseLocalDate(elements.dateFilter.value || todayIso);
    const week = getPreviousNaturalWeek(date);
    const month = getMonthlyReportForDate(date);
    const weekly = normalizeReport(state.reports && state.reports.weekly, buildReport(week.start, week.endExclusive, "周报"));
    const monthly = normalizeReport(state.reports && state.reports.monthly, buildReport(month.start, month.endExclusive, "月报", month));
    const onlineNote = state.generatedAt ? `在线数据生成时间：${state.generatedAt}` : "当前使用本地回退数据";

    elements.content.innerHTML = `
      <section class="section-panel">
        <div class="section-header">
          <h2>报告生成口径</h2>
          <span>周一生成上个自然周，月报按 30 号所在周下一周周一规则</span>
        </div>
        <div class="source-note">${escapeHtml(onlineNote)}</div>
        <div class="card-grid">
          ${renderReportCard(weekly)}
          ${renderReportCard(monthly)}
        </div>
      </section>
    `;
  }

  function normalizeReport(onlineReport, fallback) {
    if (!onlineReport) return fallback;
    return {
      title: onlineReport.title || fallback.title,
      rangeLabel: onlineReport.range ? `${onlineReport.range.start} 至 ${onlineReport.range.end}` : fallback.rangeLabel,
      versionCount: onlineReport.versionCount || 0,
      activityCount: onlineReport.activityCount || 0,
      creativeCount: onlineReport.creativeCount || 0,
      gameCount: onlineReport.gameCount || 0,
      canGenerate: (onlineReport.versionCount || 0) + (onlineReport.activityCount || 0) + (onlineReport.creativeCount || 0) > 0,
      triggerDate: onlineReport.triggerDate || fallback.triggerDate || "",
      reportStatus: onlineReport.generatedAt ? "在线已生成" : fallback.reportStatus || "",
      summary: onlineReport.summary || fallback.summary
    };
  }

  function renderSettings() {
    elements.content.innerHTML = `
      <div class="settings-grid">
        <section class="settings-panel">
          <h2>导入每日增量 JSON</h2>
          <p>把采集脚本、第三方广告平台或人工整理的数据粘贴到这里。系统会按 <code>id</code> 覆盖同名记录，新增记录会进入日报。</p>
          <label class="field">
            <span>JSON 内容</span>
            <textarea id="jsonImportInput" spellcheck="false" placeholder='{"events":[...],"creatives":[...],"games":[...]}'></textarea>
          </label>
          <div class="form-actions">
            <button id="importJsonBtn" class="primary-btn" type="button">导入数据</button>
            <button id="resetSeedBtn" class="danger-btn" type="button">恢复内置样例</button>
          </div>
        </section>
        <section class="settings-panel">
          <h2>自动采集状态</h2>
          ${renderSourceLog()}
          <h2>使用规则</h2>
          <ul>
            <li>日报随时查看，日期筛选即为该日增量快照。</li>
            <li>GitHub Actions 每天自动更新在线 JSON，周报/月报按规则自动刷新。</li>
            <li>Google Play 用于热度候选，APKCombo 用于新测/新上线候选；失败会记录但不阻断报告。</li>
            <li>每条记录保留来源链接、平台、国家、置信度和状态。</li>
          </ul>
          <h2>推荐字段</h2>
          <p><code>games</code>、<code>events</code>、<code>creatives</code> 三类数组即可完成当前工具的数据更新。</p>
        </section>
      </div>
    `;

    document.getElementById("importJsonBtn").addEventListener("click", importJson);
    document.getElementById("resetSeedBtn").addEventListener("click", resetSeed);
  }


  function renderSourceLog() {
    const logs = Array.isArray(state.sourceLog) ? state.sourceLog : [];
    if (!logs.length) {
      return "<p>暂无在线采集日志。上线到 GitHub Actions 后会显示各数据源成功或失败状态。</p>";
    }
    return `
      <div class="source-log-list">
        ${logs
          .map(
            (item) => `
              <div class="source-log-item ${item.ok ? "is-ok" : "is-fail"}">
                <strong>${escapeHtml(item.source || "unknown")}</strong>
                <span>${escapeHtml(item.ok ? `成功${item.extracted != null ? ` · 抽取 ${item.extracted}` : ""}${item.hot != null ? ` · 热度 ${item.hot}` : ""}${item.newLaunch != null ? ` · 新游 ${item.newLaunch}` : ""}` : item.message || "失败")}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }
  function renderGameCard(game) {
    return `
      <article class="game-card">
        <header>
          <div>
            <h3>${escapeHtml(game.name)}</h3>
            <div class="muted">${escapeHtml(game.alias)} · ${escapeHtml(game.publisher)}</div>
          </div>
          <div class="score">${escapeHtml(String(game.heatScore))}</div>
        </header>
        <div class="tag-row">
          ${badge(game.status, game.status === "重点监控" ? "warning" : "info")}
          ${badge(`置信度 ${game.confidence}`, game.confidence === "低" ? "critical" : "")}
          ${renderTags(game.gameplay)}
        </div>
        <div class="detail-grid">
          ${detail("题材", game.theme)}
          ${detail("当前版本", game.currentVersion)}
          ${detail("最近更新", game.lastUpdated)}
          ${detail("Android 包名", game.androidPackage)}
          ${detail("iOS App ID", game.iosAppId)}
          ${detail("主要市场", game.mainMarkets.join(", "))}
        </div>
        <div class="detail-grid">
          ${detail("列表标签", game.listType === "newLaunch" ? "上周新测/新上线" : "热度50")}
          ${detail("来源说明", game.sourceHint || "导入数据")}
        </div>
        <div class="tag-row">
          ${link(game.appStoreUrl, "App Store")}
          ${link(game.googlePlayUrl, "Google Play")}
          ${link(game.officialSite, game.listType === "newLaunch" ? "候选来源" : "官网")}
        </div>
      </article>
    `;
  }

  function renderCreativeCard(creative) {
    return `
      <article class="creative-card">
        <div class="creative-thumb">
          <div>
            <strong>${escapeHtml(creative.platform)}</strong>
            <span>${escapeHtml(creative.format)}</span>
          </div>
        </div>
        <header>
          <div>
            <h3>${escapeHtml(creative.title)}</h3>
            <div class="muted">${escapeHtml(gameName(creative.gameId))} · ${escapeHtml(creative.language)}</div>
          </div>
          ${badge(creative.status, creative.status === "新增" ? "warning" : "info")}
        </header>
        <p class="muted">${escapeHtml(creative.hook)}</p>
        <div class="detail-grid">
          ${detail("首次发现", creative.firstSeen)}
          ${detail("最近发现", creative.lastSeen)}
          ${detail("国家", creative.countries.join(", "))}
          ${detail("置信度", creative.confidence)}
        </div>
        <div class="tag-row">${renderTags(creative.tags)}</div>
        <div>${link(creative.sourceUrl, "查看来源")}</div>
      </article>
    `;
  }

  function renderReportCard(report) {
    return `
      <article class="report-card">
        <header>
          <div>
            <h3>${escapeHtml(report.title)}</h3>
            <div class="muted">${escapeHtml(report.rangeLabel)}</div>
          </div>
          ${badge(report.canGenerate ? "可生成" : "等待数据", report.canGenerate ? "info" : "warning")}
        </header>
        <div class="detail-grid">
          ${detail("版本更新", report.versionCount)}
          ${detail("活动发现", report.activityCount)}
          ${detail("买量素材", report.creativeCount)}
          ${detail("涉及游戏", report.gameCount)}
          ${report.triggerDate ? detail("生成日期", report.triggerDate) : ""}
          ${report.reportStatus ? detail("生成状态", report.reportStatus) : ""}
        </div>
        <p class="muted">${escapeHtml(report.summary)}</p>
      </article>
    `;
  }

  function buildReport(start, endExclusive, title, options) {
    const startIso = toDateInput(start);
    const endIso = toDateInput(addDays(endExclusive, -1));
    const events = state.events.filter((event) => event.date >= startIso && event.date < toDateInput(endExclusive));
    const creatives = state.creatives.filter(
      (creative) =>
        (creative.firstSeen >= startIso && creative.firstSeen < toDateInput(endExclusive)) ||
        (creative.lastSeen >= startIso && creative.lastSeen < toDateInput(endExclusive))
    );
    const gameIds = new Set(events.map((event) => event.gameId).concat(creatives.map((creative) => creative.gameId)));
    const versionCount = events.filter((event) => event.type === "版本").length;
    const activityCount = events.filter((event) => event.type !== "版本").length;
    const hotGames = Array.from(gameIds)
      .map((id) => gameName(id))
      .slice(0, 5)
      .join("、");

    return {
      title,
      rangeLabel: `${startIso} 至 ${endIso}`,
      versionCount,
      activityCount,
      creativeCount: creatives.length,
      gameCount: gameIds.size,
      canGenerate: events.length + creatives.length > 0,
      triggerDate: options && options.trigger ? toDateInput(options.trigger) : "",
      reportStatus: options && options.status ? options.status : "",
      summary: gameIds.size
        ? `本期重点覆盖 ${hotGames}${gameIds.size > 5 ? " 等" : ""}，建议结合广告素材与版本活动做联动复核。`
        : "当前周期暂无已导入记录。"
    };
  }

  function importJson() {
    const textarea = document.getElementById("jsonImportInput");
    const raw = textarea.value.trim();
    if (!raw) {
      alert("请先粘贴 JSON。");
      return;
    }
    try {
      const incoming = JSON.parse(raw);
      if (Array.isArray(incoming.games)) state.games = normalizeGames(mergeById(state.games, incoming.games));
      if (Array.isArray(incoming.events)) state.events = mergeById(state.events, incoming.events);
      if (Array.isArray(incoming.creatives)) state.creatives = mergeById(state.creatives, incoming.creatives);
      saveState();
      fillFilters();
      textarea.value = "";
      render();
      alert("导入完成。");
    } catch (error) {
      alert(`JSON 解析失败：${error.message}`);
    }
  }

  function resetSeed() {
    if (!confirm("确认恢复内置样例？当前本地导入数据会被覆盖。")) return;
    state.games = buildSeedGames();
    state.events = seedEvents;
    state.creatives = seedCreatives;
    state.filters = {
      date: todayIso,
      gameIds: ["all"],
      platform: "all",
      search: ""
    };
    elements.dateFilter.value = todayIso;
    elements.searchInput.value = "";
    saveState();
    fillFilters();
    render();
  }

  function exportJson() {
    download(
      `slg-monitor-${elements.dateFilter.value || "all"}.json`,
      JSON.stringify(
        {
          exportedAt: new Date().toISOString(),
          games: state.games,
          events: state.events,
          creatives: state.creatives
        },
        null,
        2
      ),
      "application/json"
    );
  }

  function exportCsv() {
    const { events, creatives } = getFilteredData();
    const rows = [
      ["type", "date", "game", "platform", "title", "summary", "countries", "status", "confidence", "sourceUrl"]
    ];
    events.forEach((event) => {
      rows.push([
        event.type,
        event.date,
        gameName(event.gameId),
        event.sourcePlatform,
        event.title,
        event.summary,
        event.countries.join("|"),
        event.status,
        event.confidence,
        event.sourceUrl
      ]);
    });
    creatives.forEach((creative) => {
      rows.push([
        "素材",
        creative.firstSeen,
        gameName(creative.gameId),
        creative.platform,
        creative.title,
        creative.hook,
        creative.countries.join("|"),
        creative.status,
        creative.confidence,
        creative.sourceUrl
      ]);
    });
    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
    download(`slg-daily-${elements.dateFilter.value || "all"}.csv`, csv, "text/csv;charset=utf-8");
  }

  function panel(title, subtitle, body) {
    return `
      <section class="section-panel">
        <div class="section-header">
          <h2>${escapeHtml(title)}</h2>
          <span>${escapeHtml(subtitle)}</span>
        </div>
        ${body}
      </section>
    `;
  }

  function table(headers, bodyRows) {
    if (!bodyRows) return emptyState();
    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>${headers.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}</tr>
          </thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
    `;
  }

  function showEmptyIfNeeded(count) {
    if (count > 0) return;
    elements.content.innerHTML = emptyState();
  }

  function emptyState() {
    const template = document.getElementById("emptyStateTemplate");
    return template.innerHTML;
  }

  function detail(label, value) {
    return `
      <div class="detail-item">
        <span>${escapeHtml(label)}</span>
        <strong>${escapeHtml(String(value || "-"))}</strong>
      </div>
    `;
  }

  function badge(text, type) {
    return `<span class="tag ${type || ""}">${escapeHtml(text)}</span>`;
  }

  function renderTags(tags) {
    return (tags || []).map((tag) => badge(tag)).join("");
  }

  function link(url, label) {
    if (!url) return "";
    return `<a href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  }

  function gameById(id) {
    return state.games.find((game) => game.id === id) || {};
  }

  function gameName(id) {
    return gameById(id).name || id;
  }

  function matchText(value, search) {
    if (!search) return true;
    return JSON.stringify(value || {})
      .toLowerCase()
      .includes(search);
  }

  function mergeById(current, incoming) {
    const map = new Map(current.map((item) => [item.id, item]));
    incoming.forEach((item) => {
      if (!item.id) return;
      map.set(item.id, Object.assign({}, map.get(item.id) || {}, item));
    });
    return Array.from(map.values());
  }

  function getLatestDate() {
    const dates = []
      .concat(state.events.map((event) => event.date))
      .concat(state.creatives.map((creative) => creative.firstSeen))
      .concat(state.creatives.map((creative) => creative.lastSeen))
      .filter(Boolean)
      .sort();
    return dates[dates.length - 1] || todayIso;
  }

  function getPreviousNaturalWeek(date) {
    const currentMonday = startOfWeekMonday(date);
    const start = addDays(currentMonday, -7);
    return {
      start,
      endExclusive: currentMonday
    };
  }

  function getMonthlyReportForDate(date) {
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const candidates = [];
    for (let offset = -4; offset <= 0; offset += 1) {
      const anchor = new Date(dayStart.getFullYear(), dayStart.getMonth() + offset, 1);
      candidates.push(getMonthlySchedule(anchor.getFullYear(), anchor.getMonth()));
    }

    const pending = candidates
      .filter((item) => item.endExclusive <= dayStart && item.trigger >= dayStart)
      .sort((a, b) => b.start - a.start)[0];
    if (pending) {
      return Object.assign({}, pending, { status: "等待生成" });
    }

    const generated = candidates.filter((item) => item.trigger <= dayStart).sort((a, b) => b.start - a.start)[0];
    if (generated) {
      return Object.assign({}, generated, { status: "已到生成日" });
    }

    const fallback = candidates[candidates.length - 1];
    return Object.assign({}, fallback, { status: "等待生成" });
  }

  function getMonthlySchedule(year, monthIndex) {
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

  function nextMondayOnOrAfter(date) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = copy.getDay() || 7;
    const add = day === 1 ? 0 : 8 - day;
    copy.setDate(copy.getDate() + add);
    return copy;
  }

  function startOfWeekMonday(date) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = copy.getDay() || 7;
    copy.setDate(copy.getDate() - day + 1);
    return copy;
  }

  function parseLocalDate(value) {
    const parts = value.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function addDays(date, days) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function toDateInput(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function csvCell(value) {
    const text = String(value == null ? "" : value);
    return `"${text.replace(/"/g, '""')}"`;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }
})();
