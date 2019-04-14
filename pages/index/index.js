// import * as util from '../../utils/util.js';
const util = require('../../common/util.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    from_station_text: '出发地',
    to_station_text: '目的地',
    show_date: ((new Date).getMonth() + 1) + "月" + (new Date).getDate() + "日", //出发时间
    weekDay: app.globalData.WEEKS[(new Date).getDay()], //周几    
    isH: false, //只看高铁
    isS: false, //学生票
    visableS: false, //学生票按钮

    train_date: (new Date).format('yyyy-MM-dd'), //出发日期 默认当天
    from_station: '', //出发地代码
    to_station: '', //目的地代码
    purpose_codes: this.isS ? '' : 'ADULT' //学生票 成人票

  },
  // 绑定时间转换函数
  fnDateChange(e) {
    this.setData({
      train_date: e.detail.value,
      show_date: (new Date(e.detail.value).getMonth() + 1) + "月" + new Date(e.detail.value).getDate() + "日",
      weekDay: app.globalData.WEEKS[new Date(e.detail.value).getDay()]
    });
  },
  //只查高铁选项
  fnOnlyHightSpeedRailChange(e) {
    this.setData({
      isH: !!e.detail.value.length
    });
  },
  // 学生票选项
  fnStudentTicketChange(e) {
    this.setData({
      isS: !!e.detail.value.length
    });
  },
  //查询按钮函数
  fnQuery() {
    wx.redirectTo({
      url: './query/query',
    })
  },
  onLoad: function(options) {
    /* 判断车站信息缓存 */
    wx.getStorage({
      key: 'station_names',
      fail: res => { //没有缓存重新获取
        util.request({
          //12306使用jsonp返回值为js代码
          url: 'https://www.12306.cn/index/script/core/common/station_name_v10027.js'
        }).then(res => {
          //保存站地数组
          let station_names = [],
            //@' 截取需要数据
            station_names_str = res.slice(res.indexOf('\x40') + 1, res.lastIndexOf('\x27')),
            //@分割
            station_name_arr = station_names_str.split('\x40');
          for (let _i = 0; _i < 26; _i++) station_names[_i] = [];
          for (let _i = 0; _i < station_name_arr.length; _i++) {
            for (let _j in app.globalData.LETTERS) {
              if (station_name_arr[_i].charAt(0) === app.globalData.LETTERS[_j]) station_names[_j].push(station_name_arr[_i].split("\x7c")); // | 首字母相同保存到字母组
            }
          }
          // 缓存
          wx.setStorage({
            key: 'station_names',
            data: station_names
          });
        });
      },
    });

  },
  onShow: function() {
    let _this = this;
    // 获取选择的站地信息
    wx.getStorage({
      key: 'station_selected',
      success: res => {
        let _from = res.data[0] ? res.data[0] : [],
          _to = res.data[1] ? res.data[1] : [];
        _this.setData({
          from_station: _from[2] || this.data.leftTicketDTO.from_station,
          to_station: _to[2] || this.data.leftTicketDTO.to_station,
          from_station_text: _from[1] || this.data.from_station_text,
          to_station_text: _to[1] || this.data.to_station_text
        });
      }
    });
  },
  //对调图标函数
  changeIcon() {
    // TODO canvas画对调图标和童话
    const ctx = wx.createCanvasContext('changeIcon');
  }
})