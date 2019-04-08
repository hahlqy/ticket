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
    username: '17603697574', //17603697574
    password: 'Lifetime1124', //Lifetime1124
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
          base64image: `data:image/jpg;base64,${data.image}`
        });
      }
    })
  },
  bindLogin: function() {
    let username = this.data.username,
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
        console.log(data);
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
            _success: function(res) {
              console.log(res);
              if (res.result_code === 0) {
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            }
          })
        }

      },
      fail: function(res) {}
    })
  },
  inputBindData: util.inputBindData,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    util.request({
      _url: 'https://kyfw.12306.cn/passport/web/auth/uamtk-static',
      _data: {
        appid: 'otn'
      },
      _method: 'POST',
      _success: data => {
        getApp().globalData.conf = data;
        console.warn('uamtk-static', data)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //  获取设置信息


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.bindGetCaptcha();
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