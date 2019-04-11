// pages/index/station.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let station_name_list = [],
      station_name_array = station_names.split("@"),
      letter = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
    for (let i = 0; i < 26; i++) {
      station_name_list[i] = [];
    }
    for (let i = 1; i < station_name_array.length; i++) {
      let current_station_name = station_name_array[i];
      let first_letter = current_station_name.charAt(0);
      for (let j in letter) {
        if (first_letter === letter[j]) {
          station_name_list[j].push(current_station_name.split("|"))
        }
      }
    }
    // TODO 数据展示***************************************************
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