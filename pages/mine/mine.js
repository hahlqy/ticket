// pages/mine/mine.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    util.request({
      url: 'https://kyfw.12306.cn/passport/web/auth/uamtk',
      method: 'POST',
      data: {
        appid: 'otn'
      },
      success: data => {
        // debugger
        if (data.result_code === 0) {
          util.request({
            url: 'https://kyfw.12306.cn/otn/uamauthclient',
            method: 'POST',
            data: {
              tk: data.newapptk
            },
            success: data => {
              if (data.result_code === 0) _this.setData({
                isLogin: true,
                username: data.username
              });
            }
          });
        } else {
          _this.data.isLogin = false;
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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