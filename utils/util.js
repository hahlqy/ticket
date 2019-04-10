class Cookie {
  constructor({
    domain,
    expires,
    maxage,
    name,
    path,
    value
  } = {}) {
    this.domain = domain, this.expires = expires, this.maxage = maxage, this.name = name, this.path = path, this.value = value;
  }
  getValue() {
    return `${this.name}=${this.value}`;
  }
}
//http 响应头中Set-Cookie值强行转对象
Cookie.parse = cookieString => {
  if (!!cookieString) {
    //return obj
    let data = {};
    let start, end, exppires; //expires起始位置,expires结束位置,expires字符串
    if ((start = cookieString.indexOf('\x20Expires')) >= 0) {
      // debugger
      end = cookieString.indexOf('\x3b', start) + 1,
        exppires = cookieString.substring(start, end);
      cookieString = cookieString.replace(exppires, ''); //删除expires，因为星期后包含逗号 分割后格式错误，反正存在max-age 有它没它无所谓
    }
    //强行拼成jsonString用JSON.parse转成对象
    //,分割.map(item.trim()前拼接{"后拼接"};替换",")
    let cookieObjArr = cookieString.split('\x2c').map(item => `\x7b\x22${item.trim()}\x22\x7d`.replace(/\x3b/g, '\x22\x2c\x22').replace(/\x3d/g, '\x22\x3a\x22')).map(JSON.parse);
    // console.warn('cookieString changed', cookieObjArr);
    //遍历数组
    for (let _o of cookieObjArr) {
      let _cookie = new Cookie();
      //遍历对象
      for (let _k in _o) {
        // 正则匹配
        if (/Domain/i.test(_k)) _cookie.domain = _o[_k];
        else if (/Expires/i.test(_k)) _cookie.expires = _o[_k];
        else if (/Max-Age/i.test(_k)) _cookie.maxage = _o[_k];
        else if (/Path/i.test(_k)) _cookie.path = _o[_k];
        else _cookie.name = _k, _cookie.value = _o[_k];
      }
      // 添加到返回值
      if (!!data[_cookie.path]) data[_cookie.path].push(_cookie);
      else data[_cookie.path] = [_cookie];
    }
    return data;
  } else throw new Error('Parameter cookieString invalid');
};

//添加cookie
let setCookie = cookieString => {
  let obj = Cookie.parse(cookieString);
  // console.warn(obj)
  if (!!obj) {
    for (let _path in obj) {
      //新数据数组
      let _newData = obj[_path];
      wx.getStorage({
        key: _path,
        success(res) { //
          //复制旧数据数组
          let _oldData = res.data.concat();
          _flag: for (let i = 0; i < _oldData.length; i++) {
            for (let j = 0; j < _newData.length; j++) {
              if (_oldData[i].name === _newData[j].name) _oldData.splice(i, 1); //相同删除旧数组对象
              if (_oldData.length === i) break _flag; //删除后长度等于当前下标说明已经到数组最后继续执行会越界
            }
          }
          _newData = _newData.concat(_oldData);
          wx.setStorage({
            key: _path,
            data: _newData,
            success: console.log, //
            fail: console.error //
          });
        },
        fail: res => { //获取失败说明未存储
          // debugger
          wx.setStorage({
            key: _path,
            data: _newData,
            success: console.log, //
            fail: console.error //
          });
        }
      })
    };
  }
};

// 获取Cookie根据path，默认返回/路径下Cookie
let getCookie = path => {
  let _get = path => {
    // debugger
    // let data = wx.getStorageSync(path);
    return wx.getStorageSync(path);
  };
  let data = _get('/');
  if (!!path && path !== '/') data = data.concat(_get(path));

  if (data) {
    let cookie = data.map(item => new Cookie(item).getValue()).join('; ')
    // console.log(data);
    return cookie;
  }
};

/* 验证码序号转坐标 */
const captchaSequenceNumberToCoordinate = sequenceNumber => {
  let coordinateArr = [];
  if (sequenceNumber) {
    sequenceNumber.split('').forEach(item => {
      switch (item) {
        case '1':
          coordinateArr.push('38,74');
          break;
        case '2':
          coordinateArr.push('110,74');
          break;
        case '3':
          coordinateArr.push('182,74');
          break;
        case '4':
          coordinateArr.push('254,74');
          break;
        case '5':
          coordinateArr.push('38,146');
          break;
        case '6':
          coordinateArr.push('110,146');
          break;
        case '7':
          coordinateArr.push('182,146');
          break;
        case '8':
          coordinateArr.push('254,146');
          break;
        default:
          console.warn("请输入1~8以内数字");
          return;
      }
    });
  }
  return coordinateArr;
};

/* input数据双向绑定 */
const inputBindData = function(e) {
  let property = e.currentTarget.dataset.property;
  // 对象动态属性名
  this.setData({
    [property]: e.detail.value
  });
};

/* 网络请求 */
const request = ({
  url: _url,
  data: _data,
  header: _header = {},
  method: _method = 'GET',
  success: _success,
  fail: _fail
} = {}) => {
  _header = Object.assign(_header, {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' // 默认表单格式
  });
  // debugger
  let cookie = getCookie('/' + urlReg(_url)[4].split('/')[1] || '') // TODO 获取一级path
  if (cookie) _header.cookie = cookie;
  wx.request({
    url: _url,
    data: _data,
    header: _header,
    method: _method,
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (res.header['Set-Cookie']) {
        setCookie(res.header['Set-Cookie']); //保存cookie
      }
      _success(res.data); //返回数据
    },
    fail: function(res) {},
    complete: function(res) {
      console.warn(_url, res);
    },
  })
};

/* 正则匹配url */
const urlReg = (url) => {
  const reg = /^(https?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.-]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
  // urlArr = ['完整URL', '协议', '地址', '端口', '路径', '查询', '锚点']
  let urlArr = reg.exec(url);
  return urlArr;
}

module.exports = {
  Cookie: Cookie,
  setCookie: setCookie,
  getCookie: getCookie,
  captchaSequenceNumberToCoordinate: captchaSequenceNumberToCoordinate,
  inputBindData: inputBindData,
  // urlReg: urlReg,
  request: request
}