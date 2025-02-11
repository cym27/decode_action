//Tue Feb 11 2025 16:15:00 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("快手极速版");
let tokens = $.getdata("ksjsb") || process.env.ksjsb || "",
  is_bf = $.getdata("ksjsb_bf") || process.env.ksjsb_bf || "1";
!(async () => {
  $.log("\n版本：0.3\n实现签到、开宝箱功能，增加定时模式，兼容安卓，优化报错\n------------------");
  is_bf = parseInt(is_bf);
  if (tokens.indexOf("@") != -1) {
    tokens = tokens.split("@") || [];
  } else tokens = tokens.split("\n") || [];
  if (!tokens[0]) {
    $.log("请设置环境变量添加快手极速版账号");
    return;
  }
  $.log("共获取到" + tokens.length + "个账号");
  let _0x55c667 = [];
  tokens.forEach(_0x30ed96 => {
    let _0xe51ed0 = jxUser(_0x30ed96);
    if (_0xe51ed0.ck) _0x55c667.push(new UserInfo(_0xe51ed0.ck, _0xe51ed0.sig2, _0xe51ed0.sig3, _0xe51ed0.kami, _0xe51ed0.cron));else {
      console.log("账号格式错误");
    }
  });
  for (let _0x369297 = 0; _0x369297 < _0x55c667.length; _0x369297++) {
    let _0x431618 = _0x55c667[_0x369297];
    if (is_bf) {
      _0x431618.main(_0x369297);
    } else {
      await _0x431618.main(_0x369297);
    }
  }
})().catch(_0x2881c2 => $.logErr(_0x2881c2)).finally(() => {
  if (is_bf) {}
});
function jxUser(_0x54e737) {
  let _0x139fe6 = {},
    _0x2325bc = _0x54e737.split("#");
  return _0x2325bc.forEach(_0x159ccd => {
    let _0x290522 = _0x159ccd.split("==");
    _0x139fe6[_0x290522[0]] = _0x290522[1];
  }), _0x139fe6;
}
function UserInfo(_0x246e8a = "", _0x4e1e63 = "", _0x398e61 = "", _0x3c36ae = "", _0x3300c6 = "") {
  let _0x14065e = false,
    _0x53aaef = _0x246e8a,
    _0x3eeb6b = _0x398e61,
    _0x20075b = _0x4e1e63,
    _0x195376 = _0x3c36ae,
    _0x36cb74 = _0x3300c6,
    _0x5df32d = 0;
  function _0x256258(_0x1491ba) {
    let _0x269e33 = _0x1491ba.replace("//", "/").split("/")[1],
      _0x50b60d = "https://nebula.kuaishou.com/nebula/task/earning?source=menu&layoutType=4&hyId=nebula_earning&ts=" + $.timestamp();
    return {
      "Host": _0x269e33,
      "Connection": "keep-alive",
      "Accept": "*/*",
      "Referer": _0x50b60d,
      "Accept-Language": "zh-cn",
      "Cookie": _0x53aaef,
      "Content-Type": "application/json"
    };
  }
  this.main = async function (_0x5d2c2f) {
    _0x5df32d = _0x5d2c2f + 1;
    await _0x464099();
    await _0x339198();
    await _0x1622fe();
    await _0x2cc9a4();
    zcheck == 200 && (zzhuce == "账号已存在" || zzhuce == "注册成功") && zdenglu == 200 ? ($.log("账号[" + _0x5df32d + "]卡密验证成功！"), $.log("账号[" + _0x5df32d + "]卡密到期时间：" + $.time("yyyy-MM-dd HH:mm:ss", zvip * 1000))) : ($.log("账号[" + _0x5df32d + "]卡密验证失败！"), _0x14065e = true);
    if (!_0x14065e) {
      await _0x59875e();
      let _0x20d9c8 = 0;
      while (_0x20d9c8 < 11) {
        _0x20d9c8++;
        await _0x523042();
        if (_0x36cb74 == 1 || remainbx == 0) _0x20d9c8 = 12;else {
          if (_0x36cb74 == 0 && remainbx > 0) {
            $.log("账号[" + _0x5df32d + "]正在等待下一次开宝箱...");
            await $.wait(durtime);
          }
        }
      }
    }
    await $.done();
  };
  function _0x464099() {
    return new Promise(_0x32d3d3 => {
      let _0x57d851 = "http://ip-api.com/json";
      const _0x29b5a7 = {
        "url": _0x57d851
      };
      $.get(_0x29b5a7, async (_0x536a64, _0x5ddac0, _0x5c44d4) => {
        try {
          if (_0x5c44d4) {
            _0x5c44d4 = JSON.parse(_0x5c44d4);
            _0x5c44d4.query ? zip = _0x5c44d4.query : ($.log("网络错误，终止运行"), _0x14065e = true);
          } else $.log("网络错误，终止运行"), _0x14065e = true;
        } catch (_0x5d7f54) {
          $.logErr(_0x5d7f54, _0x5ddac0);
        } finally {
          _0x32d3d3(_0x5c44d4);
        }
      });
    });
  }
  function _0x339198() {
    return new Promise(_0x3e683e => {
      let _0x5c8774 = "https://kami.da-bu-liu.com/api.php?act=km_logon&app=10000&kami=" + _0x195376;
      const _0x4c4b4e = {
        "url": _0x5c8774
      };
      $.get(_0x4c4b4e, async (_0x2deb7f, _0x554a49, _0x51ae12) => {
        try {
          if (_0x51ae12) _0x51ae12 = JSON.parse(_0x51ae12), zcheck = _0x51ae12.code, _0x51ae12.code == 200 ? zvip = _0x51ae12.msg.vip : $.log("账号[" + _0x5df32d + "]" + _0x51ae12.msg + "！");else {
            $.log("账号[" + _0x5df32d + "]网络错误，终止运行");
          }
        } catch (_0x3ef34a) {
          $.logErr(_0x3ef34a, _0x554a49);
        } finally {
          _0x3e683e(_0x51ae12);
        }
      });
    });
  }
  function _0x1622fe() {
    return new Promise(_0x24054e => {
      let _0x5c3493 = "https://kami.da-bu-liu.com/api.php?act=user_reg&app=10001&user=" + _0x195376 + "&password=" + zip;
      const _0x5dbd51 = {
        "url": _0x5c3493
      };
      $.get(_0x5dbd51, async (_0x50ea45, _0x1818ff, _0x363f71) => {
        try {
          _0x363f71 ? (_0x363f71 = JSON.parse(_0x363f71), _0x363f71.msg ? zzhuce = _0x363f71.msg : _0x14065e = true) : _0x14065e = true;
        } catch (_0x202982) {
          $.logErr(_0x202982, _0x1818ff);
        } finally {
          _0x24054e(_0x363f71);
        }
      });
    });
  }
  function _0x2cc9a4() {
    return new Promise(_0x44b8ed => {
      let _0xd4c258 = "https://kami.da-bu-liu.com/api.php?act=user_logon&app=10001&account=" + _0x195376 + "&password=" + zip;
      const _0x4902c8 = {
        "url": _0xd4c258
      };
      $.get(_0x4902c8, async (_0x25e460, _0x4226bc, _0x21be7b) => {
        try {
          if (_0x21be7b) {
            _0x21be7b = JSON.parse(_0x21be7b);
            if (_0x21be7b.code) {
              zdenglu = _0x21be7b.code;
            } else _0x14065e = true;
          } else _0x14065e = true;
        } catch (_0x471edb) {
          $.logErr(_0x471edb, _0x4226bc);
        } finally {
          _0x44b8ed(_0x21be7b);
        }
      });
    });
  }
  function _0x59875e() {
    return new Promise(_0x515bca => {
      let _0x217b21 = "https://nebula.kuaishou.com/rest/n/nebula/sign/sign?__NS_sig3=" + _0x20075b + "&sigCatVer=1&source=popup";
      const _0x117502 = {
        "url": _0x217b21,
        "headers": _0x256258(_0x217b21)
      };
      $.get(_0x117502, async (_0x29e162, _0x4a531c, _0x12266a) => {
        try {
          if (_0x12266a) {
            _0x12266a = JSON.parse(_0x12266a);
            if (_0x12266a.result) {
              if (_0x12266a.result == 1) $.log("账号[" + _0x5df32d + "]" + _0x12266a.data.nebulaSignInPopup.title);else {
                if (_0x12266a.result == 10901) $.log("账号[" + _0x5df32d + "]" + _0x12266a.error_msg);else {
                  $.log("账号[" + _0x5df32d + "]签到失败！");
                }
              }
            } else $.log("账号[" + _0x5df32d + "]参数错误请自查！");
          } else $.log("账号[" + _0x5df32d + "]参数错误请自查！");
        } catch (_0x34036f) {
          $.logErr(_0x34036f, _0x4a531c);
        } finally {
          _0x515bca(_0x12266a);
        }
      });
    });
  }
  function _0x523042() {
    return new Promise(_0x32262a => {
      let _0x408ac4 = "https://nebula.kuaishou.com/rest/n/nebula/box/explore?__NS_sig3=" + _0x3eeb6b + "&sigCatVer=1&isOpen=true&isReadyOfAdPlay=true";
      const _0x6b7214 = {
        "url": _0x408ac4,
        "headers": _0x256258(_0x408ac4)
      };
      $.get(_0x6b7214, async (_0x11fe71, _0x455867, _0x202a4f) => {
        try {
          if (_0x202a4f) {
            _0x202a4f = JSON.parse(_0x202a4f);
            if (_0x202a4f.data) {
              if (_0x202a4f.data.commonAwardPopup !== null) {
                isOpenBox = true;
                durtime = _0x202a4f.data.treasureBoxOpenTimestamp - $.timestamp() + 5 * 1000;
                remainbx = _0x202a4f.data.remainingCount;
                $.log("账号[" + _0x5df32d + "]开宝箱获得: " + _0x202a4f.data.commonAwardPopup.awardAmount + "金币");
                $.log("账号[" + _0x5df32d + "]下次开宝箱时间为：" + $.time("yyyy-MM-dd HH:mm:ss", _0x202a4f.data.treasureBoxOpenTimestamp));
                $.log("账号[" + _0x5df32d + "]今天还有未开宝箱：" + _0x202a4f.data.remainingCount + "个");
              } else $.log("账号[" + _0x5df32d + "]开宝箱失败，下次开宝箱时间为:" + $.time("yyyy-MM-dd HH:mm:ss", _0x202a4f.data.treasureBoxOpenTimestamp) + "，请稍后再试！"), remainbx = 0;
            } else $.log("账号[" + _0x5df32d + "]参数错误请自查！"), remainbx = 0;
          } else {
            $.log("账号[" + _0x5df32d + "]参数错误请自查！");
            remainbx = 0;
          }
        } catch (_0x17ee6b) {
          $.logErr(_0x17ee6b, _0x455867);
        } finally {
          _0x32262a(_0x202a4f);
        }
      });
    });
  }
}
function Env(_0xc71b6d, _0x265f7d) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class _0x139042 {
    constructor(_0x58aea2) {
      this.env = _0x58aea2;
    }
    ["send"](_0x5a1858, _0x394d08 = "GET") {
      _0x5a1858 = "string" == typeof _0x5a1858 ? {
        "url": _0x5a1858
      } : _0x5a1858;
      let _0x3c578b = this.get;
      return "POST" === _0x394d08 && (_0x3c578b = this.post), new Promise((_0xdc5682, _0x167984) => {
        _0x3c578b.call(this, _0x5a1858, (_0x2f806d, _0x2c59c1, _0x669aad) => {
          _0x2f806d ? _0x167984(_0x2f806d) : _0xdc5682(_0x2c59c1);
        });
      });
    }
    ["get"](_0x52e2f0) {
      return this.send.call(this.env, _0x52e2f0);
    }
    ["post"](_0x568a05) {
      return this.send.call(this.env, _0x568a05, "POST");
    }
  }
  return new class {
    constructor(_0x270537, _0x11ca82) {
      this.name = _0x270537;
      this.http = new _0x139042(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, _0x11ca82);
      this.log("", "🔔" + this.name + ", 开始!");
    }
    ["isNode"]() {
      return "undefined" != typeof module && !!module.exports;
    }
    ["isQuanX"]() {
      return "undefined" != typeof $task;
    }
    ["isSurge"]() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    ["isLoon"]() {
      return "undefined" != typeof $loon;
    }
    ["toObj"](_0x277962, _0x1ace43 = null) {
      try {
        return JSON.parse(_0x277962);
      } catch {
        return _0x1ace43;
      }
    }
    ["toStr"](_0xcfc998, _0x194d7d = null) {
      try {
        return JSON.stringify(_0xcfc998);
      } catch {
        return _0x194d7d;
      }
    }
    ["getjson"](_0x292b5c, _0x2f11f3) {
      let _0x4648dc = _0x2f11f3;
      const _0x328ccb = this.getdata(_0x292b5c);
      if (_0x328ccb) try {
        _0x4648dc = JSON.parse(this.getdata(_0x292b5c));
      } catch {}
      return _0x4648dc;
    }
    ["setjson"](_0xce43ab, _0x403450) {
      try {
        return this.setdata(JSON.stringify(_0xce43ab), _0x403450);
      } catch {
        return !1;
      }
    }
    ["getScript"](_0x213cda) {
      return new Promise(_0x83419 => {
        this.get({
          "url": _0x213cda
        }, (_0x35c044, _0x1e178d, _0x2f5269) => _0x83419(_0x2f5269));
      });
    }
    ["runScript"](_0x294094, _0xd2a5f1) {
      return new Promise(_0x3c998e => {
        let _0x2c22c9 = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        _0x2c22c9 = _0x2c22c9 ? _0x2c22c9.replace(/\n/g, "").trim() : _0x2c22c9;
        let _0x570f91 = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        _0x570f91 = _0x570f91 ? 1 * _0x570f91 : 20;
        _0x570f91 = _0xd2a5f1 && _0xd2a5f1.timeout ? _0xd2a5f1.timeout : _0x570f91;
        const [_0xc8024, _0x3a261d] = _0x2c22c9.split("@"),
          _0x4915ed = {
            "url": "http://" + _0x3a261d + "/v1/scripting/evaluate",
            "body": {
              "script_text": _0x294094,
              "mock_type": "cron",
              "timeout": _0x570f91
            },
            "headers": {
              "X-Key": _0xc8024,
              "Accept": "*/*"
            }
          };
        this.post(_0x4915ed, (_0x33c576, _0x31b15b, _0x586f08) => _0x3c998e(_0x586f08));
      }).catch(_0x4e1f6d => this.logErr(_0x4e1f6d));
    }
    ["loaddata"]() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x492385 = this.path.resolve(this.dataFile),
          _0x211f29 = this.path.resolve(process.cwd(), this.dataFile),
          _0x44f104 = this.fs.existsSync(_0x492385),
          _0x4e13dd = !_0x44f104 && this.fs.existsSync(_0x211f29);
        if (!_0x44f104 && !_0x4e13dd) return {};
        {
          const _0x5003ff = _0x44f104 ? _0x492385 : _0x211f29;
          try {
            return JSON.parse(this.fs.readFileSync(_0x5003ff));
          } catch (_0x529835) {
            return {};
          }
        }
      }
    }
    ["writedata"]() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const _0x3ea5e3 = this.path.resolve(this.dataFile),
          _0x344dd1 = this.path.resolve(process.cwd(), this.dataFile),
          _0x6d1cee = this.fs.existsSync(_0x3ea5e3),
          _0x461907 = !_0x6d1cee && this.fs.existsSync(_0x344dd1),
          _0x384745 = JSON.stringify(this.data);
        _0x6d1cee ? this.fs.writeFileSync(_0x3ea5e3, _0x384745) : _0x461907 ? this.fs.writeFileSync(_0x344dd1, _0x384745) : this.fs.writeFileSync(_0x3ea5e3, _0x384745);
      }
    }
    ["lodash_get"](_0x121df6, _0x2f601b, _0x25166f) {
      const _0x2b2a61 = _0x2f601b.replace(/\[(\d+)\]/g, ".$1").split(".");
      let _0x12935e = _0x121df6;
      for (const _0x3fb0f8 of _0x2b2a61) if (_0x12935e = Object(_0x12935e)[_0x3fb0f8], void 0 === _0x12935e) return _0x25166f;
      return _0x12935e;
    }
    ["lodash_set"](_0x18615e, _0xe6bfff, _0x29409f) {
      return Object(_0x18615e) !== _0x18615e ? _0x18615e : (Array.isArray(_0xe6bfff) || (_0xe6bfff = _0xe6bfff.toString().match(/[^.[\]]+/g) || []), _0xe6bfff.slice(0, -1).reduce((_0x39c326, _0xa8b3c4, _0x15b9f9) => Object(_0x39c326[_0xa8b3c4]) === _0x39c326[_0xa8b3c4] ? _0x39c326[_0xa8b3c4] : _0x39c326[_0xa8b3c4] = Math.abs(_0xe6bfff[_0x15b9f9 + 1]) >> 0 == +_0xe6bfff[_0x15b9f9 + 1] ? [] : {}, _0x18615e)[_0xe6bfff[_0xe6bfff.length - 1]] = _0x29409f, _0x18615e);
    }
    ["getdata"](_0x460b04) {
      let _0x5bd920 = this.getval(_0x460b04);
      if (/^@/.test(_0x460b04)) {
        const [, _0x2ddc3f, _0x48c7b8] = /^@(.*?)\.(.*?)$/.exec(_0x460b04),
          _0x40002a = _0x2ddc3f ? this.getval(_0x2ddc3f) : "";
        if (_0x40002a) try {
          const _0x4e088c = JSON.parse(_0x40002a);
          _0x5bd920 = _0x4e088c ? this.lodash_get(_0x4e088c, _0x48c7b8, "") : _0x5bd920;
        } catch (_0x5dad66) {
          _0x5bd920 = "";
        }
      }
      return _0x5bd920;
    }
    ["setdata"](_0x22e191, _0x219d2d) {
      let _0x3e7367 = false;
      if (/^@/.test(_0x219d2d)) {
        const [, _0x2602c2, _0x1ece6c] = /^@(.*?)\.(.*?)$/.exec(_0x219d2d),
          _0x377b2b = this.getval(_0x2602c2),
          _0x51e3c0 = _0x2602c2 ? "null" === _0x377b2b ? null : _0x377b2b || "{}" : "{}";
        try {
          const _0x2ddc6a = JSON.parse(_0x51e3c0);
          this.lodash_set(_0x2ddc6a, _0x1ece6c, _0x22e191);
          _0x3e7367 = this.setval(JSON.stringify(_0x2ddc6a), _0x2602c2);
        } catch (_0x2e268a) {
          const _0xbef599 = {};
          this.lodash_set(_0xbef599, _0x1ece6c, _0x22e191);
          _0x3e7367 = this.setval(JSON.stringify(_0xbef599), _0x2602c2);
        }
      } else _0x3e7367 = this.setval(_0x22e191, _0x219d2d);
      return _0x3e7367;
    }
    ["getval"](_0x141c1a) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(_0x141c1a) : this.isQuanX() ? $prefs.valueForKey(_0x141c1a) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x141c1a]) : this.data && this.data[_0x141c1a] || null;
    }
    ["setval"](_0x9ea92c, _0x21c6be) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(_0x9ea92c, _0x21c6be) : this.isQuanX() ? $prefs.setValueForKey(_0x9ea92c, _0x21c6be) : this.isNode() ? (this.data = this.loaddata(), this.data[_0x21c6be] = _0x9ea92c, this.writedata(), !0) : this.data && this.data[_0x21c6be] || null;
    }
    ["initGotEnv"](_0x6afc8) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      _0x6afc8 && (_0x6afc8.headers = _0x6afc8.headers ? _0x6afc8.headers : {}, void 0 === _0x6afc8.headers.Cookie && void 0 === _0x6afc8.cookieJar && (_0x6afc8.cookieJar = this.ckjar));
    }
    ["get"](_0x33cd45, _0x33c030 = () => {}) {
      _0x33cd45.headers && (delete _0x33cd45.headers["Content-Type"], delete _0x33cd45.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (_0x33cd45.headers = _0x33cd45.headers || {}, Object.assign(_0x33cd45.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(_0x33cd45, (_0x531518, _0x17d1ea, _0x5045f8) => {
        !_0x531518 && _0x17d1ea && (_0x17d1ea.body = _0x5045f8, _0x17d1ea.statusCode = _0x17d1ea.status);
        _0x33c030(_0x531518, _0x17d1ea, _0x5045f8);
      })) : this.isQuanX() ? (this.isNeedRewrite && (_0x33cd45.opts = _0x33cd45.opts || {}, Object.assign(_0x33cd45.opts, {
        "hints": !1
      })), $task.fetch(_0x33cd45).then(_0x34e8af => {
        const {
          statusCode: _0x127260,
          statusCode: _0x16ea60,
          headers: _0x306a8a,
          body: _0x1e02e1
        } = _0x34e8af;
        _0x33c030(null, {
          "status": _0x127260,
          "statusCode": _0x16ea60,
          "headers": _0x306a8a,
          "body": _0x1e02e1
        }, _0x1e02e1);
      }, _0x4504dc => _0x33c030(_0x4504dc))) : this.isNode() && (this.initGotEnv(_0x33cd45), this.got(_0x33cd45).on("redirect", (_0x36576c, _0x173419) => {
        try {
          if (_0x36576c.headers["set-cookie"]) {
            const _0x2bc6ce = _0x36576c.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            _0x2bc6ce && this.ckjar.setCookieSync(_0x2bc6ce, null);
            _0x173419.cookieJar = this.ckjar;
          }
        } catch (_0x4506e9) {
          this.logErr(_0x4506e9);
        }
      }).then(_0x48e5cb => {
        const {
          statusCode: _0x21f9c3,
          statusCode: _0x40cd30,
          headers: _0x274143,
          body: _0x2b65d6
        } = _0x48e5cb;
        _0x33c030(null, {
          "status": _0x21f9c3,
          "statusCode": _0x40cd30,
          "headers": _0x274143,
          "body": _0x2b65d6
        }, _0x2b65d6);
      }, _0x501f7d => {
        const {
          message: _0x380323,
          response: _0x10b419
        } = _0x501f7d;
        _0x33c030(_0x380323, _0x10b419, _0x10b419 && _0x10b419.body);
      }));
    }
    ["post"](_0x24b369, _0x2c0ba3 = () => {}) {
      if (_0x24b369.body && _0x24b369.headers && !_0x24b369.headers["Content-Type"] && (_0x24b369.headers["Content-Type"] = "application/x-www-form-urlencoded"), _0x24b369.headers && delete _0x24b369.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (_0x24b369.headers = _0x24b369.headers || {}, Object.assign(_0x24b369.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(_0x24b369, (_0x2a68a6, _0xd76ee7, _0x4c4308) => {
        !_0x2a68a6 && _0xd76ee7 && (_0xd76ee7.body = _0x4c4308, _0xd76ee7.statusCode = _0xd76ee7.status);
        _0x2c0ba3(_0x2a68a6, _0xd76ee7, _0x4c4308);
      });else {
        if (this.isQuanX()) _0x24b369.method = "POST", this.isNeedRewrite && (_0x24b369.opts = _0x24b369.opts || {}, Object.assign(_0x24b369.opts, {
          "hints": !1
        })), $task.fetch(_0x24b369).then(_0x321711 => {
          const {
            statusCode: _0x5f0b23,
            statusCode: _0x33d5e5,
            headers: _0x5c3a54,
            body: _0x1ccbe8
          } = _0x321711;
          _0x2c0ba3(null, {
            "status": _0x5f0b23,
            "statusCode": _0x33d5e5,
            "headers": _0x5c3a54,
            "body": _0x1ccbe8
          }, _0x1ccbe8);
        }, _0x4530f8 => _0x2c0ba3(_0x4530f8));else {
          if (this.isNode()) {
            this.initGotEnv(_0x24b369);
            const {
              url: _0x9e7253,
              ..._0x2a9049
            } = _0x24b369;
            this.got.post(_0x9e7253, _0x2a9049).then(_0x4feeb6 => {
              const {
                statusCode: _0x307de7,
                statusCode: _0x501e7e,
                headers: _0x1309b4,
                body: _0x3998e3
              } = _0x4feeb6;
              _0x2c0ba3(null, {
                "status": _0x307de7,
                "statusCode": _0x501e7e,
                "headers": _0x1309b4,
                "body": _0x3998e3
              }, _0x3998e3);
            }, _0x507236 => {
              const {
                message: _0x2a994b,
                response: _0x5e96cc
              } = _0x507236;
              _0x2c0ba3(_0x2a994b, _0x5e96cc, _0x5e96cc && _0x5e96cc.body);
            });
          }
        }
      }
    }
    ["time"](_0x3b579e, _0x369111 = null) {
      const _0x47275c = _0x369111 ? new Date(_0x369111) : new Date();
      let _0x4c82de = {
        "M+": _0x47275c.getMonth() + 1,
        "d+": _0x47275c.getDate(),
        "H+": _0x47275c.getHours(),
        "m+": _0x47275c.getMinutes(),
        "s+": _0x47275c.getSeconds(),
        "q+": Math.floor((_0x47275c.getMonth() + 3) / 3),
        "S": _0x47275c.getMilliseconds()
      };
      /(y+)/.test(_0x3b579e) && (_0x3b579e = _0x3b579e.replace(RegExp.$1, (_0x47275c.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x5ad6cb in _0x4c82de) new RegExp("(" + _0x5ad6cb + ")").test(_0x3b579e) && (_0x3b579e = _0x3b579e.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x4c82de[_0x5ad6cb] : ("00" + _0x4c82de[_0x5ad6cb]).substr(("" + _0x4c82de[_0x5ad6cb]).length)));
      return _0x3b579e;
    }
    ["msg"](_0x1930ec = _0xc71b6d, _0x3d6dc4 = "", _0x325e16 = "", _0x139f3e) {
      const _0x36cf2f = _0x5c56e7 => {
        if (!_0x5c56e7) return _0x5c56e7;
        if ("string" == typeof _0x5c56e7) return this.isLoon() ? _0x5c56e7 : this.isQuanX() ? {
          "open-url": _0x5c56e7
        } : this.isSurge() ? {
          "url": _0x5c56e7
        } : void 0;
        if ("object" == typeof _0x5c56e7) {
          if (this.isLoon()) {
            let _0x418afb = _0x5c56e7.openUrl || _0x5c56e7.url || _0x5c56e7["open-url"],
              _0xf08608 = _0x5c56e7.mediaUrl || _0x5c56e7["media-url"];
            return {
              "openUrl": _0x418afb,
              "mediaUrl": _0xf08608
            };
          }
          if (this.isQuanX()) {
            let _0xce34f5 = _0x5c56e7["open-url"] || _0x5c56e7.url || _0x5c56e7.openUrl,
              _0x3e5a16 = _0x5c56e7["media-url"] || _0x5c56e7.mediaUrl;
            return {
              "open-url": _0xce34f5,
              "media-url": _0x3e5a16
            };
          }
          if (this.isSurge()) {
            let _0x33fc10 = _0x5c56e7.url || _0x5c56e7.openUrl || _0x5c56e7["open-url"];
            return {
              "url": _0x33fc10
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(_0x1930ec, _0x3d6dc4, _0x325e16, _0x36cf2f(_0x139f3e)) : this.isQuanX() && $notify(_0x1930ec, _0x3d6dc4, _0x325e16, _0x36cf2f(_0x139f3e))), !this.isMuteLog) {
        let _0x4e5172 = ["", "==============📣系统通知📣=============="];
        _0x4e5172.push(_0x1930ec);
        _0x3d6dc4 && _0x4e5172.push(_0x3d6dc4);
        _0x325e16 && _0x4e5172.push(_0x325e16);
        console.log(_0x4e5172.join("\n"));
        this.logs = this.logs.concat(_0x4e5172);
      }
    }
    ["log"](..._0x4e6f04) {
      _0x4e6f04.length > 0 && (this.logs = [...this.logs, ..._0x4e6f04]);
      console.log(_0x4e6f04.join(this.logSeparator));
    }
    ["logErr"](_0x20d486, _0x2b60d6) {
      const _0x502546 = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      _0x502546 ? this.log("", "❗️" + this.name + ", 错误!", _0x20d486.stack) : this.log("", "❗️" + this.name + ", 错误!", _0x20d486);
    }
    ["wait"](_0x58d159) {
      return new Promise(_0x3acd19 => setTimeout(_0x3acd19, _0x58d159));
    }
    ["timestamps"]() {
      return Date.parse(new Date()) / 1000;
    }
    ["timestamp"]() {
      return new Date().valueOf();
    }
    ["done"](_0x16e38c = {}) {
      const _0x5ed745 = new Date().getTime(),
        _0x29fec7 = (_0x5ed745 - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + _0x29fec7 + " 秒");
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(_0x16e38c);
    }
  }(_0xc71b6d, _0x265f7d);
}