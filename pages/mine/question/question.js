const util = require('../../../common/util.js');

Page({

  data: {
    // 访问的url
    url: 'https://kyfw.12306.cn/otn/HttpZF/logdevice?algID=knqqubQnpP&hashCode=saYsuIaKZnRUINpyNbRJm_j3S5and5nV9lt2umujRYg&FMQw=0&q4f3=zh-CN&VySQ=FGFSMsIJI228zjIiN8fXr8-ANCUc3oXt&VPIf=1&custID=133&VEek=unspecified&dzuS=32.0%20r0*&yD16=0&EOQP=a93b28a68349a24f13e896433ed0bbf3&lEnu=3232260990&jp76=b34839808806e7ff02df813671ec99b3&hAqN=Win32&platform=WEB&ks0Q=a103db222cd8296a50268c8f0355b741&TeRS=824x1536&tOHY=24xx864x1536&Fvje=i1l1s1&q5aJ=-8&wNLf=99115dfb07133750ba677d055874de87&0aew=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64;%20rv:66.0)%20Gecko/20100101%20Firefox/66.0&E3gR=f1dcf86ab87c9b505df152849f8ce446&timestamp=' + new Date().getTime(),
    //顶部tip显示开关
    showTopTip: false,
    //顶部tip显示文本
    topTipText: '',
    //文本框错误警告
    warnClass: 'weui-cell_warn',
    //文本框内容
    pageText: '',
    //文本框内容长度
    textLength: 0
  },
  // 复制函数
  copyUrl: function() {
    let _this = this;
    wx.setClipboardData({
      data: _this.data.url,
    })
  },
  // 返回自动粘贴
  onShow: function() {
    let _this = this;
    wx.getClipboardData({
      success(res) {
        if (_this.textCheck(res.data, false)) _this.setData({
          pageText: res.data
        });
      }
    });
  },
  //文本域输入函数
  inputTyping: function(e) {
    //反向绑定数据
    util.inputTyping.call(this, e);
    //验证文本
    this.textCheck(this.data.pageText);
    //文本长度修改
    this.setData({
      textLength: e.detail.value.length
    });
  },
  // 文本验证
  textCheck: function(value, isShowTopTip = true) {
    // debugger
    const _this = this,
      //验证文本正则
      reg = /^callbackFunction\(\'\{\"exp\"\:\"{1}\d{13}\"\,\"dfp\"\:\"{1}[a-zA-Z0-9\_\-]{160}\"\}\'\)$/g;
    //验证返回值
    let isOk = false;
    //正则验证
    if (!reg.test(value)) {
      if (isShowTopTip) {
        //显示顶部tip
        this.setData({
          showTopTip: true,
          topTipText: '文本格式错误',
          warnClass: 'weui-cell_warn'
        });
        setTimeout(() => {
          _this.setData({
            showTopTip: false,
            topTipText: ''
          });
        }, 3000);
      }
    } else {
      isOk = true;
      // 去除文本框错误警告
      this.setData({
        warnClass: ''
      });
    }
    return isOk;
  },
  commit: function() {
    let obj = JSON.parse(this.data.pageText.substring(this.data.pageText.indexOf('\x7b'), this.data.pageText.indexOf('\x7d') + 1));
    util.setCookie(`RAIL_EXPIRATION=${obj.exp}; path=/,RAIL_DEVICEID=${obj.dfp}; path=/`);
    wx.showModal({
      title: '提交完成',
      content: '是否跳转到登录页面',
      cancelText: '返回',
      confirmText: '登录',
      confirmColor: '#3cc51f',
      success(res) {
        if (res.confirm) {
          wx.reLaunch({
            url: '/pages/mine/login'
          })
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})