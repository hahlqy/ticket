/** input数据双向绑定 */
const inputBindData = function(e) {
  // 对象动态属性名
  let property = e.currentTarget.dataset['property'];
  //设置页面data对象的属性值
  this.setData({
    [property]: e.detail.value
  });
};

/* 正则匹配url */
const urlReg = (url) => {
  const reg = /^(https?:\/\/)?([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.-]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i;
  // urlArr = ['all URL', '协议', 'domain', 'port', 'path', 'param', '锚点'];
  let urlArr = reg.exec(url);
  return urlArr;
}

/* 验证码序号转坐标 */
const captchaSequenceNumberToCoordinate = sequenceNumber => {
  let coordinateArr = [];
  if (!sequenceNumber) return '';
  else {
    sequenceNumber.split('').forEach(item => {
      switch (item) {
        case '1':
          coordinateArr.push('38\x2c74');
          break;
        case '2':
          coordinateArr.push('110\x2c74');
          break;
        case '3':
          coordinateArr.push('182\x2c74');
          break;
        case '4':
          coordinateArr.push('254\x2c74');
          break;
        case '5':
          coordinateArr.push('38\x2c146');
          break;
        case '6':
          coordinateArr.push('110\x2c146');
          break;
        case '7':
          coordinateArr.push('182\x2c146');
          break;
        case '8':
          coordinateArr.push('254\x2c146');
          break;
        default:
          throw new Error('请输入1~8以内数字');
      }
    });
    return coordinateArr.join('\x2c');
  }
};

/** cookie对象 去除了expires使用max-age */
class Cookie {
  //构造函数使用解构赋值 参数传入对象转变量
  constructor({
    domain: _domain,
    maxage: _maxage,
    name: _name,
    path: _path,
    value: _value
  } = {}) {
    // if (!_domain) throw new Error('Invalid parameter domain!');
    // if (!_path || _path.charAt(0) !== '\x2f') throw new Error('Invalid parameter path!');
    this.domain = _domain, this.maxage = _maxage, this.name = _name, this.path = _path, this.value = _value;
  }

  getCookie() {
    return `${this.name}=${this.value}`;
  }
}

/** http 响应头中Set-Cookie值强行使用JSON.parse转对象 */
Cookie.parse = (cookie_str, default_domain) => {
  if (cookie_str) {
    // 返回的cookie对象数组
    let cookie_arr = [];

    /* 删除expires，因为星期后包含逗号 分割后格式错误，反正存在max-age 有它没它无所谓 */
    // expires起始位置,expires结束位置,expires字符串
    let exppires_start_index, exppires_end_index, exppires_str;
    // \x20为= \x3b为;
    if ((exppires_start_index = cookie_str.indexOf('\x20Expires')) >= 0) exppires_end_index = cookie_str.indexOf('\x3b', exppires_start_index) + 1, exppires_str = cookie_str.substring(exppires_start_index, exppires_end_index), cookie_str = cookie_str.replace(exppires_str, '');

    // 强行拼成jsonString用JSON.parse转成对象数组
    // 按,分割.map(item去空格 ;替换"," 前拼接{" 后拼接"} )
    let object_arr = cookie_str.split('\x2c').map(item => `\x7b\x22${item.trim().replace(/\x3b/g, '\x22\x2c\x22').replace(/\x3d/g, '\x22\x3a\x22')}\x22\x7d`).map(JSON.parse);
    //遍历对象数组转cookie对象数组
    for (let _i in object_arr) {
      cookie_arr[_i] = new Cookie(); //初始化数组
      //遍历对象
      for (let _p in object_arr[_i]) {
        // 正则匹配属性赋值
        if (/Domain/i.test(_p)) cookie_arr[_i].domain = object_arr[_i][_p];
        // else if (/Expires/i.test(_p)) cookie_arr[_i].expires = object_arr[_i][_p];
        else if (/Max-Age/i.test(_p)) cookie_arr[_i].maxage = object_arr[_i][_p];
        else if (/Path/i.test(_p)) cookie_arr[_i].path = object_arr[_i][_p];
        else cookie_arr[_i].name = _p, cookie_arr[_i].value = object_arr[_i][_p];
      }
      if (!cookie_arr[_i].domain && default_domain) cookie_arr[_i].domain = default_domain.replace(/^w{3}./, '');
      else throw new Error(`${cookie_arr[_i].name} has no domain attribute!`);
    }
    return cookie_arr;
  } else throw new Error(`Invalid parameter ${cookie_str}!`);
};


//添加cookie
let setCookie = cookies => { //Set-Cookie格式字符串|Cookie对象数组|Cookie对象
  let new_cookie_arr = [];
  if (cookies instanceof Array) new_cookie_arr = cookies;
  else if (cookies instanceof Cookie) new_cookie_arr.push(cookies);
  else throw new Error('Invalid parameter!')
  // debugger
  new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'cookies',
      success: res => {
        resolve({
          data: {
            old_data_arr: res.data,
            new_data_arr: new_cookie_arr
          }
        });
      },
      fail: res => {
        //没有直接存
        reject({
          data: new_cookie_arr
        });
      }
    });
  }).then(res => {
    let old_data_arr = res.data.old_data_arr, // 旧cookie数组
      new_data_arr = res.data.new_data_arr; //新
    // 遍历新旧cookie数组 对比cookie.name 相同删除旧cookie，判断新cookie的maxage和value长度为0也删除掉。
    break_flag: for (let _i = 0; _i < old_data_arr.length; _i++) {
      for (let _j = 0; _j < new_data_arr.length;) {
        if (_i === old_data_arr.length) break break_flag; //当前下标等于数组长度说明以全部遍历过结束外层循环。
        // if (_j > new_data_arr.length) break; //
        if (old_data_arr[_i].name === new_data_arr[_j].name) {
          old_data_arr.splice(_i, 1), _j = 0; // 存在相同的删除旧数据，继续当前外层循环下表并重置内层循环下标。
          if (new_data_arr[_j].maxage === 0 || new_data_arr[_j].value === '') new_data_arr.splice(_j, 1); // 新数据maxage=0或者值为空则删除新数据。
        } else _j++;
      }
    }
    return Promise.reject({
      data: new_data_arr.concat(old_data_arr)
    });
  }).catch(res => {
    wx.setStorage({
      key: 'cookies',
      data: res.data,
      success: console.log, //
      fail: console.error //
    });
  });
};

