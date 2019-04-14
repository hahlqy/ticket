//app.js
// App() 函数用来注册一个小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。
// App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。
const util = require("/utils/util.js");
App({
  // onLaunch	Function	生命周期回调—监听小程序初始化	小程序初始化完成时（全局只触发一次）
  onLaunch: function(options) {
    let that = this;
    util.request({
      url: 'https://kyfw.12306.cn/otn/login/conf',
      method: 'POST',
      success: res => {
        console.warn('conf', res)
        this.globalData.conf = res.data;
        util.setCookies(res.header['Set-Cookie']); // 添加Cookie
      }
    });

  },
  // onShow	Function	生命周期回调—监听小程序显示	小程序启动，或从后台进入前台显示时
  onShow: function(options) {
    // Do something when show.
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
    conf: {},
    captcha_image64: 'https://kyfw.12306.cn/passport/captcha/captcha-image64'
  }

})