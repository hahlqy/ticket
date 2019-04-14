const formatTime = date => {
  const year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    };
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

/**
 * 设置Cookie 
 * cookieStringArray = data.header['Set-Cookie'].split(',')
 */
const setCookies = cookieString => {
  if (cookieString) {
    const cookieRoot = `${wx.env.USER_DATA_PATH}/cookies`,
      fs = wx.getFileSystemManager(),
      cookieStringArray = cookieString.split(',');

    /* 函数-cookie字符串转对象 */
    const cookieStringParseObject = str => {
      let cookieObject = {};
      if (str) {
        //定义正则表达式判断包含属性名
        const max_AgeReg = RegExp(/Max-Age/i),
          expiresReg = RegExp(/Expires/i),
          domainReg = RegExp(/Domain/i),
          pathReg = RegExp(/Path/i);
        let cookieStrArr = str.split(/;\s?/);
        cookieStrArr.forEach(item => {
          let _arr = item.split('='),
            _key = _arr[0],
            _value = _arr[1] || '';
          if (max_AgeReg.test(_key)) { // max_age
            cookieObject.max_age = _value;
          } else if (expiresReg.test(_key)) { // expires
            cookieObject.expires = _value;
          } else if (domainReg.test(_key)) { // domain
            cookieObject.domain = _value;
          } else if (pathReg.test(_key)) { // path
            cookieObject.path = _value;
          } else {
            cookieObject.name = _key, cookieObject.value = _value;
            // cookieObject[_key] = _value;
          }
        });
      }
      return cookieObject;
    };

    // 函数-写入cookie文件
    const setCookie = (obj = {
      dirPath,
      fileName,
      fileText
    }) => {
      fs.writeFile({
        filePath: `${obj.dirPath}/${obj.fileName}`,
        data: obj.fileText,
        success: () => {
          // console.log(`${obj.dirPath}/${obj.fileName} Cookie文件写入成功`);

          /* Test */
          // fs.readFile({
          //   filePath: `${obj.dirPath}/${obj.fileName}`,
          //   encoding: 'utf8',
          //   success: res => {
          //     console.error(res)
          //   }
          // });
        },
        fail: obj => {
          console.error(`${obj.dirPath}/${obj.fileName} Cookie文件写入失败`, obj.errMsg);
        }
      });
    };

    /* 函数-判断目录，mkdir是否创建 */
    const accessDirectory = (dirPath, mkdir) => {
      try {
        fs.accessSync(dirPath);
      } catch (err1) {
        console.warn(`${dirPath}文件夹不存在，正在创建……`);
        if (mkdir) {
          try {
            fs.mkdirSync(dirPath);
            console.warn(`${dirPath}文件夹创建成功`);
            // fs.accessSync(dirPath);
          } catch (err2) {
            console.error(`${dirPath}文件夹创建失败`, err2);
          }
        }
      }
      try {
        if (!fs.statSync(dirPath).isDirectory()) {
          throw new Error(`${dirPath}不是目录`);
        }
      } catch (err3) {
        console.error(err3);
      }
    };

    /**
     * 判断cookieRoot目录
     * 循环>判断目录>存在>>>>>>>>写入文件
     *              不存在>创建>
     */
    accessDirectory(cookieRoot, true);
    cookieStringArray.forEach(cookieString => {
      let _cookieObj = cookieStringParseObject(cookieString),
        _dirPath = `${cookieRoot}${_cookieObj.path === '/' ? '' : _cookieObj.path}`,
        _fileName = _cookieObj.name,
        _fileText = `${_cookieObj.name = _cookieObj.value}`;

      //判断此path目录是否存在
      accessDirectory(_dirPath, true);
      setCookie({
        dirPath: _dirPath,
        fileName: _fileName,
        fileText: _fileText
      });
    });
  }
}

/**
 * 获取Cookie数组
 */
const getCookies = path => {
  //未传参默认查询根目录
  if (!path) {
    path = '/';
  }
  let cookieArr = [];
  const fs = wx.getFileSystemManager(),
    rootPath = `${wx.env.USER_DATA_PATH}/cookies`;

  /* 函数-获取目录下文件路径，recursive为是否递归子目录 */
  const readDirFilesPath = (directoryPath, recursive = false) => {
    //文件路径数组
    let filesInfo = [];
    try {
      //判断directoryPath是否为目录
      if (fs.statSync(directoryPath).isDirectory) {
        //读取目录下全部文件并循环
        fs.readdirSync(directoryPath).forEach(fileName => {
          // debugger
          // 文件路径
          let filePath = `${directoryPath}/${fileName}`;
          // 判断文件是否为文件夹
          if (fs.statSync(filePath).isDirectory()) {
            //是否递归子目录
            if (recursive) {
              // 递归
              filesInfo = filesInfo.concat(readDirFilesPath(fileInfo));
            }
          } else { // add
            filesInfo.push({
              filePath: filePath,
              fileName: fileName
            });
          }
        });
      } else {
        throw new Error(`${directoryPath}不是目录`);
      }
    } catch (errObj) {
      console.error(errObj);
    }
    return filesInfo;
  };

  try {
    // cookies目录是否存在
    // fs.accessSync(rootPath);
    //读取cookies目录下文件
    let filesInfo = readDirFilesPath(rootPath);
    // 如果获取的cookie不是cookies下path不是/，path第一位是/
    if (path.length > 1 && path.charAt(0) === '/') {
      filesInfo = filesInfo.concat(readDirFilesPath(rootPath + path));
    }
    //循环文件路径数组，读取文件并添加到cookie数组
    filesInfo.forEach(fileInfo => {
      // console.warn(fileInfo);
      cookieArr.push(`${fileInfo.fileName}=${fs.readFileSync(fileInfo.filePath, 'utf8')}`);
    });
  } catch (errObj) {
    console.error(errObj)
  }
  return cookieArr;
};

/**
 * 验证码序号转坐标
 */
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

/**
 * input数据双向绑定
 */
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

const request = (param = {
  url,
  data,
  header,
  method: 'GET',
  success
}) => {
  let _header = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  Object.assign(_header, param.header);
  wx.request({
    url: param.url,
    data: param.data,
    header: _header,
    method: param.method,
    dataType: 'json',
    responseType: 'text',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {
      if (res.statusCode === 200) {
        param.success(res);
      } else {
        console.error(res);
      }
    },
  })
};

module.exports = {
  formatTime: formatTime,
  setCookies: setCookies,
  getCookies: getCookies,
  captchaSequenceNumberToCoordinate: captchaSequenceNumberToCoordinate,
  inputBindData: inputBindData,
  request: request
}

/** 纪念第一次写回调函数*/
// 判断文件/目录是否存在(异步))
// let accessDir = (obj = {
//   dirPath, // 路径
//   success, // 成功回调
//   faild // 失败回调
// }) => {
//   fs.access({
//     path: obj.dirPath + "",
//     success: () => {
//       console.log(`${obj.dirPath} 目录存在哦，做什么都可以哦`);
//       obj.success();
//     },
//     fail: errMsg => {
//       console.error(`MMP，${obj.dirPath} 目录不存在，还得创建目录`, errMsg);
//       // 创建目录
//       fs.mkdir({
//         dirPath: obj.dirPath,
//         success: () => {
//           console.log(`${obj.dirPath} 目录创建完了，该干嘛干嘛去吧。`);
//           obj.success();
//         },
//         fail: obj => {
//           console.error(`我*，创建个 ${obj.dirPath} 目录都能失败，你已经死了。`, obj);
//           obj.fail({
//             errMsg: "失败了"
//           });
//         }
//       });
//     }
//   });

// };