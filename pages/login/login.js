// import * as util from '../../utils/util.js';
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp();

// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '', //17603697574
    password: '', //Lifetime1124
    answer: '', //
    base64image: ""
  },
  // 获取验证码
  bindGetCaptcha: function() {
    let _this = this;
    util.request({
      _url: 'https://kyfw.12306.cn/passport/captcha/captcha-image64',
      _data: {
        login_site: 'E',
        module: 'login',
        rand: 'sjrand'
      },
      _success: function(data) {
        // 设置图片
        _this.setData({
          base64image: `data:image/jpg;base64,${data.image}`,
          answer: ''
        });
      }
    })
  },
  bindLogin: function() {
    let _this = this,
      username = this.data.username,
      password = this.data.password,
      answer = util.captchaSequenceNumberToCoordinate(this.data.answer).join(',');
    // console.warn(username, password, answer);
    util.request({
      _url: `https://kyfw.12306.cn/passport/captcha/captcha-check`,
      _data: {
        answer: answer,
        login_site: 'E',
        rand: 'sjrand'
      },
      _success: function(data) {
        if (data.result_code === '4') {
          // console.log(util.getCookies('/passport'));
          util.request({
            _url: 'https://kyfw.12306.cn/passport/web/login',
            _data: {
              username: username,
              password: password,
              appid: 'otn',
              answer: answer
            },
            _method: 'POST',
            _success: function(data) {
              if (data.result_code === 0) {
                wx.showToast({
                  title: data.result_message,
                  icon: 'success',
                });

                util.request({
                  _url: 'https://kyfw.12306.cn/passport/web/auth/uamtk',
                  _data: {
                    appid: 'otn'
                  },
                  _method: 'POST',
                  _success: data => {
                    console.error(data)

                  }
                });

              } else if (data.result_code === 1) {
                _this.setData({
                  password: '',
                  answer: ''
                });
                wx.showToast({
                  title: data.result_message,
                  icon: 'none',
                });
              }
            }
          })
        } else {
          _this.bindGetCaptcha();
          _this.setData({
            answer: ''
          });
          wx.showToast({
            title: data.result_message,
            icon: 'none'
          });
        }

      },
      fail: function(res) {}
    })
  },
  inputBindData: util.inputBindData,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // 获取验证码
    this.bindGetCaptcha();
    //写入Cookie
    util.setCookie(`RAIL_EXPIRATION=1555108274885; path=/,RAIL_DEVICEID=W16fXdayl5tCibyKZMFCO278Cc_CXNYOsjsfAA92J-yEzft7frkxUNvO3i_0_DC47oPodUzgW-aDeoYOMy93Rctk0px8zLotA6tmmpGbJSHtheI9UH-fHweIqNNPrYQ6mjx52OLIea2WidZijPaO_43iV15zKsBC; path=/`);
    // util.request({
    //   _url: 'https://kyfw.12306.cn/otn/HttpZF/logdevice',
    //   _data: {
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
    //   }, _header:{
    //     // 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0'
    //   },
    //   _success: data => {
    //     let obj = JSON.parse(data.substring(data.indexOf('\x7b'), data.indexOf('\x7d') + 1));
    //     util.setCookie(`RAIL_EXPIRATION=${obj.exp}; path=/,RAIL_DEVICEID=${obj.dfp}; path=/`);
    //   }
    // });

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    util.request({
      _url: 'https://kyfw.12306.cn/passport/web/auth/uamtk-static',
      _data: {
        appid: 'otn'
      },
      _method: 'POST',
      _success: data => {
        console.warn('uamtk-static', data)
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})