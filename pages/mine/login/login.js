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
      }
    }).then(res => {
      _this.setData({
        base64image: `data:image/jpg;base64,${res.image}`,
        answer: ''
      });
    })
  },
  bindLogin: function() {
    let _this = this,
      _username = this.data.username,
      _password = this.data.password,
      _answer = util.captchaSequenceNumberToCoordinate(this.data.answer)

    util.request({
      url: `https://kyfw.12306.cn/passport/captcha/captcha-check`,
      data: {
        answer: _answer,
        login_site: 'E',
        rand: 'sjrand'
      }
    }).then(res => {
      if (res.result_code === '4') {
        util.request({
          url: 'https://kyfw.12306.cn/passport/web/login',
          data: {
            username: _username,
            password: _password,
            answer: _answer,
            appid: 'otn'
          },
          method: 'POST'
        }).then(res => {
          let _icon = 'none';
          if (res.result_code === 0) {
            _icon = 'success';
          } else /*if (res.result_code === 1)*/ {
            _this.setData({
              password: '',
              answer: ''
            });
          }
          wx.showToast({
            title: res.result_message,
            icon: _icon,
            mask: true
          });
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/mine/mine',
            })
          }, 1400);
        })
      } else {
        _this.bindGetCaptcha();
        _this.setData({
          answer: ''
        });
        wx.showToast({
          title: res.result_message,
          icon: 'none'
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  onShow: function() {
    // 获取验证码
    this.bindGetCaptcha();
  },
  inputTyping: util.inputTyping
})