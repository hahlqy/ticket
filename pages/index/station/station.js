const util = require('../../../common/util.js'),
  constant = require('../../../common/constant.js');

Page({
  data: {
    position: '',
    input_val: '',
    inputShowed: false,
    search_result_arr: [],
    input_length_flag: 0, //标记上次输入的长度 判断录入删除
    station_name_arr: [],
    letter_arr: []
  },
  onLoad: function(options) {
    wx.showNavigationBarLoading();
    let _this = this;
    wx.getStorage({
      key: 'station_names',
      success: res => {
        _this.setData({
          station_name_arr: res.data,
          letter_arr: constant.LETTERS,
          position: options.p
        });
       
      }
    });

    // let start = new Date().getTime();
    // console.log(new Date().getTime() - start)
  },
  onShow:function(){
    wx.hideNavigationBarLoading();
  },
  // 输入反向绑定，匹配关键字
  inputTyping: function(e) {
    //开启导航栏加载
    wx.showNavigationBarLoading();
    //保存上次输入字符长度
    this.setData({
      input_length_flag: this.data.input_val.length
    });
    //反向绑定数据
    util.inputTyping.call(this, e);
    // 输入栏为空，清空相关数据，结束此函数
    if (!e.detail.value) {
      this.setData({
        search_result_arr: [],
        input_length_flag: 0
      });
      //关闭导航栏加载
      wx.hideNavigationBarLoading();
      return;
    }
    //输入的数据
    let input_val = e.detail.value,
      //待选数组 候选数据数组
      candidate_arr = [];
    //录入首字母或键入删除时
    if (!this.data.input_length_flag || input_val.length < this.data.input_length_flag) {
      // 匹配输入的数据为字母
      if (/[a-zA-Z]+/.test(input_val)) {
        // 遍历26个字母的数组
        for (let _i in constant.LETTERS) {
          //输入数据的第一个字母匹配获取字母下标
          if (input_val.charAt(0) === constant.LETTERS[_i]) {
            //获取字母下标的车站数组赋值给备选数组
            candidate_arr = this.data.station_name_arr[_i];
            //匹配到就停止循环
            break;
          }
        }
        //判断输入第一个字母则直接展示数据
        if (!this.data.input_length_flag) {
          this.setData({
            search_result_arr: candidate_arr
          });
          //隐藏导航条加载
          wx.hideNavigationBarLoading();
          return;
        }
        //输入数据匹配汉字
      } else if (/[\u4e00-\u9fa5]+/.test(input_val)) {
        //遍历全部信息合并到备选数组
        for (let _letter_arr of this.data.station_name_arr) {
          for (let _item of _letter_arr) {
            candidate_arr.push(_item);
          }
        }
      }
      // 判断本次输入数据比上次长则从上次搜索结果中继续匹配
    } else if (input_val.length > this.data.input_length_flag) {
      candidate_arr = this.data.search_result_arr; //插入新值
    }
    // 输入数据转正则对象
    let reg = RegExp(input_val),
      //返回结果数组
      result_arr = [];
    //循环待选数组
    for (let _item of candidate_arr) {
      //匹配字母 0类似简拼 3全拼 4简拼
      if (/[a-zA-Z]+/.test(input_val) && (reg.test(_item[0]) || reg.test(_item[3]) || reg.test(_item[4]))) {
        result_arr.push(_item);
        //匹配汉字
      } else if (/[\u4e00-\u9fa5]+/.test(input_val) && reg.test(_item[1])) {
        // debugger
        result_arr.push(_item);
      }
    }
    // 展示
    this.setData({
      search_result_arr: result_arr
    });
    //隐藏导航条加载
    wx.hideNavigationBarLoading();
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  //取消搜索
  hideInput: function() {
    this.setData({
      input_val: "",
      inputShowed: false
    });
  },
  inputUnfocus: function(e) {
    if (!e.detail.value) {
      this.setData({
        inputShowed: false
      });
    }
  },
  //清空搜索框
  clearInput: function() {
    this.setData({
      input_val: ''
    });
  }


})