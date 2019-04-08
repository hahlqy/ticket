// import * as util from '../../utils/util.js';
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp();

const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

Page({
  data: {
    citys: {},
    station_names: [],
    favorite_names: [],

    fromStationText: "北京",
    toStationText: "成都",
    date: new Date(),
    train_date: (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日", //出发时间
    weekDay: week[new Date().getDay()], //周几    
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
      weekDay: week[new Date(date[0], (date[1] * 1 - 1), date[2]).getDay()]
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
    console.log(util.getCookies('/'))
  },
  changeIcon() {
    const ctx = wx.createCanvasContext('changeIcon');
  },
  // 事件处理函数
  // onLoad	Function	生命周期回调—监听页面加载
  onLoad: function() {
    let _this = this;
    // 设置
    util.request({
      _url: 'https://kyfw.12306.cn/otn/login/conf',
      _method: 'POST',
      _success: data => {
        // console.warn('conf', data)
        _this.data.conf = data;
      }
    });
    // 火车站名
    util.request({
      _url: 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js',
      _success: data => {
        data.substring(data.indexOf('@') + 1, data.lastIndexOf('\'')).split('@').forEach(item => {
          let name = item.split('|');

          _this.data.station_names.push(name);
        });
        // console.log(_this.data.station_names)
      }
    });
    //热门车站
    util.request({
      _url: 'https://kyfw.12306.cn/otn/resources/js/framework/favorite_name.js',
      _success: data => {
        data.substring(data.indexOf('@') + 1, data.lastIndexOf('\'')).split('@').forEach(item => {
          let name = item.split('|');

          _this.data.favorite_names.push(name);
        });
        // console.log(_this.data.station_names)
      }
    });

    // 写入cookie
    // util.request({
    //   _url: 'https://kyfw.12306.cn/otn/HttpZF/logdevice',
    //   _data: {
    //     algID: 'stlPYD4gpV',
    //     hashCode: 'a7XWkoNcnIs2rj2ZvlnuXoxreQ8phfLO5LDe45BcPMU',
    //     FMQw: '0',
    //     q4f3: 'zh - CN',
    //     VPIf: '1',
    //     custID: '133',
    //     VEek: 'unspecified',
    //     dzuS: '32.0 r0*',
    //     yD16: '0',
    //     EOQP: 'a93b28a68349a24f13e896433ed0bbf3',
    //     lEnu: '3232260990',
    //     jp76: 'b34839808806e7ff02df813671ec99b3',
    //     hAqN: 'Win32',
    //     platform: 'WEB',
    //     ks0Q: 'a103db222cd8296a50268c8f0355b741',
    //     TeRS: '824x1536',
    //     tOHY: '24xx864x1536',
    //     Fvje: 'i1l1s1',
    //     q5aJ: '- 8',
    //     wNLf: '99115dfb07133750ba677d055874de87',
    //     '0aew': 'Mozilla / 5.0(Windows NT 10.0; Win64; x64; rv: 66.0) Gecko / 20100101 Firefox / 66.0',
    //     E3gR: 'f1dcf86ab87c9b505df152849f8ce446',
    //     timestamp: new Date().getTime()
    //   },
    //   _success: data => {
    //     // console.log(data)
    //     let cookieJson = JSON.parse(data.substring(data.indexOf('\'') + 1, data.lastIndexOf('\'')));
    //     let cookieString = `RAIL_EXPIRATION=${cookieJson.exp}; path=/,RAIL_DEVICEID=${cookieJson.dfp}; path=/`;
    //     // console.log(cookieString)
    //     util.setCookies(cookieString);
    //   }
    // });
    //自己请求的不行 可能跟request head的referer有关
    util.setCookies(`RAIL_EXPIRATION=1554608366457; path=/,RAIL_DEVICEID=Pp52n7u3o7Hb9nZKTLHtzHh3UDWwDhig_H-26yJCASqneQf8u-zBaupzvguHBRmroIAvVdekZXH-4Rv1tNDyBRHstRTg7G_1GdU2-j-V-JbEpPJsZHBFOExvoOVBzY-udh9ywpPVXAhZk9eW0ZyGR6R_i3BtgWse; path=/`);
    // 不知道干嘛的 站名：时间
    util.request({
      _url: 'https://www.12306.cn/index/script/core/common/qss_v10026.js',
      _success: data => {
        _this.data.citys = JSON.parse(data.substr(data.indexOf('{')))
      }
    });
  },
  // onShow	Function	生命周期回调—监听页面显示
})