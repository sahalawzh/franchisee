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

// /*
// * 购物车数量
// */
const getCartNum = (data, version = 'v1') => {
  let url = apiConfig[version] && apiConfig[version].GET_CART_NUM || apiConfig['v1'].GET_CART_NUM
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
  getCartNum
}