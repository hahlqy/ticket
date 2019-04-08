let Cookie = {
  domain,
  expires,
  maxage,
  name,
  path,
  root: `${wx.env.USER_DATA_PATH}/cookies`,
  value,
  _set: cookieString => {
    if (cookieString) {
      const [domainReg, expiresReg, maxAgeReg, pathReg] = [RegExp(/Domain/i), RegExp(/Expires/i), RegExp(/Max-Age/i), RegExp(/Path/i)]; //定义正则表达式判断包含属性名
      for (item of cookieString.split(/;\s?/)) {
        let [_key, _value = ''] = item.split('=');
        if (domainReg.test(_key)) { // domain
          this.domain = _value;
        } else if (expiresReg.test(_key)) { // expires
          this.expires = _value;
        } else if (maxAgeReg.test(_key)) { // max_age
          this.maxage = _value;
        } else if (pathReg.test(_key)) { // path
          this.path = _value;
        } else {
          this.name = _key, this.value = _value; // cookieObj[_key] = _value;
        }
      }
    }
    return this;
  },
  _get
}


module.exports = {
  Cookie: Cookie
};