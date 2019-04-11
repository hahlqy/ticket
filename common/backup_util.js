//  regeneratorRuntime from "../lib/regenerator/runtime-module.js";

const fs = wx.getFileSystemManager();

//判断是否为目录
const isDirectory = async dirPath => {
  return await new Promise(resolve => {
    fs.stat({
      path: dirPath,
      success: res => {
        if (res.stats.isDirectory()) resolve(true);
        else resolve(false)
      },
      fail: res => {
        console.error(res);
      }
    });
  });
};

//判断是否为文件类型
const isFile = async filePath => {
  return !await isDirectory(filePath);
};

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


}
Cookie.root = `${wx.env.USER_DATA_PATH}/cookies`;
Cookie.set = async cookieString => {
  console.log('setttttttt', cookieString)
};
Cookie.get = async path => {
  console.log('getttttttttttt', Cookie.root)
};

/* 函数-目录创建 */
const makeDirectory = dirPath => {
  return new Promise(resolve => {
    fs.access({
      path: dirPath,
      fail: res => {
        console.warn(res)
        resolve(dirPath);
      }
    });
  }).then(_dirPath => {
    fs.mkdir({
      dirPath: _dirPath,
      recursive: true, // invalid
      fail: res => {
        console.error(res);
      }
    });
  });
};

/**
 * 设置Cookie 
 * cookieStringArray = data.header['Set-Cookie'].split(',')
 */
const setCookies = async cookieString => {
  if (cookieString) {
    const cookiesPath = `${wx.env.USER_DATA_PATH}/cookies`,
      cookieStringArray = cookieString.split(',');

    /* 函数-cookie字符串转对象 */
    const cookieStringParseObject = cookieString => {
      let cookieObject = {};
      if (cookieString) {
        //定义正则表达式判断包含属性名
        const maxAgeReg = RegExp(/Max-Age/i),
          expiresReg = RegExp(/Expires/i),
          domainReg = RegExp(/Domain/i),
          pathReg = RegExp(/Path/i);
        let cookieStrArr = cookieString.split(/;\s?/);
        cookieStrArr.forEach(item => {
          let _arr = item.split('='),
            _key = _arr[0],
            _value = _arr[1] || '';
          if (maxAgeReg.test(_key)) { // max_age
            cookieObject['max-age'] = _value;
          } else if (expiresReg.test(_key)) { // expires
            cookieObject['expires'] = _value;
          } else if (domainReg.test(_key)) { // domain
            cookieObject['domain'] = _value;
          } else if (pathReg.test(_key)) { // path
            cookieObject['path'] = _value;
          } else {
            cookieObject['name'] = _key, cookieObject['value'] = _value;
            // cookieObject[_key] = _value;
          }
        });
      }
      return cookieObject;
    };

    // 函数-写入cookie文件
    const setCookie = cookieObj => {
      let _dirPath = cookieObj.path,
        _fileName = cookieObj.name,
        _fileText = `${cookieObj.name}=${cookieObj.value}`;
      fs.writeFile({
        filePath: `${_dirPath}/${_fileName}`,
        data: _fileText,
        fail: res => {
          console.error(`${_dirPath}/${_fileName} Cookie文件写入失败`, res.errMsg);
        }
      });
    };

    /* 循环写入文件 */
    for (let _cookieString of cookieStringArray) {
      let _cookieObj = cookieStringParseObject(_cookieString);
      if (_cookieObj && _cookieObj['path']) {
        if (_cookieObj['path'] === '/') {
          _cookieObj['path'] = cookiesPath;
        } else {
          _cookieObj['path'] = `${cookiesPath}${_cookieObj['path']}`;
        }
        await makeDirectory(_cookieObj['path']);
        console.log('mkdir', _cookieObj['path'])
        await setCookie(_cookieObj);
      } else {
        throw new Error('cookie对象错误!');
      }
    }
  }
}



/* 获取Cookie数组 */
let getCookies = async path => {
  const COOIKE_PATH = `${wx.env.USER_DATA_PATH}/cookies`,
    targetPath = `${COOIKE_PATH}${path}`;
  let cookies = [];

  /**读取文件内容 */
  let readFile = async(_filePath) => {
    return await new Promise(resolve => {
      fs.readFile({
        filePath: _filePath,
        encoding: 'utf8',
        success: res => {
          resolve(res.data);
        },
        fail: res => {
          resolve(false);
        }
      });
    })
  };

  /**获取文件绝对路径 */
  let getFilesPath = async(_dirPath) => {
    return await new Promise(resolve => {
      fs.readdir({
        dirPath: _dirPath,
        success: async res => { // Geted the name of all the files 
          let arr = [];
          for (let file of res.files) {
            let absolutePath = `${_dirPath}/${file}`;
            let stat = await new Promise((resolve, reject) => {
              fs.stat({
                path: absolutePath,
                success: res => {
                  if (res.stats.isDirectory()) resolve(false);
                  else resolve(true);
                }
              });
            });
            if (stat) arr.push(absolutePath);
          }
          resolve(arr);
        }
      });
    })
  }

  let paths = await getFilesPath(COOIKE_PATH);
  if (COOIKE_PATH !== targetPath) paths = paths.concat(await getFilesPath(targetPath));
  for (let path of paths) {
    let content = await readFile(path);
    if (content)
      cookies.push(content);
  }
  return cookies;
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
  // console.log(e.currentTarget.dataset.key);
  let key = e.currentTarget.dataset.key;
  // console.log(this.data[key]);
  // 对象动态属性名
  this.setData({
    [key]: e.detail.value
  });
  // console.log(this.data[key]);

};

/* 网络请求 */
const request = ({
  _url,
  _data,
  _header = {},
  _method = 'GET',
  _success
} = {}) => {
  _header = Object.assign(_header, {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', // 默认表单格式
    // cookie: getCookies('/' + urlReg(_url)[4].split('/')[1]).join('; ') // TODO 获取一级path下Cookie数组并用; 连接
  });
  wx.request({
    url: _url,
    data: _data,
    header: _header,
    method: _method,
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (res.header['Set-Cookie']) {
        setCookies(res.header['Set-Cookie']); //保存cookie
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
  setCookies: setCookies,
  getCookies: getCookies,
  captchaSequenceNumberToCoordinate: captchaSequenceNumberToCoordinate,
  inputBindData: inputBindData,
  // urlReg: urlReg,
  makeDirectory: makeDirectory,
  request: request
}


/* ES6 */
// export {
//   formatTime,
//   setCookies,
//   getCookies,
//   captchaSequenceNumberToCoordinate,
//   inputBindData,
//   // urlReg,
//   makeDirectory,
//   request
// };
