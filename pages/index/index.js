// import * as util from '../../utils/util.js';
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp();

const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

Page({
  data: {
    citys: {},
    station_names: [],
    favorite_names: [],

    fromStationText: "北京",
    toStationText: "成都",
    date: new Date(),
    train_date: (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日", //出发时间
    weekDay: weeks[new Date().getDay()], //周几    
    isG: false, //只看高铁
    isStudent: false //学生票
  },
  // 绑定时间转换函数
  bindDateChange(e) {
    let date = e.detail.value.split('-');
    let newDate = date[0] + "-" + date[1] + "-" + date[2];
    this.setData({
      date: newDate,
      train_date: (date[1] * 1) + "月" + date[2] + "日",
      weekDay: weeks[new Date(date[0], (date[1] * 1 - 1), date[2]).getDay()]
    });
  },
  //只查高铁选项
  bindOnlyGChange(e) {
    this.setData({
      isG: !!e.detail.value.length
    });
  },
  // 学生票选项
  bindStudentTicketChange(e) {
    this.setData({
      isStudent: !!e.detail.value.length
    });
  },
  bindQuery() {
    // console.log(util.getCookies('/'))
  },
  changeIcon() {
    const ctx = wx.createCanvasContext('changeIcon');
  },
  // 事件处理函数
  // onLoad	Function	生命周期回调—监听页面加载
  onLoad: function() {
    app.globalData.pageStart = new Date().getTime();

  },
  // onShow	Function	生命周期回调—监听页面显示
})