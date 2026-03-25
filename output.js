//Wed Mar 25 2026 12:26:14 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const qs = require("querystring"),
  axios = require("axios"),
  querystring = require("querystring"),
  KS_SIGN_API_URL = process.env.ksjs_api || "你还没自定义接口你跑个蛋啊！",
  {
    getSig56,
    getSig68
  } = require("./public");
console.log("💡 签名API地址设置为: " + KS_SIGN_API_URL);
function generateRandomInteractionMessage() {
  const _0x41f7cd = ["正在观看广告", "认真观看中...", "浏览广告内容", "模拟用户行为", "观看视频广告", "保持活跃状态", "广告浏览中", "正常观看时长"];
  return _0x41f7cd[Math.floor(Math.random() * _0x41f7cd.length)];
}
function getEnvNumber(_0x36c8d3, _0x3f62ee) {
  const _0x53c400 = parseInt(process.env[_0x36c8d3], 10);
  return isNaN(_0x53c400) ? _0x3f62ee : _0x53c400;
}
const KSLOW_REWARD_THRESHOLD = getEnvNumber("KSLOW_REWARD_THRESHOLD", 1),
  KSROUNDS = getEnvNumber("KSROUNDS", 5),
  KSCOIN_LIMIT = getEnvNumber("KSCOIN_LIMIT", 500000),
  KSLOW_REWARD_LIMIT = getEnvNumber("KSLOW_REWARD_LIMIT", 1),
  KSFOLLOW_COUNT = getEnvNumber("KSFOLLOW_COUNT", 1),
  KSSEARCHFOLLOW_COUNT = getEnvNumber("KSSEARCHFOLLOW_COUNT", 1),
  KSLOOK_COUNT = getEnvNumber("KSLOOK_COUNT", 5),
  KSSEARCH_COUNT = getEnvNumber("KSSEARCH_COUNT", 5);
function getTasksToExecute() {
  const _0x429fc6 = process.env.Task;
  if (!_0x429fc6) return console.log("未设置Task环境变量，将执行所有任务 (food, box, look, search)"), ["food", "box", "look", "search"];
  const _0x3c6eca = _0x429fc6.split(",").map(_0x51b046 => _0x51b046.trim().toLowerCase()).filter(Boolean),
    _0x4c4110 = ["food", "box", "look", "search"],
    _0x2b40ab = _0x3c6eca.filter(_0x5810f5 => _0x4c4110.includes(_0x5810f5));
  if (_0x2b40ab.length === 0) return console.log("Task环境变量中没有有效任务，将执行所有任务 (food, box, look, search)"), ["food", "box", "look", "search"];
  const _0x180bd6 = _0x2b40ab.filter(_0x2a5793 => _0x2a5793 !== "look" && _0x2a5793 !== "search");
  return _0x2b40ab.includes("search") && _0x180bd6.push("search"), _0x2b40ab.includes("look") && _0x180bd6.push("look"), console.log("从Task环境变量中解析到要执行的任务: " + _0x180bd6.join(", ")), _0x180bd6;
}
function getAccountConfigsFromEnv() {
  const _0x197786 = [],
    _0x329435 = new Set();
  if (process.env.ksjsck) {
    const _0x3a8512 = process.env.ksjsck,
      _0x4918dd = _0x3a8512.split("&").map(_0x3d8f23 => _0x3d8f23.trim()).filter(Boolean);
    _0x197786.push(..._0x4918dd);
  }
  for (let _0x4de4e4 = 1; _0x4de4e4 <= 666; _0x4de4e4++) {
    const _0x5a7238 = "ksjsck" + _0x4de4e4;
    if (process.env[_0x5a7238]) {
      const _0x1f620e = process.env[_0x5a7238],
        _0x40cbef = _0x1f620e.split("&").map(_0x2b11ba => _0x2b11ba.trim()).filter(Boolean);
      _0x197786.push(..._0x40cbef);
    }
  }
  const _0x44b2fc = [];
  for (const _0x1c7149 of _0x197786) {
    !_0x329435.has(_0x1c7149) && (_0x329435.add(_0x1c7149), _0x44b2fc.push(_0x1c7149));
  }
  return console.log("从ksjsck及ksjsck1到ksjsck666环境变量中解析到 " + _0x44b2fc.length + " 个唯一配置"), _0x44b2fc;
}
const accountConfigs = getAccountConfigsFromEnv(),
  accountCount = accountConfigs.length,
  tasksToExecute = getTasksToExecute();
