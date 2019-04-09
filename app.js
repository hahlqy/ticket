App({
  // onLaunch	Function	生命周期回调—监听小程序初始化	小程序初始化完成时（全局只触发一次）
  onLaunch: async function(options) {

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
    captcha_image64: 'https://kyfw.12306.cn/passport/captcha/captcha-image64'
  }

})