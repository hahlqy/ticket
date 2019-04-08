// const regeneratorRuntime = require("./lib/regenerator/runtime-module.js");
const util = require("/utils/util.js");
App({
  // onLaunch	Function	生命周期回调—监听小程序初始化	小程序初始化完成时（全局只触发一次）
  onLaunch: async function(options) {
    // 初始化cookie目录
    const fs = wx.getFileSystemManager();
    await util.makeDirectory(util.Cookie.root);
    // md.then(util.setCookies('_a=4ee207ad4f2a4db59…263eeaa8t8989; Path=/,_b=4ee207ad4f2a4db59…263eeaa8t8989; Path=/otn,_c=4ee207ad4f2a4db59…263eeaa8t8989; Path=/passport'));
  },
  // onShow	Function	生命周期回调—监听小程序显示	小程序启动，或从后台进入前台显示时
  onShow: async function(options) {

    // await util.Cookie.set('22')
    //  await  util.Cookie.get('11')
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

/*
 let readFile = async(_filePath) => {
      return await new Promise(resolve => {
        fs.readFile({
          filePath: _filePath,
          encoding: 'utf8',
          success: res => {
            resolve(res.data);
          }
        });
      })
    };
    let stat = async _path => {
      return await new Promise(resolve => {
        fs.stat({
          path: _path,
          success: res => {
            if (!res.stats.isDirectory()) resolve(_path);
          }
        });
      });
    };
    let readdir = async(_dirPath) => {
      return await new Promise(resolve => {
        fs.readdir({
          dirPath: _dirPath,
          success: res => { // Geted the name of all the files
            // console.log(res.files)
            resolve(res.files.map(_item => `${_dirPath}/${_item}`));
          }
        });
      })
    }
    // let a = await readdir(`${wx.env.USER_DATA_PATH}/cookies`);
    // a = a.concat(await readdir(`${wx.env.USER_DATA_PATH}/cookies/passport`));
    // console.log(a)
    // a.forEach(async _item => {
    //   let b = await stat(_item);
    //   let c = await readFile(b);
    //   console.log(c)
    //   cookies.push(c);
    // });
 */