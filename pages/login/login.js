const util = require("../../utils/util.js");
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

    // console.log(wx.getStorageInfo)
    wx.request({
      url: 'https://kyfw.12306.cn/passport/captcha/captcha-image64',
      data: {
        login_site: 'E',
        module: 'login',
        rand: 'sjrand'
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // 设置图片
        _this.setData({
          base64image: `data:image/jpg;base64,${res.data.image}`
        });

        // 添加Cookie
        util.setCookies(res.header['Set-Cookie']);
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindLogin: function() {
    let username = this.data.username,
      password = this.data.password,
      answer = util.captchaSequenceNumberToCoordinate(this.data.answer).join(',');
    console.warn(username, password, answer);
    wx.request({
      url: `https://kyfw.12306.cn/passport/captcha/captcha-check`,
      data: {
        answer: answer,
        login_site: 'E',
        rand: 'sjrand'
      },
      header: {
        cookie: util.getCookies('/passport').join('; ')
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // 添加Cookie
        // util.setCookies(data.header['Set-Cookie']);
        console.log(util.getCookies('/passport').join('; '));
        if (res.data.result_code === '4') {
          wx.request({
            url: 'https://kyfw.12306.cn/passport/web/login',
            data: {
              username: username,
              password: password,
              appid: 'otn',
              answer: answer
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              cookie: util.getCookies('/passport').join('; ')
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {
              console.log(res);
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
      url: 'https://kyfw.12306.cn/passport/web/auth/uamtk-static',
      data: {
        appid: 'otn'
      },
      header: {
        cookie: util.getCookies('/').join(';')
      },
      method: 'POST',
      success: res => {
        console.log(res)
        getApp().globalData.conf = res.data;
        util.setCookies(res.header['Set-Cookie']); // 添加Cookie
        console.warn('uamtk-static', res)
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