// 获取Cookie根据path，默认返回/路径下Cookie
let getCookie = ({
  domain: _domain,
  path: _path
} = {}) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'cookies',
      complete: res => {
        let cookies = null;
        if (res.data) {
          cookies = res.data.filter(_item => RegExp(`${_item.domain}$`).test(_domain)).filter(_item => {
            let local_path = _item.path,
              request_path = _path;
            for (let _i = 1; _i < local_path.length; _i++) {
              if (local_path.charAt(_i) !== request_path.charAt(_i)) return false;
            }
            return true;
          }).map(_item => new Cookie(_item).getCookie()).join('\x3b');
        }
        resolve({
          data: cookies
        });
      }
    });
  });
};


/* 网络请求 */
const request = ({
  url: _url,
  data: _data,
  header: _header = {},
  method: _method = 'GET'
} = {}) => {
  return new Promise((resolve, reject) => {
    getCookie({
      domain: urlReg(_url)[2],
      path: urlReg(_url)[4]
    }).then(res => { //封装参数
      return {
        data: {
          url: _url,
          data: _data,
          header: Object.assign(_header, {
            cookie: res.data,
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8' // 默认表单格式
          }),
          method: _method,
          dataType: 'json',
          responseType: 'text'
        }
      };
    }).then(res => { //请求
      let param = Object.assign(res.data, {
        success: res => {
          if (res.header['Set-Cookie']) setCookie(Cookie.parse(res.header['Set-Cookie'], urlReg(_url)[2])); //保存cookie
          resolve({
            data: res.data
          });
        },
        fail: res => {
          console.error(res.errMsg);
          reject(res);
        }
      });
      wx.request(param);
    });
  });
};



module.exports = {
  Cookie: Cookie,
  setCookie: setCookie,
  getCookie: getCookie,
  captchaSequenceNumberToCoordinate: captchaSequenceNumberToCoordinate,
  inputBindData: inputBindData,
  // urlReg: urlReg,
  request: request
}