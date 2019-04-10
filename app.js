const util = require('/utils/util.js');
App({
  onLaunch: async function(options) {
    //index页加载
    util.request({
      url: 'https://kyfw.12306.cn/otn/HttpZF/GetJS',
      success: data => {}
    });
    util.request({
      url: 'https://www.12306.cn/index/script/core/common/qss_v10026.js',
      success: data => {}
    });
    util.request({
      url: 'https://www.12306.cn/index/script/core/common/station_name_v10027.js',
      success: data => {}
    });
    util.request({
      url: 'https://www.12306.cn/index/script/dist/index/main_v10001',
      success: data => {}
    });
    //
    // util.request({
    //   url: 'https://www.12306.cn/index/fonts/iconfont.ttf?t=' + new Date().getTime(),
    //   success: data => {
    //     console.error(data)
    //   }
    // });
    util.request({
      url: 'https://www.12306.cn/index/otn/login/conf',
      method: 'POST',
      success: data => {
        // console.error(data)
      }
    });
    util.request({
      url: 'https://kyfw.12306.cn/passport/web/auth/uamtk-static',
      data: {
        appid: 'otn'
      },
      method: 'POST',
      success: data => {
        // console.warn('uamtk-static', data)
      }
    });
    // util.request({
    //   url: 'https://tj.12306.cn/m/v1/website/index?ltime=3701&stime=3402&login=N&btime=298&bstatus=200&px=864*1536&apx=824*1536&callback=jQuery110207530806736902307_1554865717446&_=' + new Date().getTime(),
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
    console.log(msg)
  },
  // onPageNotFound	Function	页面不存在监听函数	小程序要打开的页面不存在时触发，会带上页面信息回调该函数
  globalData: {
    startTime: new Date().getTime(), //"window.onload外开始时间:",window.startTime
    pageStart: 0
  }

})