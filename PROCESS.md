# 初始化 获取cookie

| 请求网址                                                      | 请求方法 | 参数                                         | 请求Cookie                                                                   | 响应Cookie                                              | 响应                                             | 描述                   |
| ------------------------------------------------------------- | -------- | -------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------ | ---------------------- |
| https://kyfw.12306.cn/otn/HttpZF/GetJS                        | GET      |                                              |                                                                              | BIGipServerotn;/                                        | js文件                                           |
| https://www.12306.cn/index/fonts/iconfont.ttf?t=1543666379057 | GET      | 当前时间戳                                   |                                                                              | BIGipServerpool_index;/                                 | 字体文件                                         | 应该没用               |
| https://www.12306.cn/index/script/core/common/qss_v10026.js   | GET      |
| https://kyfw.12306.cn/otn/login/conf                          | POST     |                                              |                                                                              | BIGipServerotn,JSESSIONID,route                         | [conf响应](#conf_response)                       | 获取设置信息和Cookie   |
| https://kyfw.12306.cn/otn/index12306/getLoginBanner           | GET      |                                              |                                                                              | BIGipServerotn,JSESSIONID,route                         | [getLoginBanner响应](#getLoginBanner_response)   | 获取Banner信息和Cookie |
| https://kyfw.12306.cn/passport/web/auth/uamtk-static          | POST     | [uamtk-static参数](#uamtk-static_data)       | BIGipServerotn,route                                                         | _passport_session,BIGipServerpool_passport              | [uamtk-static响应](#uamtk-static_response)       | 检测用户登录           |
| https://kyfw.12306.cn/passport/captcha/captcha-image64        | GET      | [captcha-image64参数](#captcha-image64_data) | BIGipServerotn,route                                                         | _passport_ct,_passport_session,BIGipServerpool_passport | [captcha-image64响应](#captcha-image64_response) | 获取登录验证码         |
| https://kyfw.12306.cn/passport/web/create-qr64                | POST     | [create-qr64参数](#create-qr64_data)         | _passport_ct,_passport_session,BIGipServerotn,BIGipServerpool_passport,route |                                                         | [captcha-qr64参数](#captcha-qr64_response)       | 获取登录二维码         |
| https://kyfw.12306.cn/passport/web/checkqr                    | POST     | [checkqr参数](#checkqr_data)                 | _passport_session,BIGipServerotn,BIGipServerpool_passport,route              |                                                         | [checkqr响应](#checkqr_response)                 | 登录二维码状态查询     |

# conf

## conf_response

```json
{"validateMessagesShowId":"_validatorMessage","status":true,"httpstatus":200,"data":{"isstudentDate":false,"is_login_passCode":"Y","is_sweep_login":"Y","psr_qr_code_result":"N","login_url":"resources/login.html","studentDate":["2018-06-01","2018-09-30","2018-12-01","2018-12-31","2019-01-01","2019-03-31"],"stu_control":30,"is_uam_login":"Y","is_login":"N","hb_qr_code_result":"Y","other_control":30},"messages":[],"validateMessages":{}}
```

***

# getLoginBanner

## getLoginBanner_response

```json
{"validateMessagesShowId":"_validatorMessage","status":true,"httpstatus":200,"data":{"index_banner_url":[{"target":"1","src":"https://exservice.12306.cn/excater/index.html","url":"https://www.12306.cn/index/images/pic/banner-login.jpg"}]},"messages":[],"validateMessages":{}}
```

***

# uamtk-static

## uamtk-static_data

```json
{"appid":"otn"}
```
## uamtk-static_response

```json
{"result_message":"用户未登录","result_code":1}
```

***

# captcha-image64

## captcha-image64_data

```json
{"login_site":"E","module":"login","rand":"sjrand","1554022218442":"","callback":"jQuery19102222449325344409_1554022216586","_":"1554022216587"}
```

## captcha-image_response

```json
/**/jQuery19102222449325344409_1554022216586({"image":"/9j/4AAQSkZJRgABAgAAAQABAAD/...","result_message":"生成验证码成功","result_code":"0"});
```

***

# create-qr64

## create-qr64_data

```json
{"appid":"otn"}
```

## create-qr64_response

```json
{"result_message":"生成二维码成功","result_code":"0","image":"iVBORw0KGgoAAAANSUhEUgAAAMcAAADHCAIAAAAiZ9CRAAAHAElEQVR42u3aUW...","uuid":"tSC8UF6PjjJd2kVIRg-74e6cGNM0PbHvOCjS0wVI1BNivs9yToTURa_6Yfd8nP4S7P6-A2DefH8Aaf1"}
```

***

# checkqr

## checkqr_data

```json
{"uuid":"7IcAMecAK551AfP1dJAdiH_NbVKadF36QO7UZLzlZdOkKPzU42GBM-Ew-XkkmUKw_HO8D7FFSTcoub1","appid":"otn"}
```

## checkqr_response

```json
{"result_message":"二维码状态查询成功","result_code":"0"}
```

***