console.log("================================================================================");
console.log("                                  ⭐ 快手至尊金币至尊极速版 ⭐                                ");
console.log("🏆 安全稳定 · 高效收益 · 尊贵体验 🏆                        ");
console.log("🏆 代理购买2.1r一月· http://www.gzsk5.com/#/register?invitation=hnking2&shareid=516                  ");
console.log("🏆 接口工具脚本获取ck获取· https://pan.quark.cn/s/41d4dae92896                  ");
console.log("🏆 云手机· https://cloud.ace-bot.cn/#/inviteReg?invite=501891                  ");
console.log("================================================================================");
console.log("🎉 系统初始化完成，快手至尊金币极速版版启动成功！🎉");
console.log("================================================================================");
console.log("您可以根据需求设置以下环境变量来自定义任务行为：");
console.log("----------------------------------------------------------------");
console.log("账号/任务控制 (必填/常用):");
console.log("  - ksjsck/ksjsckX: 账号信息 (cookie#salt#proxy) - 必填项");
console.log("  - Task: 指定任务 (如 food,box,look,search)");
console.log("  - KSROUNDS: 总执行轮数 (默认 5)");
console.log("----------------------------------------------------------------");
console.log("频率/追加次数 (已支持自定义):");
console.log("  - KSLOOK_COUNT: 每轮 look (主任务) 次数 (默认 5)");
console.log("  - KSFOLLOW_COUNT: 每次 look 成功后 follow (追加) 次数 (默认 1)");
console.log("  - KSSEARCH_COUNT: 每轮 search (主任务) 次数 (默认 5)");
console.log("  - KSSEARCHFOLLOW_COUNT: 每次 search 成功后 search_follow (追加) 次数 (默认 100)");
console.log("----------------------------------------------------------------");
console.log("风控/限制设置:");
console.log("  - KSCOIN_LIMIT: 金币上限 (超过停止, 默认 150000)");
console.log("  - KSLOW_REWARD_LIMIT: 连续低奖励停止次数 (默认 1)");
console.log("  - MAX_CONCURRENCY: 最大并发账号数 (默认 3)");
console.log("  - ksjs_api: 签名服务 API 地址");
console.log("================================================================");
console.log("💎 检测到环境变量配置：" + accountCount + "个账号");
console.log("🎯 将执行以下任务：" + tasksToExecute.join(", "));
console.log("🎯 配置参数：轮数=" + KSROUNDS + ", look次数/轮=" + KSLOOK_COUNT + ", search次数/轮=" + KSSEARCH_COUNT + ", follow次数/look=" + KSFOLLOW_COUNT + ", search_follow次数/search=" + KSSEARCHFOLLOW_COUNT + ", 金币上限=" + KSCOIN_LIMIT + ", 低奖励阈值=" + KSLOW_REWARD_THRESHOLD + ", 连续低奖励上限=" + KSLOW_REWARD_LIMIT);
accountCount > (process.env.MAX_CONCURRENCY || 999) && (console.log("错误: 检测到 " + accountCount + " 个账号配置，最多只允许" + (process.env.MAX_CONCURRENCY || 999) + "个"), process.exit(1));
function generateKuaishouDid() {
  try {
    const _0x58e10e = "0123456789abcdef";
    let _0x3cf095 = "";
    for (let _0x1b793f = 0; _0x1b793f < 16; _0x1b793f++) {
      _0x3cf095 += _0x58e10e.charAt(Math.floor(Math.random() * _0x58e10e.length));
    }
    return "ANDROID_" + _0x3cf095;
  } catch (_0x296217) {
    const _0x13fbb0 = Date.now().toString(16).toUpperCase();
    return "ANDROID_" + _0x13fbb0.substring(0, 16);
  }
}
async function sendRequest(_0x4c329e, _0x29d647 = null, _0x3d7466 = "Unknown Request") {
  const _0x2505a2 = {
    ..._0x4c329e
  };
  let _0x4a0fb8 = null;
  if (_0x29d647) {
    try {
      _0x4a0fb8 = new SocksProxyAgent(_0x29d647);
    } catch (_0x2ae63b) {
      console.log("[WARN] " + _0x3d7466 + " invalid proxy URL (" + _0x2ae63b.message + "), fallback to direct mode");
    }
  }
  try {
    const _0x512c0f = {
        "method": _0x2505a2.method || "GET",
        "url": _0x2505a2.url,
        "headers": _0x2505a2.headers || {},
        "data": _0x2505a2.body || _0x2505a2.form,
        "timeout": _0x2505a2.timeout || 30000,
        ...(_0x4a0fb8 && {
          "httpAgent": _0x4a0fb8,
          "httpsAgent": _0x4a0fb8
        })
      },
      _0x3a9a0f = await axios(_0x512c0f);
    return {
      "response": _0x3a9a0f,
      "body": _0x3a9a0f.data
    };
  } catch (_0x4ee809) {
    if (_0x4ee809.response) {
      return {
        "response": _0x4ee809.response,
        "body": null
      };
    }
    return {
      "response": null,
      "body": null
    };
  }
}
function isValidIP(_0x95b93c) {
  if (!_0x95b93c || typeof _0x95b93c !== "string") return false;
  if (_0x95b93c.includes("<html>") || _0x95b93c.includes("503 Service Temporarily Unavailable") || _0x95b93c.includes("502 Bad Gateway") || _0x95b93c.includes("504 Gateway Timeout")) return false;
  const _0x196e4e = /^(\d{1,3}\.){3}\d{1,3}$/,
    _0x3b88eb = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (_0x196e4e.test(_0x95b93c)) {
    const _0x247976 = _0x95b93c.split(".");
    for (const _0x5a5871 of _0x247976) {
      const _0x137e98 = parseInt(_0x5a5871, 10);
      if (_0x137e98 < 0 || _0x137e98 > 255 || isNaN(_0x137e98)) return false;
    }
    return true;
  }
  return _0x3b88eb.test(_0x95b93c);
}
async function testProxyConnectivity(_0x113e6f, _0x5ec78e = "Proxy Connectivity Test", _0x403965 = 3) {
  if (!_0x113e6f) return {
    "ok": true,
    "msg": "No proxy configured (direct mode)",
    "ip": "localhost"
  };
  let _0x2ef8ea = null;
  const _0x3634dc = ["https://api.ip.sb/ip", "https://ifconfig.me/ip", "https://icanhazip.com", "https://checkip.amazonaws.com", "https://api.myip.com"];
  for (let _0x2c317d = 1; _0x2c317d <= _0x403965; _0x2c317d++) {
    console.log("[PROXY] " + _0x5ec78e + " testing... (" + _0x2c317d + "/" + _0x403965 + ")");
    for (const _0x4144a9 of _0x3634dc) {
      try {
        const {
          body: _0x45b77a
        } = await sendRequest({
          "method": "GET",
          "url": _0x4144a9,
          "headers": {
            "User-Agent": "ProxyTester/1.0"
          },
          "timeout": 15000
        }, _0x113e6f, _0x5ec78e + " ->" + new URL(_0x4144a9).hostname);
        if (typeof _0x45b77a === "string" && (_0x45b77a.includes("<html>") || _0x45b77a.includes("503 Service Temporarily Unavailable") || _0x45b77a.includes("502 Bad Gateway") || _0x45b77a.includes("504 Gateway Timeout"))) continue;
        if (!_0x45b77a) continue;
        let _0x2b8166 = null;
        if (_0x4144a9.includes("httpbin.org") && _0x45b77a.origin) _0x2b8166 = _0x45b77a.origin;else {
          if (_0x4144a9.includes("ipify.org") && _0x45b77a.ip) _0x2b8166 = _0x45b77a.ip;else {
            if (_0x4144a9.includes("jsonip.com") && _0x45b77a.ip) _0x2b8166 = _0x45b77a.ip;else {
              if (_0x4144a9.includes("my-ip.io") && _0x45b77a.ip) _0x2b8166 = _0x45b77a.ip;else {
                if (typeof _0x45b77a === "string" && !_0x45b77a.includes("<")) _0x2b8166 = _0x45b77a.trim();
              }
            }
          }
        }
        if (_0x2b8166 && isValidIP(_0x2b8166)) return console.log("[OK] " + _0x5ec78e + " exit IP: " + _0x2b8166), {
          "ok": true,
          "msg": "SOCKS5 proxy is available, exit IP: " + _0x2b8166,
          "ip": _0x2b8166
        };
      } catch (_0x59dbc4) {
        _0x2ef8ea = _0x59dbc4;
      }
      await new Promise(_0x5d9a80 => setTimeout(_0x5d9a80, 500));
    }
    if (_0x2c317d < _0x403965) {
      const _0x525b02 = _0x2c317d * 2000;
      console.log("[RETRY] " + _0x5ec78e + " all endpoints failed, retry in " + _0x525b02 / 1000 + "s...");
      await new Promise(_0x31f150 => setTimeout(_0x31f150, _0x525b02));
    }
  }
  try {
    new URL(_0x113e6f);
  } catch (_0x23d8de) {
    return {
      "ok": false,
      "msg": "Invalid proxy URL: " + _0x23d8de.message,
      "ip": null
    };
  }
  return {
    "ok": false,
    "msg": "Proxy test failed: " + (_0x2ef8ea?.["message"] || "all endpoints unavailable"),
    "ip": null
  };
}
const usedProxies = new Set();
async function getAccountBasicInfo(_0x27d294, _0x34b84f, _0x2cad29 = "?") {
  const _0x4286d7 = "https://nebula.kuaishou.com/rest/n/nebula/activity/earn/overview/basicInfo?source=bottom_guide_first",
    {
      body: _0x275d24
    } = await sendRequest({
      "method": "GET",
      "url": _0x4286d7,
      "headers": {
        "Host": "nebula.kuaishou.com",
        "User-Agent": "kwai-android aegon/3.56.0",
        "Cookie": _0x27d294,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "timeout": 12000
    }, _0x34b84f, "Account[" + _0x2cad29 + "] fetch basic info");
  if (_0x275d24 && _0x275d24.result === 1 && _0x275d24.data) return {
    "nickname": _0x275d24.data.userData?.["nickname"] || null,
    "totalCoin": _0x275d24.data.totalCoin ?? null,
    "allCash": _0x275d24.data.allCash ?? null
  };
  return null;
}
function centerAlign(_0x1d179b, _0x1b3e8c) {
  _0x1d179b = String(_0x1d179b);
  if (_0x1d179b.length >= _0x1b3e8c) return _0x1d179b.substring(0, _0x1b3e8c);
  const _0x34ce88 = _0x1b3e8c - _0x1d179b.length,
    _0xcac7ae = Math.floor(_0x34ce88 / 2),
    _0x56ecc8 = _0x34ce88 - _0xcac7ae;
  return " ".repeat(_0xcac7ae) + _0x1d179b + " ".repeat(_0x56ecc8);
}
class KuaishouAdTask {
  constructor({
    index: _0x160557,
    salt: _0x3e98cb,
    cookie: _0x42edab,
    nickname = "",
    proxyUrl = null,
    tasksToExecute = ["food", "box", "look", "search"],
    remark = ""
  }) {
    this.index = _0x160557;
    this.salt = _0x3e98cb;
    this.cookie = _0x42edab;
    this.nickname = nickname || remark || "账号" + _0x160557;
    this.remark = remark;
    this.proxyUrl = proxyUrl;
    this.coinLimit = KSCOIN_LIMIT;
    this.coinExceeded = false;
    this.tasksToExecute = tasksToExecute;
    this.searchFollowCount = 0;
    this.extractCookieInfo();
    this.headers = {
      "Host": "nebula.kuaishou.com",
      "Connection": "keep-alive",
      "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Lite Build/QKQ1.190910.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.101 Mobile Safari/537.36",
      "Cookie": this.cookie,
      "content-type": "application/json"
    };
    this.taskReportPath = "/rest/r/ad/task/report";
    this.startTime = Date.now();
    this.endTime = this.startTime - 30000;
    this.queryParams = "mod=Xiaomi(MI 11)&appver=" + this.appver + "&egid=" + this.egid + "&did=" + this.did;
    this.taskConfigs = {
      "box": {
        "name": "宝箱广告",
        "pageId": 11101,
        "businessId": 606,
        "posId": 20346,
        "subPageId": 100024064,
        "requestSceneType": 1,
        "taskType": 1
      },
      "look": {
        "name": "看广告得金币",
        "pageId": 11101,
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 1,
        "taskType": 1
      },
      "food": {
        "name": "饭补广告",
        "pageId": 11101,
        "businessId": 9362,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 7,
        "taskType": 2
      },
      "follow": {
        "name": "追加看广告得金币",
        "pageId": 11101,
        "businessId": 672,
        "posId": 24067,
        "subPageId": 100026367,
        "requestSceneType": 2,
        "taskType": 1
      },
      "search": {
        "name": "搜索任务",
        "pageId": 11014,
        "businessId": 7076,
        "posId": 216268,
        "subPageId": 100161537,
        "requestSceneType": 1,
        "taskType": 1
      },
      "search_follow": {
        "name": "搜索任务追加",
        "pageId": 11014,
        "businessId": 7076,
        "posId": 216268,
        "subPageId": 100161537,
        "requestSceneType": 7,
        "taskType": 2
      }
    };
    this.taskStats = {};
    const _0x50437e = new Set(this.tasksToExecute);
    _0x50437e.add("follow");
    _0x50437e.add("search");
    _0x50437e.add("search_follow");
    _0x50437e.forEach(_0x3eb7de => {
      {
        if (this.taskConfigs[_0x3eb7de]) {
          this.taskStats[_0x3eb7de] = {
            "success": 0,
            "failed": 0,
            "totalReward": 0
          };
        }
      }
    });
    this.lowRewardStreak = 0;
    this.lowRewardThreshold = KSLOW_REWARD_THRESHOLD;
    this.lowRewardLimit = KSLOW_REWARD_LIMIT;
    this.stopAllTasks = false;
    this.taskLimitReached = {};
    this.tasksToExecute.forEach(_0x1710b5 => {
      this.taskConfigs[_0x1710b5] && (this.taskLimitReached[_0x1710b5] = false);
    });
    this.taskLimitReached.follow = false;
    this.taskLimitReached.search = false;
    this.taskLimitReached.search_follow = false;
  }
  async ["checkCoinLimit"]() {
    try {
      const _0x51f181 = await getAccountBasicInfo(this.cookie, this.proxyUrl, this.index);
      if (_0x51f181 && _0x51f181.totalCoin) {
        const _0x5350cd = parseInt(_0x51f181.totalCoin);
        if (_0x5350cd >= 500000) return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币已达 " + _0x5350cd + "，超过 " + this.coinLimit + " 阈值，将停止任务"), this.coinExceeded = true, this.stopAllTasks = true, true;
      }
      return false;
    } catch (_0x39115e) {
      return console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币检查异常: " + _0x39115e.message), false;
    }
  }
  async ["runDailySignAndClockIn"]() {
    await this.signInDaily();
    await this.runHugeClockIn();
  }
  async ["signInDaily"]() {
    try {
      const _0x2d31a6 = await getSig68({}, {}, "get", "json", this.cookie),
        _0x138cd4 = _0x2d31a6 && _0x2d31a6.result ? _0x2d31a6.result : "";
      if (!_0x138cd4) {
        return console.log("[WARN] account[" + this.nickname + "] signIn signature build failed"), false;
      }
      const _0x2d35e6 = "https://nebula.kuaishou.com/rest/wd/encourage/unionTask/signIn/report?" + _0x138cd4,
        {
          body: _0x166393
        } = await sendRequest({
          "method": "GET",
          "url": _0x2d35e6,
          "headers": {
            "Content-Type": "application/json",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": this.cookie
          },
          "timeout": 12000
        }, this.proxyUrl, "account[" + this.nickname + "] signIn"),
        _0x19bbb8 = _0x166393?.["data"]?.["reportRewardResult"]?.["eventTrackingAwardInfo"]?.["awardInfo"]?.[0]?.["amount"];
      if (_0x19bbb8 !== undefined && _0x19bbb8 !== null) return console.log("[OK] account[" + this.nickname + "] signIn success, reward=" + _0x19bbb8), true;
      if (_0x166393?.["result"] === 1) {
        return console.log("[OK] account[" + this.nickname + "] signIn request done"), true;
      }
      const _0x35460a = _0x166393?.["error_msg"] || _0x166393?.["errorMsg"] || "unknown";
      return console.log("[WARN] account[" + this.nickname + "] signIn not completed: " + _0x35460a), false;
    } catch (_0x3ad982) {
      return console.log("[WARN] account[" + this.nickname + "] signIn error: " + _0x3ad982.message), false;
    }
  }
  async ["runHugeClockIn"]() {
    try {
      const {
        body: _0x739149
      } = await sendRequest({
        "method": "GET",
        "url": "https://encourage.kuaishou.com/rest/ug-regular/hugeSignIn/home?source=task&sourceToken=",
        "headers": {
          "User-Agent": "kwai-android aegon/3.56.0",
          "Cookie": this.cookie
        },
        "timeout": 12000
      }, this.proxyUrl, "account[" + this.nickname + "] hugeSignIn home");
      if (_0x739149?.["result"] !== 1 || !_0x739149?.["data"]?.["task"]) {
        return false;
      }
      const _0x4f47b9 = _0x739149.data.task,
        _0x210230 = {
          "subBizId": _0x4f47b9.subbizId,
          "idfa": "",
          "oaid": this.oDid || this.did || "",
          "userFeatureParam": _0x4f47b9.hugeSignInTaskToken,
          "snapshotExtParam": _0x4f47b9.taskSnapshotToken,
          "selfReportParam": "{\"pushSwitchStatus\":true,\"hugeSignInWidgetStatus\":false,\"ignoringBatteryOptimizationsStatus\":true}"
        },
        _0x555845 = await getSig56(Buffer.from(JSON.stringify(_0x210230)).toString("base64"));
      if (!_0x555845) return console.log("[WARN] account[" + this.nickname + "] hugeSignIn list sig build failed"), false;
      const _0x228a5d = "https://encourage.kuaishou.com/rest/wd/zt/task/list/trigger?__NS_sig3=" + _0x555845,
        {
          body: _0x452005
        } = await sendRequest({
          "method": "POST",
          "url": _0x228a5d,
          "headers": {
            "Content-Type": "application/json",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": this.cookie
          },
          "body": _0x210230,
          "timeout": 12000
        }, this.proxyUrl, "account[" + this.nickname + "] hugeSignIn task list");
      if (_0x452005?.["result"] !== 1 || !Array.isArray(_0x452005?.["data"]?.["tasks"])) return false;
      let _0x5d8e12 = false;
      for (const _0x1c6817 of _0x452005.data.tasks) {
        if (_0x1c6817.taskId === 29951 && _0x1c6817.taskStatus !== "TASK_COMPLETED") {
          const _0x2b072b = await this.reportHugeClockTask(_0x1c6817.subBizId, _0x1c6817.taskId);
          _0x5d8e12 = _0x5d8e12 || _0x2b072b;
        }
      }
      return !_0x5d8e12 && console.log("[OK] account[" + this.nickname + "] hugeSignIn clock task already completed"), true;
    } catch (_0x43fce6) {
      return console.log("[WARN] account[" + this.nickname + "] hugeSignIn error: " + _0x43fce6.message), false;
    }
  }
  async ["reportHugeClockTask"](_0x4339e3, _0x1a8dc4) {
    try {
      const _0x143362 = {
          "reportCount": 1,
          "subBizId": _0x4339e3,
          "taskId": _0x1a8dc4
        },
        _0x40c62f = await getSig56(Buffer.from(JSON.stringify(_0x143362)).toString("base64"));
      if (!_0x40c62f) return false;
      const _0x4f41ce = "https://encourage.kuaishou.com/rest/wd/zt/task/report?__NS_sig3=" + _0x40c62f,
        {
          body: _0x195137
        } = await sendRequest({
          "method": "POST",
          "url": _0x4f41ce,
          "headers": {
            "Content-Type": "application/json",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": this.cookie
          },
          "body": _0x143362,
          "timeout": 12000
        }, this.proxyUrl, "account[" + this.nickname + "] hugeSignIn report");
      if (_0x195137?.["result"] === 1 && _0x195137?.["data"]?.["taskCompleted"] === true) return console.log("[OK] account[" + this.nickname + "] hugeSignIn report success"), true;
      return false;
    } catch (_0x17dd39) {
      return console.log("[WARN] account[" + this.nickname + "] hugeSignIn report error: " + _0x17dd39.message), false;
    }
  }
  ["extractCookieInfo"]() {
    try {
      const _0x344f56 = this.cookie.match(/egid=([^;]+)/),
        _0x41664c = this.cookie.match(/did=([^;]+)/),
        _0x14fcfa = this.cookie.match(/userId=([^;]+)/),
        _0x217e13 = this.cookie.match(/oDid=([^;]+)/),
        _0xe384bb = this.cookie.match(/kuaishou\.api_st=([^;]+)/),
        _0x1154aa = this.cookie.match(/appver=([^;]+)/);
      this.egid = _0x344f56 ? _0x344f56[1] : "";
      this.did = _0x41664c ? _0x41664c[1] : "";
      this.userId = _0x14fcfa ? _0x14fcfa[1] : "";
      this.oDid = _0x217e13 ? _0x217e13[1] : "";
      this.kuaishouApiSt = _0xe384bb ? _0xe384bb[1] : "";
      this.appver = _0x1154aa ? _0x1154aa[1] : "13.7.20.10468";
      (!this.egid || !this.did) && console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " cookie格式可能无 egid 或 did，但继续尝试...");
    } catch (_0x4ecf73) {
      console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 解析cookie失败: " + _0x4ecf73.message);
    }
  }
  ["getTaskStats"]() {
    return this.taskStats;
  }
  ["printTaskStats"]() {
    console.log("\n账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 任务执行统计:");
    const _0x8e624a = ["box", "look", "follow", "food", "search", "search_follow"];
    _0x8e624a.forEach(_0x29ddb1 => {
      const _0x1159bd = this.taskStats[_0x29ddb1],
        _0x2b3a00 = this.taskConfigs[_0x29ddb1];
      _0x1159bd && _0x2b3a00 && console.log("  " + _0x2b3a00.name + ": 成功" + _0x1159bd.success + "次, 失败" + _0x1159bd.failed + "次, 总奖励" + _0x1159bd.totalReward + "金币");
    });
  }
  async ["retryOperation"](_0x51945a, _0x4d038f, _0x228a32 = 3, _0x51bd20 = 2000) {
    let _0x559dea = 0,
      _0x16dc9c = null;
    while (_0x559dea < _0x228a32) {
      try {
        {
          const _0x7e045f = await _0x51945a();
          if (_0x7e045f) return _0x7e045f;
          _0x16dc9c = new Error(_0x4d038f + " 返回空结果");
        }
      } catch (_0x4e422) {
        _0x16dc9c = _0x4e422;
        console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x4d038f + " 异常: " + _0x4e422.message);
      }
      _0x559dea++;
      _0x559dea < _0x228a32 && (console.log("账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x4d038f + " 失败，重试 " + _0x559dea + "/" + _0x228a32), await new Promise(_0x17e8ce => setTimeout(_0x17e8ce, _0x51bd20)));
    }
    return null;
  }
  async ["getAdInfo"](_0x16f0a5) {
    try {
      const _0x509282 = "/rest/e/reward/mixed/ad",
        _0x192eea = {
          "encData": "|encData|",
          "sign": "|sign|",
          "cs": "false",
          "client_key": "2ac2a76d",
          "videoModelCrowdTag": "1_23",
          "os": "android",
          "kuaishou.api_st": this.kuaishouApiSt,
          "uQaTag": "1##swLdgl:99#ecPp:-9#cmNt:-0#cmHs:-3#cmMnsl:-0"
        },
        _0x321e86 = {
          "earphoneMode": "1",
          "mod": "Xiaomi(23116PN5BC)",
          "appver": this.appver,
          "isp": "CUCC",
          "language": "zh-cn",
          "ud": this.userId,
          "did_tag": "0",
          "net": "WIFI",
          "kcv": "1599",
          "app": "0",
          "kpf": "ANDROID_PHONE",
          "ver": "11.6",
          "android_os": "0",
          "boardPlatform": "pineapple",
          "kpn": "NEBULA",
          "androidApiLevel": "35",
          "country_code": "cn",
          "sys": "ANDROID_15",
          "sw": "1080",
          "sh": "2400",
          "abi": "arm64",
          "userRecoBit": "0"
        };
      let _0x131446 = "{}";
      if (_0x16f0a5.businessId === 7076) {
        const _0x538323 = "eyJwYWdlSWQiOiAxMTAxNCwgInN1YlBhZ2VJZCI6IDEwMDE2MTUzNywgInBvc0lkIjogMjE2MjY4LCAiYnVzaW5lc3NJZCI6IDcwNzYsICJleHRQYXJhbXMiOiAiIiwgImN1c3RvbURhdGEiOiB7ImV4aXRJbmZvIjogeyJ0b2FzdERlc2MiOiBudWxsLCAidG9hc3RJbWdVcmwiOiBudWxsfX0sICJwZW5kYW50VHlwZSI6IDEsICJkaXNwbGF5VHlwZSI6IDIsICJzaW5nbGVQYWdlSWQiOiAwLCAic2luZ2xlU3ViUGFnZUlkIjogMCwgImNoYW5uZWwiOiAwLCAiY291bnRkb3duUmVwb3J0IjogZmFsc2UsICJ0aGVtZVR5cGUiOiAwLCAibWl4ZWRBZCI6IHRydWUsICJmdWxsTWl4ZWQiOiB0cnVlLCAiYXV0b1JlcG9ydCI6IHRydWUsICJmcm9tVGFza0NlbnRlciI6IHRydWUsICJzZWFyY2hJbnNwaXJlU2NoZW1lSW5mbyI6IG51bGwsICJhbW91bnQiOiAwfQ==",
          _0x10d3b3 = {
            "openH5AdCount": 0,
            "sessionLookedCompletedCount": this.searchFollowCount,
            "sessionType": _0x16f0a5.requestSceneType === 2 ? "2" : "1",
            "searchKey": "短剧小说",
            "triggerType": "2",
            "disableReportToast": true,
            "businessEnterAction": "7",
            "neoParams": _0x538323
          };
        _0x131446 = JSON.stringify(_0x10d3b3);
      }
      const _0x171c49 = {
          "appInfo": {
            "appId": "kuaishou_nebula",
            "name": "快手极速版",
            "packageName": "com.kuaishou.nebula",
            "version": this.appver,
            "versionCode": -1
          },
          "deviceInfo": {
            "osType": 1,
            "osVersion": "15",
            "deviceId": this.did,
            "screenSize": {
              "width": 1080,
              "height": 2249
            },
            "ftt": ""
          },
          "userInfo": {
            "userId": this.userId,
            "age": 0,
            "gender": ""
          },
          "impInfo": [{
            "pageId": _0x16f0a5.pageId || 11101,
            "subPageId": _0x16f0a5.subPageId,
            "action": 0,
            "browseType": 3,
            "impExtData": _0x131446,
            "mediaExtData": "{}"
          }]
        },
        _0x47bd2c = Buffer.from(JSON.stringify(_0x171c49)).toString("base64");
      let _0x26923a = await this.getSign(_0x47bd2c);
      if (!_0x26923a) return console.log("❌ 账号[" + this.nickname + "] 获取 encsign 失败，无法获取广告"), null;
      _0x192eea.encData = _0x26923a.encdata;
      _0x192eea.sign = _0x26923a.sign;
      let _0x3c7aa6 = await this.requestSignService({
        "urlpath": _0x509282,
        "reqdata": qs.stringify(_0x192eea) + "&" + qs.stringify(_0x321e86),
        "api_client_salt": this.salt
      });
      if (!_0x3c7aa6) return console.log("❌ 账号[" + this.nickname + "] 获取 nesig 失败，无法获取广告"), null;
      const _0x356788 = {
          ..._0x321e86,
          "sig": _0x3c7aa6.sig,
          "__NS_sig3": _0x3c7aa6.__NS_sig3,
          "__NS_xfalcon": _0x3c7aa6.__NS_xfalcon,
          "__NStokensig": _0x3c7aa6.__NStokensig
        },
        _0x58eb6a = "https://api.e.kuaishou.com" + _0x509282 + "?" + querystring.stringify(_0x356788),
        {
          response: _0x1f5e1f,
          body: _0xeb6f0c
        } = await sendRequest({
          "method": "POST",
          "url": _0x58eb6a,
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Host": "api.e.kuaishou.com",
            "User-Agent": "kwai-android aegon/3.56.0",
            "Cookie": "kuaishou_api_st=" + this.kuaishouApiSt
          },
          "form": _0x192eea,
          "timeout": 12000
        }, this.proxyUrl, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告");
      if (!_0xeb6f0c) return null;
      if (_0xeb6f0c.errorMsg === "OK" && _0xeb6f0c.feeds && _0xeb6f0c.feeds[0] && _0xeb6f0c.feeds[0].ad) {
        const _0xd4a37e = _0xeb6f0c.feeds[0].caption || _0xeb6f0c.feeds[0].ad?.["caption"] || "";
        _0xd4a37e && console.log("✅ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 成功获取到广告信息：" + _0xd4a37e.substring(0, 10) + "...");
        const _0xb66cc4 = _0xeb6f0c.feeds[0].exp_tag || "",
          _0x157a83 = _0xb66cc4.split("/")[1]?.["split"]("_")?.[0] || "";
        return {
          "cid": _0xeb6f0c.feeds[0].ad.creativeId,
          "llsid": _0x157a83
        };
      }
      return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告失败: " + (_0xeb6f0c.errorMsg || JSON.stringify(_0xeb6f0c).substring(0, 50)) + "..."), null;
    } catch (_0x185f53) {
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 获取广告异常: " + _0x185f53.message), null;
    }
  }
  async ["generateSignature"](_0x5ed0ad, _0x31bb03, _0x574325, _0x3c46d5) {
    try {
      {
        const _0xd60b70 = JSON.stringify({
            "businessId": _0x3c46d5.businessId,
            "endTime": this.endTime,
            "extParams": "",
            "mediaScene": "video",
            "neoInfos": [{
              "creativeId": _0x5ed0ad,
              "extInfo": "",
              "llsid": _0x31bb03,
              "requestSceneType": _0x3c46d5.requestSceneType,
              "taskType": _0x3c46d5.taskType,
              "watchExpId": "",
              "watchStage": 0
            }],
            "pageId": _0x3c46d5.pageId,
            "posId": _0x3c46d5.posId,
            "reportType": 0,
            "sessionId": "",
            "startTime": this.startTime,
            "subPageId": _0x3c46d5.subPageId
          }),
          _0x59f97d = "bizStr=" + encodeURIComponent(_0xd60b70) + "&cs=false&client_key=2ac2a76d&kuaishou.api_st=" + this.kuaishouApiSt,
          _0x3b5e6d = this.queryParams + "&" + _0x59f97d,
          _0x4e4e8a = await this.requestSignService({
            "urlpath": this.taskReportPath,
            "reqdata": _0x3b5e6d,
            "api_client_salt": this.salt
          }, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 生成报告签名");
        if (!_0x4e4e8a) return null;
        return {
          "sig": _0x4e4e8a.sig,
          "sig3": _0x4e4e8a.__NS_sig3,
          "sigtoken": _0x4e4e8a.__NStokensig,
          "xfalcon": _0x4e4e8a.__NS_xfalcon,
          "post": _0x59f97d
        };
      }
    } catch (_0x2636ab) {
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 生成签名异常: " + _0x2636ab.message), null;
    }
  }
  async ["submitReport"](_0x55cdc4, _0x506011, _0x50f1f5, _0x84670e, _0x43b887, _0x2dafd7, _0x18a88e) {
    try {
      {
        const _0x5cf9ee = "https://api.e.kuaishou.com" + this.taskReportPath + "?" + (this.queryParams + "&sig=" + _0x55cdc4 + "&__NS_sig3=" + _0x506011 + "&__NS_xfalcon=" + _0x84670e + "&__NStokensig=" + _0x50f1f5),
          {
            response: _0x58605b,
            body: _0x41d3de
          } = await sendRequest({
            "method": "POST",
            "url": _0x5cf9ee,
            "headers": {
              "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
              "Host": "api.e.kuaishou.cn",
              "User-Agent": "kwai-android aegon/3.56.0",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            "body": _0x43b887,
            "timeout": 12000
          }, this.proxyUrl, "账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 提交任务");
        if (!_0x41d3de) {
          return {
            "success": false,
            "reward": 0
          };
        }
        if (_0x41d3de.result === 1) {
          const _0x465266 = _0x41d3de.data?.["neoAmount"] || 0;
          return console.log("💰 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x18a88e.name + "获得" + _0x465266 + "金币奖励！"), _0x465266 <= this.lowRewardThreshold ? (this.lowRewardStreak++, this.did = generateKuaishouDid(), console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 金币奖励(" + _0x465266 + ")低于阈值(" + this.lowRewardThreshold + ")，当前连续低奖励次数：" + this.lowRewardStreak + "/" + this.lowRewardLimit), this.lowRewardStreak >= this.lowRewardLimit && (console.log("🏁 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 连续" + this.lowRewardLimit + "次奖励≤" + this.lowRewardThreshold + "，停止全部任务"), this.stopAllTasks = true)) : this.lowRewardStreak = 0, {
            "success": true,
            "reward": _0x465266
          };
        }
        if ([20107, 20108, 1003, 415].includes(_0x41d3de.result)) return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x18a88e.name + " 已达上限"), this.taskLimitReached[_0x2dafd7] = true, {
          "success": false,
          "reward": 0
        };
        if ([500].includes(_0x41d3de.result)) return console.log("⚠️ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x18a88e.name + " 500错已停止该账号"), this.taskLimitReached[_0x2dafd7] = true, {
          "success": false,
          "reward": 0
        };
        return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " " + _0x18a88e.name + " 奖励失败，result=" + _0x41d3de.result + " msg=" + (_0x41d3de.data || "")), {
          "success": false,
          "reward": 0
        };
      }
    } catch (_0x15188a) {
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 提交任务异常: " + _0x15188a.message), {
        "success": false,
        "reward": 0
      };
    }
  }
  async ["getSign"](_0x19d96a) {
    try {
      {
        const {
          response: _0x38bd6f,
          body: _0x19a6cd
        } = await sendRequest({
          "method": "POST",
          "url": KS_SIGN_API_URL + "/encsign",
          "body": JSON.stringify({
            "data": _0x19d96a
          }),
          "headers": {
            "Content-Type": "application/json"
          }
        });
        if (_0x19a6cd && _0x19a6cd.status) return _0x19a6cd.data;
        return console.log("❌ 账号[" + this.nickname + "] encsign 签名服务失败: " + (_0x19a6cd?.["message"] || "无响应")), null;
      }
    } catch (_0x10ee30) {
      return console.log("❌ 账号[" + this.nickname + "] encsign 签名请求异常: " + _0x10ee30.message), null;
    }
  }
  async ["requestSignService"](_0x19c6a3, _0x11f7bd) {
    let _0x226b94 = {},
      _0x25551e = {
        "path": _0x19c6a3.urlpath,
        "data": _0x19c6a3.reqdata,
        "salt": _0x19c6a3.api_client_salt
      };
    const {
      response: _0x8db197,
      body: _0x1f09fb
    } = await sendRequest({
      "method": "POST",
      "url": KS_SIGN_API_URL + "/nssig",
      "headers": {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      "body": JSON.stringify(_0x25551e),
      "timeout": 15000
    }, null, _0x11f7bd + "（签名服务）");
    if (_0x1f09fb && _0x1f09fb.data) {
      let _0x542a19 = _0x1f09fb.data.nssig3,
        _0x10bc14 = _0x1f09fb.data.nstokensig,
        _0xddf14 = _0x1f09fb.data.nssig4;
      return Object.assign(_0x226b94, {
        "__NS_sig3": _0x542a19,
        "__NStokensig": _0x10bc14,
        "sig": _0x1f09fb.data.sig,
        "__NS_xfalcon": _0xddf14
      }), _0x226b94;
    }
    return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 签名服务失败: " + (_0x1f09fb?.["error"] || _0x1f09fb?.["message"] || "无响应")), null;
  }
  async ["executeTask"](_0x2036d5) {
    const _0x1758ba = this.taskConfigs[_0x2036d5];
    if (!_0x1758ba) return false;
    if (this.taskLimitReached[_0x2036d5]) return false;
    try {
      const _0x1773af = await this.retryOperation(() => this.getAdInfo(_0x1758ba), "获取" + _0x1758ba.name + "信息", 3);
      if (!_0x1773af) {
        return this.taskStats[_0x2036d5].failed++, false;
      }
      const _0x56a894 = Math.floor(Math.random() * 10000) + 30000;
      console.log("🔍 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " ==>" + _0x1758ba.name + " " + generateRandomInteractionMessage() + " " + Math.round(_0x56a894 / 1000) + " 秒");
      await new Promise(_0x33344d => setTimeout(_0x33344d, _0x56a894));
      const _0x5ef960 = await this.retryOperation(() => this.generateSignature(_0x1773af.cid, _0x1773af.llsid, _0x2036d5, _0x1758ba), "生成" + _0x1758ba.name + "签名", 3);
      if (!_0x5ef960) {
        return this.taskStats[_0x2036d5].failed++, false;
      }
      const _0x1b0dea = await this.retryOperation(() => this.submitReport(_0x5ef960.sig, _0x5ef960.sig3, _0x5ef960.sigtoken, _0x5ef960.xfalcon, _0x5ef960.post, _0x2036d5, _0x1758ba), "提交" + _0x1758ba.name + "报告", 3);
      if (_0x1b0dea?.["success"]) return this.taskStats[_0x2036d5].success++, this.taskStats[_0x2036d5].totalReward += _0x1b0dea.reward || 0, true;
      return this.taskStats[_0x2036d5].failed++, false;
    } catch (_0x37a768) {
      return console.log("❌ 账号[" + this.nickname + "]" + (this.remark ? "（" + this.remark + "）" : "") + " 任务异常(" + _0x2036d5 + "): " + _0x37a768.message), this.taskStats[_0x2036d5].failed++, false;
    }
  }
  async ["executeAllTasksByPriority"]() {
    const _0x3bbf9f = this.tasksToExecute.includes("look"),
      _0x252002 = this.tasksToExecute.includes("food"),
      _0x584f24 = this.tasksToExecute.includes("box"),
      _0x4a9ddc = this.tasksToExecute.includes("search"),
      _0x33c82a = this.tasksToExecute.filter(_0x2dbc48 => _0x2dbc48 !== "look" && _0x2dbc48 !== "search");
    for (let _0x1955ea = 0; _0x1955ea < KSROUNDS; _0x1955ea++) {
      if (this.stopAllTasks) break;
      console.log("\n============================== 🚀 账号[" + this.nickname + "] 第" + (_0x1955ea + 1) + "/" + KSROUNDS + "轮开始 ==============================");
      if (_0x3bbf9f) {
        const _0x448e8c = this.taskConfigs.look,
          _0x4a549b = this.taskConfigs.follow;
        console.log("🎬 开始执行 " + _0x448e8c.name + " (+" + _0x4a549b.name + ")，本轮共 " + KSLOOK_COUNT + " 次");
        for (let _0x1cbed9 = 0; _0x1cbed9 < KSLOOK_COUNT; _0x1cbed9++) {
          if (this.stopAllTasks || this.taskLimitReached.look) break;
          console.log("\n--- 账号[" + this.nickname + "] " + _0x448e8c.name + " 第 " + (_0x1cbed9 + 1) + "/" + KSLOOK_COUNT + " 次执行 ---");
          const _0x443e00 = await this.executeTask("look");
          if (_0x443e00 && !this.stopAllTasks) {
            const _0x478863 = Math.floor(Math.random() * 5000) + 5000;
            console.log("⏱ 账号[" + this.nickname + "] look 任务成功，随机等待 " + Math.round(_0x478863 / 1000) + " 秒后执行 " + _0x4a549b.name);
            await new Promise(_0x2ef4f0 => setTimeout(_0x2ef4f0, _0x478863));
            const _0x35a1bc = KSFOLLOW_COUNT;
            for (let _0x2fe73d = 0; _0x2fe73d < _0x35a1bc; _0x2fe73d++) {
              if (this.stopAllTasks || this.taskLimitReached.follow) break;
              console.log("\n--- 账号[" + this.nickname + "] " + _0x4a549b.name + " (第 " + (_0x2fe73d + 1) + "/" + _0x35a1bc + " 次) 紧随 look 任务执行 ---");
              await this.executeTask("follow");
            }
          }
          if (_0x1cbed9 < KSLOOK_COUNT - 1 && !this.stopAllTasks && !this.taskLimitReached.look) {
            const _0x3b9950 = _0x1cbed9 < KSLOOK_COUNT - 1 && !this.stopAllTasks && !this.taskLimitReached.look;
            if (_0x3b9950) {
              const _0x23415a = Math.floor(Math.random() * 5000) + 5000;
              console.log("⏱ 账号[" + this.nickname + "] " + _0x448e8c.name + " 任务间隔，随机等待 " + Math.round(_0x23415a / 1000) + " 秒");
              await new Promise(_0x251074 => setTimeout(_0x251074, _0x23415a));
            }
          }
        }
        if (!this.stopAllTasks && (_0x252002 || _0x584f24 || _0x4a9ddc)) {
          const _0x42100e = Math.floor(Math.random() * 15000) + 15000;
          console.log("\n🔄 账号[" + this.nickname + "] 任务组完成，等待 " + Math.round(_0x42100e / 1000) + " 秒切换...");
          await new Promise(_0x30c2cf => setTimeout(_0x30c2cf, _0x42100e));
        }
      }
      if (_0x4a9ddc) {
        const _0x1f7aa8 = this.taskConfigs.search,
          _0x4d53b1 = this.taskConfigs.search_follow;
        console.log("\n🎬 开始执行 " + _0x1f7aa8.name + " (+" + _0x4d53b1.name + ")，本轮共 " + KSSEARCH_COUNT + " 次");
        for (let _0x371130 = 0; _0x371130 < KSSEARCH_COUNT; _0x371130++) {
          if (this.stopAllTasks || this.taskLimitReached.search) break;
          console.log("\n--- 账号[" + this.nickname + "] " + _0x1f7aa8.name + " 第 " + (_0x371130 + 1) + "/" + KSSEARCH_COUNT + " 次执行 ---");
          const _0x41ebb3 = await this.executeTask("search");
          if (_0x41ebb3 && !this.stopAllTasks) {
            const _0x346fe8 = Math.floor(Math.random() * 5000) + 5000;
            console.log("⏱ 账号[" + this.nickname + "] search 任务成功，随机等待 " + Math.round(_0x346fe8 / 1000) + " 秒后执行 " + _0x4d53b1.name);
            await new Promise(_0x4f3355 => setTimeout(_0x4f3355, _0x346fe8));
            const _0x15475b = KSSEARCHFOLLOW_COUNT;
            for (let _0x4b0088 = 0; _0x4b0088 < _0x15475b; _0x4b0088++) {
              if (this.stopAllTasks || this.taskLimitReached.search_follow) break;
              console.log("\n--- 账号[" + this.nickname + "] " + _0x4d53b1.name + " (第 " + (_0x4b0088 + 1) + "/" + _0x15475b + " 次) 紧随 search 任务执行 ---");
              this.searchFollowCount++;
              await this.executeTask("search_follow");
              this.searchFollowCount = 0;
            }
          }
          if (_0x371130 < KSSEARCH_COUNT - 1 && !this.stopAllTasks && !this.taskLimitReached.search) {
            const _0x216545 = _0x371130 < KSSEARCH_COUNT - 1 && !this.stopAllTasks && !this.taskLimitReached.search;
            if (_0x216545) {
              const _0x223daa = Math.floor(Math.random() * 5000) + 5000;
              console.log("⏱ 账号[" + this.nickname + "] " + _0x1f7aa8.name + " 任务间隔，随机等待 " + Math.round(_0x223daa / 1000) + " 秒");
              await new Promise(_0x5296cd => setTimeout(_0x5296cd, _0x223daa));
            }
          }
        }
        if (!this.stopAllTasks && (_0x252002 || _0x584f24)) {
          const _0x5f3fc7 = Math.floor(Math.random() * 15000) + 15000;
          console.log("\n🔄 账号[" + this.nickname + "] 任务组完成，等待 " + Math.round(_0x5f3fc7 / 1000) + " 秒切换...");
          await new Promise(_0x48a1d9 => setTimeout(_0x48a1d9, _0x5f3fc7));
        }
      }
      for (const _0x502d81 of _0x33c82a) {
        if (this.stopAllTasks) break;
        if (_0x502d81 === "look" || _0x502d81 === "search") continue;
        const _0xa14953 = this.taskConfigs[_0x502d81];
        if (this.taskLimitReached[_0x502d81]) {
          console.log("⚠️ 账号[" + this.nickname + "] " + _0xa14953.name + " 已达上限，本轮跳过");
          continue;
        }
        console.log("\n🎬 开始执行 " + _0xa14953.name + "，本轮共 1 次");
        await this.executeTask(_0x502d81);
        if (!this.stopAllTasks) {
          const _0x3d13a7 = Math.floor(Math.random() * 5000) + 5000;
          console.log("⏱ 账号[" + this.nickname + "] " + _0xa14953.name + " 任务间隔，随机等待 " + Math.round(_0x3d13a7 / 1000) + " 秒");
          await new Promise(_0x13646d => setTimeout(_0x13646d, _0x3d13a7));
        }
      }
      if (_0x1955ea < KSROUNDS - 1 && !this.stopAllTasks) {
        const _0x2cf5c9 = Math.floor(Math.random() * 10000) + 60000;
        console.log("\n============================== ⏱ 账号[" + this.nickname + "] 第" + (_0x1955ea + 1) + "轮完成，等待 " + Math.round(_0x2cf5c9 / 1000) + " 秒进入下一轮 ==============================");
        await new Promise(_0x190580 => setTimeout(_0x190580, _0x2cf5c9));
      }
    }
    return {};
  }
}
function parseAccountConfig(_0x4ede02) {
  const _0x2031a1 = String(_0x4ede02 || "").trim().split("#");
  if (_0x2031a1.length < 2) return null;
  let _0x50a6cf = "",
    _0x473fcf = "",
    _0x5adc59 = "",
    _0x32bd71 = null;
  if (_0x2031a1.length === 2) _0x473fcf = _0x2031a1[0], _0x5adc59 = _0x2031a1[1];else {
    if (_0x2031a1.length === 3) /socks5:\/\//i.test(_0x2031a1[2]) ? (_0x473fcf = _0x2031a1[0], _0x5adc59 = _0x2031a1[1], _0x32bd71 = _0x2031a1[2]) : (_0x50a6cf = _0x2031a1[0], _0x473fcf = _0x2031a1[1], _0x5adc59 = _0x2031a1[2]);else {
      if (_0x2031a1.length >= 4) {
        _0x50a6cf = _0x2031a1[0];
        _0x473fcf = _0x2031a1[1];
        _0x5adc59 = _0x2031a1.slice(2, _0x2031a1.length - 1).join("#");
        _0x32bd71 = _0x2031a1[_0x2031a1.length - 1];
      }
    }
  }
  if (_0x32bd71) {
    if (_0x32bd71.includes("|")) {
      console.log("开始解析代理格式: " + _0x32bd71);
      const _0x466db0 = _0x32bd71.split("|");
      if (_0x466db0.length >= 2) {
        const [_0x49ff04, _0x4eb974, _0x4bf567, _0x3bbb6d] = _0x466db0;
        _0x32bd71 = "socks5://" + _0x4bf567 + ":" + _0x3bbb6d + "@" + _0x49ff04 + ":" + _0x4eb974;
      }
    } else {
      if (!/^socks5:\/\//i.test(_0x32bd71)) _0x32bd71 = null;else try {
        new URL(_0x32bd71);
      } catch (_0x5e9735) {
        console.log("❌ 代理URL格式错误: " + _0x32bd71);
        _0x32bd71 = null;
      }
    }
  }
  return {
    "remark": _0x50a6cf || "",
    "salt": _0x5adc59,
    "cookie": _0x473fcf,
    "proxyUrl": _0x32bd71
  };
}
function loadAccountsFromEnv() {
  const _0x49b0b6 = getAccountConfigsFromEnv(),
    _0x1e727a = [];
  for (const _0x5db54d of _0x49b0b6) {
    {
      const _0x5a4f6a = parseAccountConfig(_0x5db54d);
      _0x5a4f6a ? _0x1e727a.push(_0x5a4f6a) : console.log("账号格式错误：" + _0x5db54d);
    }
  }
  return _0x1e727a.forEach((_0x189b0d, _0x473f9a) => {
    _0x189b0d.index = _0x473f9a + 1;
  }), _0x1e727a;
}
async function concurrentExecute(_0x44936e, _0x691604, _0x501699) {
  const _0xbb1194 = new Array(_0x44936e.length);
  let _0x5acd42 = 0;
  async function _0xb20b45() {
    while (true) {
      const _0x3c139a = _0x5acd42++;
      if (_0x3c139a >= _0x44936e.length) return;
      const _0xacaf58 = _0x44936e[_0x3c139a];
      try {
        _0xbb1194[_0x3c139a] = await _0x501699(_0xacaf58, _0x3c139a);
      } catch (_0x72ee23) {
        console.log("并发执行异常（index=" + (_0x3c139a + 1) + "）：" + _0x72ee23.message);
        _0xbb1194[_0x3c139a] = null;
      }
    }
  }
  const _0xa70d3f = Array.from({
    "length": Math.min(_0x691604, _0x44936e.length)
  }, _0xb20b45);
  return await Promise.all(_0xa70d3f), _0xbb1194;
}
async function processAccount(_0x4ff900) {
  if (_0x4ff900.proxyUrl) {
    const _0x167eb0 = await testProxyConnectivity(_0x4ff900.proxyUrl, "账号[" + _0x4ff900.index + "]" + (_0x4ff900.remark ? "（" + _0x4ff900.remark + "）" : ""));
    console.log("  - " + (_0x167eb0.ok ? "✅ 代理验证通过" : "❌ 代理验证失败") + ": " + _0x167eb0.msg);
    if (_0x167eb0.ok && _0x167eb0.ip && _0x167eb0.ip !== "localhost") {
      if (!isValidIP(_0x167eb0.ip)) console.log("⚠️ 账号[" + _0x4ff900.index + "] 检测到无效IP格式，跳过重复检查");else {
        if (usedProxies.has(_0x167eb0.ip)) console.log("\n⚠️ 存在相同代理IP（" + _0x167eb0.ip + "），请立即检查！");else usedProxies.add(_0x167eb0.ip);
      }
    } else {
      if (!_0x167eb0.ok) return console.log("❌ 账号[" + _0x4ff900.index + "] 代理测试失败，跳过该账号"), {
        "index": _0x4ff900.index,
        "remark": _0x4ff900.remark || "无备注",
        "nickname": "账号" + _0x4ff900.index,
        "initialCoin": 0,
        "finalCoin": 0,
        "coinChange": 0,
        "initialCash": 0,
        "finalCash": 0,
        "cashChange": 0,
        "error": "代理测试失败: " + _0x167eb0.msg,
        "skipped": true
      };
    }
  } else console.log("账号[" + _0x4ff900.index + "]" + (_0x4ff900.remark ? "（" + _0x4ff900.remark + "）" : "") + " 未配置代理，走直连");
  console.log("账号[" + _0x4ff900.index + "]" + (_0x4ff900.remark ? "（" + _0x4ff900.remark + "）" : "") + " 🔍 获取账号信息中...");
  let _0x2982c3 = await getAccountBasicInfo(_0x4ff900.cookie, _0x4ff900.proxyUrl, _0x4ff900.index),
    _0x13e834 = _0x2982c3?.["nickname"] || "账号" + _0x4ff900.index;
  if (_0x2982c3) {
    const _0x53215f = _0x2982c3.totalCoin != null ? _0x2982c3.totalCoin : "未知",
      _0x32b41f = _0x2982c3.allCash != null ? _0x2982c3.allCash : "未知";
    console.log("账号[" + _0x13e834 + "] ✅ 登录成功，💰 当前金币: " + _0x53215f + "，💸 当前余额: " + _0x32b41f);
  } else console.log("账号[" + _0x13e834 + "] ❌ 基本信息获取失败，但仍继续执行任务");
  const _0x3a58df = new KuaishouAdTask({
    ..._0x4ff900,
    "nickname": _0x13e834,
    "tasksToExecute": tasksToExecute
  });
  try {
    await _0x3a58df.runDailySignAndClockIn();
  } catch (_0x300fbb) {
    console.log("[WARN] account[" + _0x3a58df.nickname + "] daily sign/clock flow error: " + _0x300fbb.message);
  }
  if (_0x2982c3) {
    await _0x3a58df.checkCoinLimit();
    if (_0x3a58df.coinExceeded) {
      console.log("账号[" + _0x3a58df.nickname + "]" + (_0x4ff900.remark ? "（" + _0x4ff900.remark + "）" : "") + " 初始金币已超过阈值，不执行任务");
      const _0x43835f = await getAccountBasicInfo(_0x4ff900.cookie, _0x4ff900.proxyUrl, _0x4ff900.index),
        _0x5c84d5 = _0x2982c3?.["totalCoin"] || 0,
        _0x6bedc9 = _0x43835f?.["totalCoin"] || 0,
        _0x5ef440 = _0x6bedc9 - _0x5c84d5,
        _0x351fa2 = _0x2982c3?.["allCash"] || 0,
        _0x512367 = _0x43835f?.["allCash"] || 0,
        _0x5a4bd2 = _0x512367 - _0x351fa2;
      return {
        "index": _0x4ff900.index,
        "remark": _0x4ff900.remark || "无备注",
        "nickname": _0x13e834,
        "initialCoin": _0x5c84d5,
        "finalCoin": _0x6bedc9,
        "coinChange": _0x5ef440,
        "initialCash": _0x351fa2,
        "finalCash": _0x512367,
        "cashChange": _0x5a4bd2,
        "stats": _0x3a58df.getTaskStats(),
        "coinLimitExceeded": true
      };
    }
  }
  console.log("账号[" + _0x3a58df.nickname + "]" + (_0x4ff900.remark ? "（" + _0x4ff900.remark + "）" : "") + " 🚀 开始执行所有任务");
  await _0x3a58df.executeAllTasksByPriority();
  const _0x17381e = await getAccountBasicInfo(_0x4ff900.cookie, _0x4ff900.proxyUrl, _0x4ff900.index),
    _0x28d660 = _0x2982c3?.["totalCoin"] || 0,
    _0xd1e53b = _0x17381e?.["totalCoin"] || 0,
    _0x165688 = _0xd1e53b - _0x28d660,
    _0x33313e = _0x2982c3?.["allCash"] || 0,
    _0x440ffe = _0x17381e?.["allCash"] || 0,
    _0x30f496 = _0x440ffe - _0x33313e;
  return _0x3a58df.printTaskStats(), {
    "index": _0x4ff900.index,
    "remark": _0x4ff900.remark || "无备注",
    "nickname": _0x13e834,
    "initialCoin": _0x28d660,
    "finalCoin": _0xd1e53b,
    "coinChange": _0x165688,
    "initialCash": _0x33313e,
    "finalCash": _0x440ffe,
    "cashChange": _0x30f496,
    "stats": _0x3a58df.getTaskStats(),
    "coinLimitExceeded": _0x3a58df.coinExceeded,
    "infoFetchFailed": !_0x2982c3
  };
}
function printAccountsSummary(_0x108c89) {
  if (!_0x108c89.length) {
    console.log("\n没有可显示的账号信息。");
    return;
  }
  const _0x3abf38 = _0x108c89.reduce((_0x2fa1f4, _0x42bad1) => {
      return _0x2fa1f4 + (parseInt(_0x42bad1.initialCoin) || 0);
    }, 0),
    _0x3b2a2e = _0x108c89.reduce((_0x2abe2a, _0x1d3fbe) => {
      return _0x2abe2a + (parseInt(_0x1d3fbe.finalCoin) || 0);
    }, 0),
    _0x4d2cea = _0x3b2a2e - _0x3abf38,
    _0x409dfa = _0x108c89.reduce((_0x417a80, _0x29054b) => {
      return _0x417a80 + (parseFloat(_0x29054b.initialCash) || 0);
    }, 0),
    _0x59debe = _0x108c89.reduce((_0x3810ff, _0x3c18f3) => {
      return _0x3810ff + (parseFloat(_0x3c18f3.finalCash) || 0);
    }, 0),
    _0x5a2c44 = _0x59debe - _0x409dfa;
  let _0x1bcef5 = 0,
    _0x293a19 = 0,
    _0x2bae43 = 0;
  _0x108c89.forEach(_0x2de7bb => {
    _0x2de7bb.stats && Object.values(_0x2de7bb.stats).forEach(_0x1435ef => {
      _0x1bcef5 += _0x1435ef.success + _0x1435ef.failed;
      _0x293a19 += _0x1435ef.success;
      _0x2bae43 += _0x1435ef.totalReward;
    });
  });
  const _0xe0b23a = _0x1bcef5 > 0 ? (_0x293a19 / _0x1bcef5 * 100).toFixed(1) : "0.0",
    _0x59e654 = _0x108c89.filter(_0x4c237c => _0x4c237c.skipped).length;
  console.log("\n\n" + "=".repeat(80));
  console.log("|" + centerAlign("      快手养号任务执行结果汇总表      ", 78) + "|");
  console.log("=".repeat(80));
  console.log("|" + ("总账号数: " + _0x108c89.length).padEnd(22) + ("跳过账号: " + _0x59e654).padEnd(22) + ("总任务数: " + _0x1bcef5).padEnd(22) + ("任务成功率: " + _0xe0b23a + "%").padEnd(10) + "|");
  console.log("|" + ("总金币变化: " + _0x4d2cea).padEnd(26) + ("总金币奖励: " + _0x2bae43).padEnd(26) + ("总余额变化: " + _0x5a2c44.toFixed(2)).padEnd(24) + "|");
  console.log("-".repeat(80));
  const _0x242696 = ["序号", "备注", "账号昵称", "初始金币", "最终金币", "金币变化", "初始余额", "最终余额", "余额变化", "状态"],
    _0x1c9275 = [6, 16, 16, 12, 12, 12, 12, 12, 12, 10];
  let _0x2b9c5e = "|";
  _0x242696.forEach((_0x599041, _0x2cfc3f) => {
    _0x2b9c5e += centerAlign(_0x599041, _0x1c9275[_0x2cfc3f]) + "|";
  });
  console.log(_0x2b9c5e);
  let _0x23145f = "|";
  _0x1c9275.forEach(_0x55539e => {
    _0x23145f += "-".repeat(_0x55539e) + "|";
  });
  console.log(_0x23145f);
  _0x108c89.forEach(_0x5b2217 => {
    let _0x826dac = "|";
    _0x826dac += centerAlign(_0x5b2217.index, _0x1c9275[0]) + "|";
    _0x826dac += centerAlign(_0x5b2217.remark, _0x1c9275[1]) + "|";
    let _0x4c8bed = _0x5b2217.nickname || "-";
    if (_0x5b2217.skipped) _0x4c8bed += " ❌";else {
      if (_0x5b2217.coinLimitExceeded) _0x4c8bed += " ⚠️";else _0x5b2217.infoFetchFailed && (_0x4c8bed += " 🔶");
    }
    _0x826dac += centerAlign(_0x4c8bed.substring(0, _0x1c9275[2] - 2), _0x1c9275[2]) + "|";
    _0x826dac += centerAlign(_0x5b2217.initialCoin, _0x1c9275[3]) + "|";
    _0x826dac += centerAlign(_0x5b2217.finalCoin, _0x1c9275[4]) + "|";
    const _0x485517 = _0x5b2217.coinChange >= 0 ? "+" + _0x5b2217.coinChange : _0x5b2217.coinChange;
    _0x826dac += centerAlign(_0x485517, _0x1c9275[5]) + "|";
    _0x826dac += centerAlign(_0x5b2217.initialCash, _0x1c9275[6]) + "|";
    _0x826dac += centerAlign(_0x5b2217.finalCash, _0x1c9275[7]) + "|";
    const _0x4d7e38 = _0x5b2217.cashChange >= 0 ? "+" + _0x5b2217.cashChange.toFixed(2) : _0x5b2217.cashChange.toFixed(2);
    _0x826dac += centerAlign(_0x4d7e38, _0x1c9275[8]) + "|";
    let _0x3288ae = "完成";
    if (_0x5b2217.skipped) _0x3288ae = "跳过";else _0x5b2217.coinLimitExceeded ? _0x3288ae = "超限" : _0x5b2217.infoFetchFailed && (_0x3288ae = "无信息");
    _0x826dac += centerAlign(_0x3288ae, _0x1c9275[9]) + "|";
    console.log(_0x826dac);
  });
  console.log("=".repeat(80));
  console.log("|" + centerAlign("      任务执行完成，请查看详细结果      ", 78) + "|");
  console.log("=".repeat(80));
}
(async () => {
  const _0xdfff6b = loadAccountsFromEnv();
  console.log("共找到 " + _0xdfff6b.length + " 个有效账号");
  !_0xdfff6b.length && process.exit(1);
  const _0x17ad93 = getEnvNumber("MAX_CONCURRENCY", 3);
  console.log("\n防黑并发：" + _0x17ad93 + "    防黑轮数：" + KSROUNDS + "    look次数/轮：" + KSLOOK_COUNT + "    search次数/轮：" + KSSEARCH_COUNT + "    follow次数/look：" + KSFOLLOW_COUNT + "    search_follow次数/search：" + KSSEARCHFOLLOW_COUNT + "\n");
  const _0x583e54 = [];
  await concurrentExecute(_0xdfff6b, _0x17ad93, async _0x47731f => {
    console.log("\n—— 🚀 开始账号[" + _0x47731f.index + "]" + (_0x47731f.remark ? "（" + _0x47731f.remark + "）" : "") + " ——");
    try {
      const _0x249c1b = await processAccount(_0x47731f);
      _0x583e54.push({
        "index": _0x47731f.index,
        "remark": _0x47731f.remark || "无备注",
        "nickname": _0x249c1b?.["nickname"] || "账号" + _0x47731f.index,
        "initialCoin": _0x249c1b?.["initialCoin"] || 0,
        "finalCoin": _0x249c1b?.["finalCoin"] || 0,
        "coinChange": _0x249c1b?.["coinChange"] || 0,
        "initialCash": _0x249c1b?.["initialCash"] || 0,
        "finalCash": _0x249c1b?.["finalCash"] || 0,
        "cashChange": _0x249c1b?.["cashChange"] || 0,
        "stats": _0x249c1b?.["stats"] || {},
        "coinLimitExceeded": _0x249c1b?.["coinLimitExceeded"] || false,
        "skipped": _0x249c1b?.["skipped"] || false,
        "infoFetchFailed": _0x249c1b?.["infoFetchFailed"] || false,
        "error": _0x249c1b?.["error"] || null
      });
    } catch (_0x5a9638) {
      console.log("账号[" + _0x47731f.index + "]" + (_0x47731f.remark ? "（" + _0x47731f.remark + "）" : "") + " ❌ 执行异常：" + _0x5a9638.message);
      _0x583e54.push({
        "index": _0x47731f.index,
        "remark": _0x47731f.remark || "无备注",
        "nickname": "账号" + _0x47731f.index,
        "initialCoin": 0,
        "finalCoin": 0,
        "coinChange": 0,
        "initialCash": 0,
        "finalCash": 0,
        "cashChange": 0,
        "error": _0x5a9638.message,
        "skipped": true
      });
    }
  });
  _0x583e54.sort((_0x1aed62, _0x4722f3) => _0x1aed62.index - _0x4722f3.index);
  console.log("\n全部完成。", "✅");
  console.log("\n---------------------------------------------- 账号信息汇总 ----------------------------------------------");
  printAccountsSummary(_0x583e54);
})();