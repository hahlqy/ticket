// import * as util from '../../utils/util.js';
const util = require('../../common/util.js'),
  template = require('../../common/template/template.js');
//获取应用实例
const app = getApp();

Page({
  data: {
    visibleStationLayer: false, //站地选择弹出层
    visibleDateLayer: false, //显示日期选择弹层
    visableStudentTicket: true, //学生票按钮

    fromStationText: '出发地', //出发地显示文本
    toStationText: '目的地', //目的地显示文本
    showDate: {
      // year: (new Date).getFullYear(),
      month: app.globalData.MONTH[(new Date).getMonth()],
      date: (new Date).getDate(),
      week: app.globalData.WEEKS[(new Date).getDay()]
    }, //出发时间
    studentTicketValue: 'student', //学生票checkbox的值

    train_date: (new Date).format('yyyy-MM-dd'), //出发日期 默认当天
    from_station: '', //出发地代码
    to_station: '', //目的地代码
    purpose_codes: 'ADULT' //学生票 成人票

  },
  //查询按钮函数
  fnQueryTicket() {
    wx.redirectTo({
      url: './query/query',
    })
  },
  onLoad: function(options) {
    /* 判断车站信息缓存 */
    wx.getStorage({
      key: 'station_names',
      //没有缓存重新获取
      fail: res => {
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
      }
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
          from_station: _from[2] || this.data.from_station,
          to_station: _to[2] || this.data.to_station,
          fromStation_text: _from[1] || this.data.fromStationText,
          toStationText: _to[1] || this.data.toStationText
        });
      }
    });
  },
  //选择站点
  fnAppearStationlayer(e) {
    this.setData({
      test: '1111111'
    });
    console.log(this.data.test)
    this.setData({
      visibleStationLayer: true
    });
  },
  fnPickedStation(e) {
    template.fnPickedStation.call(this, e);
  },
  // 选择时间
  fnAppearDateLayer(e) {
    this.setData({
      visibleDateLayer: true
    });
  },
  //选择日期
  fnPickedDate(e) {
    template.fnPickedDate.call(this, e);
  },
  //标记触摸x坐标
  fnMarkTouchPoint(e) {
    template.fnMarkTouchPoint.call(this, e);
  },
  //→滑动关闭弹出层
  fnSlideClose(e) {
    template.fnSlideClose.call(this, e);
  },
  // 学生票选项
  fnStudentTicketChange(e) {
    this.setData({
      purpose_codes: e.detail.value[0] || 'ADULT'
    });
  }
})