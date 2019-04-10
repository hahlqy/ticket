//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    otn: ['1','2','3'],
    passport: []
  },
  onLoad: function() {
    this.data.otn = util.getCookies('/otn');
    console.log('load',this.data)
  },onShow:function(){
    this.data.otn = util.getCookies('/otn');
    console.log('show', this.data)
  }

})