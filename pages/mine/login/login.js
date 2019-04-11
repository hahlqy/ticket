// import * as util from '../../../common/util.js';
const util = require('../../../common/util.js')
//获取应用实例
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '17603697574', //17603697574
    password: 'Lifetime1124', //Lifetime1124
    answer: '', //
    base64image: ''
  },
  // 获取验证码
  bindGetCaptcha: function() {
    let _this = this;
    util.request({
      url: 'https://kyfw.12306.cn/passport/captcha/captcha-image64',
      data: {
        login_site: 'E',
        module: 'login',
        rand: 'sjrand'
      },
      success: function(data) {
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
      _username = this.data.username,
      _password = this.data.password,
      _answer = util.captchaSequenceNumberToCoordinate(this.data.answer).join(',');
    util.request({
      url: `https://kyfw.12306.cn/passport/captcha/captcha-check`,
      data: {
        answer: _answer,
        login_site: 'E',
        rand: 'sjrand'
      },
      success: function(data) {
        if (data.result_code === '4') {
          util.request({
            url: 'https://kyfw.12306.cn/passport/web/login',
            data: {
              username: _username,
              password: _password,
              answer: _answer,
              appid: 'otn'
            },
            method: 'POST',
            success: function(data) {
              let _icon = 'none';
              if (data.result_code === 0) {
                _icon = 'success';
              } else /*if (data.result_code === 1)*/ {
                _this.setData({
                  password: '',
                  answer: ''
                });
              }
              wx.showToast({
                title: data.result_message,
                icon: _icon,
                mask: true
              });
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/mine/mine',
                })
              }, 1400);
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //写入Cookie
    util.setCookie(`RAIL_EXPIRATION=1555108274885; path=/,RAIL_DEVICEID=W16fXdayl5tCibyKZMFCO278Cc_CXNYOsjsfAA92J-yEzft7frkxUNvO3i_0_DC47oPodUzgW-aDeoYOMy93Rctk0px8zLotA6tmmpGbJSHtheI9UH-fHweIqNNPrYQ6mjx52OLIea2WidZijPaO_43iV15zKsBC; path=/`);
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
    //   }, header:{
    //     // 'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0'
    //   },
    //   success: data => {
    //     let obj = JSON.parse(data.substring(data.indexOf('\x7b'), data.indexOf('\x7d') + 1));
    //     util.setCookie(`RAIL_EXPIRATION=${obj.exp}; path=/,RAIL_DEVICEID=${obj.dfp}; path=/`);
    //   }
    // });

  },
  onShow: function() {
    // 获取验证码
    this.bindGetCaptcha();
  },
  inputBindData: util.inputBindData
})