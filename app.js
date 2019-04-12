const util = require('./common/util.js');
App({
  onLaunch: async function(options) {
    util.setCookie([new util.Cookie({
      path: '/',
      name: 'RAIL_EXPIRATION',
      value: "1555348857961",
      domain: '12306.cn'
    }), new util.Cookie({
      path: '/',
      name: 'RAIL_DEVICEID',
      value: "qojO8LXYUu1YHTg17NWGoAb2hKexb2bzZEsZcdlsNWEL8xuRpBJbRg7-Q5FlYw2_lVoQ4uNpPARQo_IdSVOYr5IzA2Xougbg0sb3oMMOJqfPS6_RfoWjWlYzHytRjL7FYz6B_A4KPs-GclNS6F0C-eGATK1Ic8Xp",
      domain: '12306.cn'
    })]);

    //index页加载
    util.request({
      url: 'https://kyfw.12306.cn/otn/HttpZF/GetJS'
    });
    util.request({
      url: 'https://www.12306.cn/index/script/core/common/qss_v10026.js'
    });
    util.request({
      url: 'https://www.12306.cn/index/script/core/common/station_name_v10027.js'
    });
    util.request({
      url: 'https://www.12306.cn/index/script/dist/index/main_v10001.js'
    });
    //
    // util.request({
    //   url: 'https://www.12306.cn/index/fonts/iconfont.ttf?t=' + new Date().getTime()
    // });
    util.request({
      url: 'https://www.12306.cn/index/otn/login/conf',
      method: 'POST'
    });
    util.request({
      url: 'https://kyfw.12306.cn/passport/web/auth/uamtk-static',
      data: {
        appid: 'otn'
      },
      method: 'POST'
    });
    // util.request({
    //   url: 'https://tj.12306.cn/m/v1/website/index?ltime=3701&stime=3402&login=N&btime=298&bstatus=200&px=864*1536&apx=824*1536&callback=jQuery110207530806736902307_1554865717446&_=' + new Date().getTime(),
    //   success: data => {
    //     console.error(data)
    //   }
    // });

    // util.request({
    //   url: 'https://kyfw.12306.cn/otn/HttpZF/logdevice',
    //   data: {
    //     'algID': 'knqqubQnpP',
    //     'hashCode': '2fuuZMn1MN4wzmop7XvUfx1LLsO9-4m53NoKccpL4V4',
    //     'FMQw': '0',
    //     'q4f3': 'zh-CN',
    //     'VySQ': 'FGHaiYxDwMFE-4OXbWEczuq8d_79Ktr1',
    //     'VPIf': '1',
    //     'custID': '133',
    //     'VEek': 'unspecified',
    //     'dzuS': '32.0 r0*',
    //     'yD16': '0',
    //     'EOQP': 'a93b28a68349a24f13e896433ed0bbf3',
    //     'lEnu': '3232260990',
    //     'jp76': 'b34839808806e7ff02df813671ec99b3',
    //     'hAqN': 'Win32',
    //     'platform': 'WEB',
    //     'ks0Q': 'a103db222cd8296a50268c8f0355b741',
    //     'TeRS': '824x1536',
    //     'tOHY': '24xx864x1536',
    //     'Fvje': 'i1l1s1',
    //     'q5aJ': '-8',
    //     'wNLf': '99115dfb07133750ba677d055874de87',
    //     '0aew': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
    //     'E3gR	': 'f1dcf86ab87c9b505df152849f8ce446',
    //     'timestamp': new Date().getTime()
    //   },
    //   header: {
    //     // 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0'
    //   },
    //   success: data => {
    //     let obj = JSON.parse(data.substring(data.indexOf('\x7b'), data.indexOf('\x7d') + 1));
    //     util.setCookie(`RAIL_EXPIRATION=${obj.exp}; path=/,RAIL_DEVICEID=${obj.dfp}; path=/`);
    //   }
    // });
  },
  // onShow	Function	生命周期回调—监听小程序显示	小程序启动，或从后台进入前台显示时
  onShow: async function(options) {
    let a = [{
      key: 'cookieCode', //UUID
      value: "new" //cookie => RAIL_UUID的值
    }, {
      key: 'cookieCode',
      value: "new"
    }, {
      key: 'cookieCode',
      value: "FGHOT-hDXMF_SXX90WQJSWxcnesn-Lzf"
    }, {
      key: 'userAgent',
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36' //navigator.userAgent.replace(/\&|\+/g, "")
    }, {
      key: "scrHeight",
      value: '864' //window.screen.height.toString()
    }, {
      key: 'scrWidth',
      value: '1536' //window.screen.width.toString()
    }, {
      key: 'scrAvailHeight',
      value: '824' //window.screen.availHeight.toString()
    }, {
      key: 'scrAvailWidth',
      value: '1536' //window.screen.availWidth.toString()
    }, {
      key: 'scrColorDepth',
      value: '24' //window.screen.colorDepth.toString()
    }, {
      key: 'scrDeviceXDPI',
      value: '' //IE?window.screen.deviceXDPI.toString():''
    }, {
      key: 'appCodeName',
      value: 'Mozilla' //navigator.appCodeName.toString()
    }, {
      key: 'appName',
      value: 'Netscape' //navigator.appName.toString()
    }, {
      key: 'javaEnabled',
      value: '0' //navigator.javaEnabled() ? "1" : "0"
    }, {
      key: 'mimeTypes',
      value: 'b34839808806e7ff02df813671ec99b3' //经过一系列计算得到的值
    }, {
      key: 'os',
      value: 'Win32' //navigator.platform.toString()
    }, {
      key: 'appMinorVersion',
      value: '' //IE?navigator.appMinorVersion.toString():''
    }, {
      key: 'browserLanguage',
      value: '' //IE||Opera?navigator.browserLanguage.toString() : this.getLanguage();
    }, {
      key: 'cookieEnabled',
      value: '1' //navigator.cookieEnabled ? "1" : "0"
    }, {
      key: 'cpuClass',
      value: '' //IE?navigator.cpuClass.toString() : ""
    }, {
      key: 'onLine',
      value: 'true' //navigator.onLine.toString()
    }, {
      key: 'systemLanguage',
      value: '' //IE||Opera?navigator.systemLanguage.toString() : ""
    }, {
      key: 'userLanguage',
      value: '' //IE||Opera?navigator.userLanguage.toString() : "";
    }, {
      key: 'timeZone',
      value: '-8' //(new Date).getTimezoneOffset() / 60
    }, {
      key: 'flashVersion',
      value: '32.0 r0*' //
    }, {
      key: 'historyList',
      value: '' //window.history.length
    }, {
      key: 'custID',
      value: '133'
    }, {
      key: 'platform',
      value: 'WEB' // WAP
    }]
  },
  // onHide	Function	生命周期回调—监听小程序隐藏	小程序从前台进入后台时
  onHide: function() {
    // Do something when hide.
  },
  // onError	Function	错误监听函数	小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
  onError: function(msg) {
    console.log(msg)
  },
  // onPageNotFound	Function	页面不存在监听函数	小程序要打开的页面不存在时触发，会带上页面信息回调该函数
  globalData: {
    startTime: new Date().getTime(), //"window.onload外开始时间:",window.startTime
    pageStart: 0
  }

})