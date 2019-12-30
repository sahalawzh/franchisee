import * as apiConfig from './api'
import ajax from './index'

/*
* 用户登录
*/
const postMemberLogin = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_MEMBER_LOGIN || apiConfig['v1'].POST_MEMBER_LOGIN
  return ajax.post(url, data)
}

/*
* 用户信息
*/
const getMemberMessage = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_MEMBER_MESSAGE || apiConfig['v1'].GET_MEMBER_MESSAGE
  return ajax.get(url, data)
}

/*
* 加盟商个人信息
*/
const getFranchiseeMessage = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_FRANCHISEEMESSAGE || apiConfig['v1'].GET_FRANCHISEEMESSAGE
  return ajax.get(url, data)
}

/*
* 创建订单的选项
*/
const getListclassiFication = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_LISTCLASSIFICATION || apiConfig['v1'].GET_LISTCLASSIFICATION
  return ajax.get(url, data)
}

/*
* 加入购物车
*/
const postAddCart = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_ADD_CART || apiConfig['v1'].POST_ADD_CART
  return ajax.post(url, data)
}

/*
* 查看购物车
*/
const getSearchCart = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_SEARCH_CART || apiConfig['v1'].GET_SEARCH_CART
  return ajax.get(url, data)
}

/*
* 修改购物车
*/
const putUpdateCart = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].PUT_UPDATE_CART || apiConfig['v1'].PUT_UPDATE_CART
  return ajax.get(url, data)
}

/*
* 删除购物车
*/
const deleteCart = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].DELETE__CART || apiConfig['v1'].DELETE__CART
  return ajax.delete(url, data)
}

/*
* 地区列表
*/
const getListDstricts = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_LISTDISTRICTS || apiConfig['v1'].GET_LISTDISTRICTS
  return ajax.get(url, data)
}

/*
* 扫描数据
*/
const getScanResultByPhone = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_SCAN_RESULT_BY_PHONE || apiConfig['v1'].GET_SCAN_RESULT_BY_PHONE
  return ajax.get(url, data)
}

/*
* 注册获取手机验证码
*/
const getRegisterCode = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_REGISTER_CODE || apiConfig['v1'].GET_REGISTER_CODE
  return ajax.get(url, data)
}

/*
* 个人注册
*/
const postRegister = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_REGISTER || apiConfig['v1'].POST_REGISTER
  return ajax.post(url, data)
}

/*
* 随机码生成
*/
const getVerify = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_VERIFY || apiConfig['v1'].GET_VERIFY
  return ajax.get(url, data)
}

/*
* 判断有没有注册过
*/
const postCheckPhone = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_CHECK_PHONE || apiConfig['v1'].POST_CHECK_PHONE
  return ajax.get(url, data)
}

/*
* 判断有没有注册过
*/
const postPhoneLogin = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_PHONE_LOGIN || apiConfig['v1'].POST_PHONE_LOGIN
  return ajax.post(url, data)
}

/*
* 购物车数量
*/
const getCartNum = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_CART_NUM || apiConfig['v1'].GET_CART_NUM
  return ajax.get(url, data)
}

/*
* 创建订单
*/
const postAddOrder = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_ADD_ORDER || apiConfig['v1'].POST_ADD_ORDER
  return ajax.post(url, data)
}

/*
* 获取购物车金额
*/
const getCartPrice = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_CART_PRICE || apiConfig['v1'].GET_CART_PRICE
  return ajax.get(url, data)
}

/*
* 获取手机登录验证码
*/
const getLoginCode = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_LOGIN_CODE || apiConfig['v1'].GET_LOGIN_CODE
  return ajax.get(url, data)
}

/*
* 微信支付
*/
const postWxPay = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_WX_PAY || apiConfig['v1'].POST_WX_PAY
  return ajax.post(url, data)
}

/*
* 是否支付
*/
const postCheckPay = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_CHECK_PAY || apiConfig['v1'].GET_CHECK_PAY
  return ajax.get(url, data)
}

/*
* 查询订单
*/
const getSearchOrder = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_SEARCH_ORDER || apiConfig['v1'].GET_SEARCH_ORDER
  return ajax.get(url, data)
}

/*
* 查询订单金额
*/
const getOrderPrice = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_ORDER_PRICE || apiConfig['v1'].GET_ORDER_PRICE
  return ajax.get(url, data)
}

/*
* 修改忘记密码
*/
const updateForget = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_UPDATE_FORGET || apiConfig['v1'].POST_UPDATE_FORGET
  return ajax.post(url, data)
}

/*
* 获取忘记密码手机验证码
*/
const getForgetCode = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_FORGET_CODE || apiConfig['v1'].GET_FORGET_CODE
  return ajax.get(url, data)
}

/*
* 修改密码
*/
const postUpdatePassword = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].POST_UPDATE_PASSWORD || apiConfig['v1'].POST_UPDATE_PASSWORD
  return ajax.post(url, data)
}

/*
* 获取用户足行list
*/
const getScan = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_SCAN || apiConfig['v1'].GET_SCAN
  return ajax.get(url, data)
}

/*
* 获取具体足行信息
*/
const getScanData = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_SCAN_DATA || apiConfig['v1'].GET_SCAN_DATA
  return ajax.get(url, data)
}

export {
  postMemberLogin,
  getMemberMessage,
  getFranchiseeMessage,
  getListclassiFication,
  postAddCart,
  getSearchCart,
  putUpdateCart,
  deleteCart,
  getListDstricts,
  getScanResultByPhone,
  getRegisterCode,
  postRegister,
  getVerify,
  postCheckPhone,
  postPhoneLogin,
  getCartNum,
  postAddOrder,
  getCartPrice,
  getLoginCode,
  postWxPay,
  postCheckPay,
  getSearchOrder,
  getOrderPrice,
  updateForget,
  getForgetCode,
  postUpdatePassword,
  getScan,
  getScanData
}