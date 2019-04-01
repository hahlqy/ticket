// pages/order/order.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部订单", "待支付", "已支付", "本人车票"],
    activeIndex: 0, //默认激活索引
    sliderOffset: 0, //滑块偏移量
    sliderWidth: 0 //滑块宽度
  },
  /**
   * tab项切换
   */
  bindTabChange: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /* 设置slider宽度,.weui-navbar__slider宽度位固定 超过三个tab就有点长了
     * 设置滑块默认位置，默认激活索引 * tab项的宽度 即为滑块的偏移量
     */
    var that = this;
    wx.createSelectorQuery().select(".weui-navbar__item").boundingClientRect(function(rect) {
      that.setData({
        sliderWidth: rect.width,
        sliderOffset: that.data.activeIndex * rect.width
      });
    }).exec();
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