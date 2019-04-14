const util = require('./common/util.js'),
  constant = require('./common/constant.js');

App({
  onLaunch: async function(options) {
    // test
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
    // 不知道用在什么地方的 车站名 ： 时间
    util.request({
      url: 'https://www.12306.cn/index/script/core/common/qss_v10026.js'
    });
    //主要js
    util.request({
      url: 'https://www.12306.cn/index/script/dist/index/main_v10001.js'
    });
    // iconfont 
    /*util.request({
       url: 'https://www.12306.cn/index/fonts/iconfont.ttf'
     });*/

    //设置
    util.request({
      url: 'https://www.12306.cn/index/otn/login/conf',
      method: 'POST'
    }).then(console.log);

    // setInterval(() => {
    util.request({
      url: 'https://kyfw.12306.cn/passport/web/auth/uamtk-static',
      data: {
        a: {
          b: '1',
          c: '2'
        },
        appid: 'otn'
      },
      method: 'POST'
    }).then(console.warn);
    // }, 1000);

    // util.request({
    //   url: 'https://tj.12306.cn/m/v1/website/index?ltime=3701&stime=3402&login=N&btime=298&bstatus=200&px=864*1536&apx=824*1536',
    //   success: data => {
    //     console.error(data)
    //   }
    // });

  },
  // onShow	Function	生命周期回调—监听小程序显示	小程序启动，或从后台进入前台显示时
  onShow: async function(options) {

  },
  // onHide	Function	生命周期回调—监听小程序隐藏	小程序从前台进入后台时
  onHide: function() {
    // Do something when hide.
  },
  // onError	Function	错误监听函数	小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息
  onError: function(msg) {
    //TODO 顶部警告
    console.log(msg)
  },
  // onPageNotFound	Function	页面不存在监听函数	小程序要打开的页面不存在时触发，会带上页面信息回调该函数
  globalData: {
    LETTERS: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    WEEKS: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    name: ''
  }

})