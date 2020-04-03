import * as apiConfig from "./api";
import ajax from "./index";

/*
 * 用户登录
 */
const postMemberLogin = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_MEMBER_LOGIN) ||
    apiConfig["v1"].POST_MEMBER_LOGIN;
  return ajax.post(url, data);
};

/*
 * 用户信息
 */
const getMemberMessage = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_MEMBER_MESSAGE) ||
    apiConfig["v1"].GET_MEMBER_MESSAGE;
  return ajax.get(url, data);
};

/*
 * 加盟商个人信息
 */
const getFranchiseeMessage = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_FRANCHISEEMESSAGE) ||
    apiConfig["v1"].GET_FRANCHISEEMESSAGE;
  return ajax.get(url, data);
};

/*
 * 创建订单的选项
 */
const getListclassiFication = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LISTCLASSIFICATION) ||
    apiConfig["v1"].GET_LISTCLASSIFICATION;
  return ajax.get(url, data);
};

/*
 * 加入购物车
 */
const postAddCart = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_ADD_CART) ||
    apiConfig["v1"].POST_ADD_CART;
  return ajax.post(url, data);
};

/*
 * 查看购物车
 */
const getSearchCart = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_SEARCH_CART) ||
    apiConfig["v1"].GET_SEARCH_CART;
  return ajax.get(url, data);
};

/*
 * 修改购物车
 */
const putUpdateCart = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].PUT_UPDATE_CART) ||
    apiConfig["v1"].PUT_UPDATE_CART;
  return ajax.get(url, data);
};

/*
 * 删除购物车
 */
const deleteCart = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].DELETE__CART) ||
    apiConfig["v1"].DELETE__CART;
  return ajax.delete(url, data);
};

/*
 * 地区列表
 */
const getListDstricts = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LISTDISTRICTS) ||
    apiConfig["v1"].GET_LISTDISTRICTS;
  return ajax.get(url, data);
};

/*
 * 扫描数据
 */
const getScanResultByPhone = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_SCAN_RESULT_BY_PHONE) ||
    apiConfig["v1"].GET_SCAN_RESULT_BY_PHONE;
  return ajax.get(url, data);
};

/*
 * 注册获取手机验证码
 */
const getRegisterCode = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_REGISTER_CODE) ||
    apiConfig["v1"].GET_REGISTER_CODE;
  return ajax.get(url, data);
};

/*
 * 个人注册
 */
const postRegister = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_REGISTER) ||
    apiConfig["v1"].POST_REGISTER;
  return ajax.post(url, data);
};

/*
 * 随机码生成
 */
const getVerify = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_VERIFY) ||
    apiConfig["v1"].GET_VERIFY;
  return ajax.get(url, data);
};

/*
 * 判断有没有注册过
 */
const postCheckPhone = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_CHECK_PHONE) ||
    apiConfig["v1"].POST_CHECK_PHONE;
  return ajax.get(url, data);
};

/*
 * 判断有没有注册过
 */
const postPhoneLogin = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_PHONE_LOGIN) ||
    apiConfig["v1"].POST_PHONE_LOGIN;
  return ajax.post(url, data);
};

/*
 * 购物车数量
 */
const getCartNum = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_CART_NUM) ||
    apiConfig["v1"].GET_CART_NUM;
  return ajax.get(url, data);
};

/*
 * 创建订单
 */
const postAddOrder = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_ADD_ORDER) ||
    apiConfig["v1"].POST_ADD_ORDER;
  return ajax.post(url, data);
};

/*
 * 获取购物车金额
 */
const getCartPrice = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_CART_PRICE) ||
    apiConfig["v1"].GET_CART_PRICE;
  return ajax.get(url, data);
};

/*
 * 获取手机登录验证码
 */
const getLoginCode = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LOGIN_CODE) ||
    apiConfig["v1"].GET_LOGIN_CODE;
  return ajax.get(url, data);
};

/*
 * 微信支付
 */
const postWxPay = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_WX_PAY) ||
    apiConfig["v1"].POST_WX_PAY;
  return ajax.post(url, data);
};

/*
 * 是否支付
 */
const postCheckPay = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_CHECK_PAY) ||
    apiConfig["v1"].GET_CHECK_PAY;
  return ajax.get(url, data);
};

/*
 * 查询订单
 */
const getSearchOrder = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_SEARCH_ORDER) ||
    apiConfig["v1"].GET_SEARCH_ORDER;
  return ajax.get(url, data);
};

/*
 * 查询订单金额
 */
const getOrderPrice = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_ORDER_PRICE) ||
    apiConfig["v1"].GET_ORDER_PRICE;
  return ajax.get(url, data);
};

/*
 * 修改忘记密码
 */
const updateForget = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_UPDATE_FORGET) ||
    apiConfig["v1"].POST_UPDATE_FORGET;
  return ajax.post(url, data);
};

/*
 * 获取忘记密码手机验证码
 */
const getForgetCode = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_FORGET_CODE) ||
    apiConfig["v1"].GET_FORGET_CODE;
  return ajax.get(url, data);
};

/*
 * 修改密码
 */
const postUpdatePassword = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_UPDATE_PASSWORD) ||
    apiConfig["v1"].POST_UPDATE_PASSWORD;
  return ajax.post(url, data);
};

/*
 * 获取用户足行list
 */
const getScan = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_SCAN) ||
    apiConfig["v1"].GET_SCAN;
  return ajax.get(url, data);
};

/*
 * 获取具体足行信息
 */
const getScanData = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_SCAN_DATA) ||
    apiConfig["v1"].GET_SCAN_DATA;
  return ajax.get(url, data);
};

/*
 * 视频列表
 */
const getListVideo = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LIST_VIDEO) ||
    apiConfig["v1"].GET_LIST_VIDEO;
  return ajax.get(url, data);
};

/*
 * 地址列表
 */
const getAddress = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_ADDRESS) ||
    apiConfig["v1"].GET_ADDRESS;
  return ajax.get(url, data);
};

/*
 * 新增地址
 */
const postAddressAdd = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_ADDRESS_ADD) ||
    apiConfig["v1"].POST_ADDRESS_ADD;
  return ajax.post(url, data);
};

/*
 * 修改地址
 */
const putAddressUpdate = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].PUT_ADDRESS_UPDATE) ||
    apiConfig["v1"].PUT_ADDRESS_UPDATE;
  return ajax.put(url, data);
};

/*
 * 删除地址
 */
const deleteAddressDelete = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].DELETE_ADDRESS_DELETE) ||
    apiConfig["v1"].DELETE_ADDRESS_DELETE;
  return ajax.delete(url, data);
};

/*
 * 图片上传
 */
const postUploadImage = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_UPLOAD_IMAGE) ||
    apiConfig["v1"].POST_UPLOAD_IMAGE;
  return ajax.post(url, data);
};

/*
 * 查看加盟商
 */
const getSearchFranchisee = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_SEARCH_FRANCHISEE) ||
    apiConfig["v1"].GET_SEARCH_FRANCHISEE;
  return ajax.get(url, data);
};

/*
 * 创建加盟商
 */
const postAddFranchisee = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_ADD_FRANCHISEE) ||
    apiConfig["v1"].POST_ADD_FRANCHISEE;
  return ajax.post(url, data);
};

/*
 * 绑定银行卡申请
 */
const postBindBankCard = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_BIND_BANKCARD) ||
    apiConfig["v1"].POST_BIND_BANKCARD;
  return ajax.post(url, data);
};

/*
 * 下载文件
 */
const getDownLoadFile = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_DOWN__LOAD_FILE) ||
    apiConfig["v1"].GET_DOWN__LOAD_FILE;
  return ajax.get(url, data);
};

/*
 * 加盟费用
 */
const postFranchiseePay = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_FRANCHISEE_PAY) ||
    apiConfig["v1"].POST_FRANCHISEE_PAY;
  return ajax.post(url, data);
};

/*
 * 检查是否支付
 */
const getFranchiseeCheckPay = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_FRANCHISEE_CHECK_PAY) ||
    apiConfig["v1"].GET_FRANCHISEE_CHECK_PAY;
  return ajax.get(url, data);
};

/*
 * 校验账号
 */
const postCheckPriceBankCard = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_CHECK_PRICE_BANKCARD) ||
    apiConfig["v1"].POST_CHECK_PRICE_BANKCARD;
  return ajax.post(url, data);
};

/*
 * 解绑银行卡
 */
const postUnBindBankCard = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_UNBIND_BANK_CARD) ||
    apiConfig["v1"].POST_UNBIND_BANK_CARD;
  return ajax.post(url, data);
};

/*
 * 编辑加盟信息
 */
const putUpdateFranchisee = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].PUT_UPDATE_FRANCHISEE) ||
    apiConfig["v1"].PUT_UPDATE_FRANCHISEE;
  return ajax.put(url, data);
};

/*
 * 加盟服务修改地址
 */
const putUpdate = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].PUT_UPDATE) ||
    apiConfig["v1"].PUT_UPDATE;
  return ajax.put(url, data);
};

/*
 * 商品信息
 */
const getSpu = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_SPU) ||
    apiConfig["v1"].GET_SPU;
  return ajax.get(url, data);
};

/*
 * 修改数量
 */
const putUpdateNum = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].PUT_UPDATE_NUM) ||
    apiConfig["v1"].PUT_UPDATE_NUM;
  return ajax.put(url, data);
};

/*
 * 城市列表
 */
const getListCity = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LIST_CITY) ||
    apiConfig["v1"].GET_LIST_CITY;
  return ajax.get(url, data);
};

/*
 * 获取当前位置
 */
const getLocalLocation = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LOCAL_LOCATION) ||
    apiConfig["v1"].GET_LOCAL_LOCATION;
  return ajax.get(url, data);
};

/*
 * 获取扫描位置
 */
const getListLocation = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LIST_LOCATION) ||
    apiConfig["v1"].GET_LIST_LOCATION;
  return ajax.get(url, data);
};

/*
 * 获取扫描地址
 */
const getLocations = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LOCATIONS) ||
    apiConfig["v1"].GET_LOCATIONS;
  return ajax.get(url, data);
};

/*
 * 获取购物车
 */
const getCart = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_CART) ||
    apiConfig["v1"].GET_CART;
  return ajax.get(url, data);
};

/*
 * 物流信息
 */
const getLogisticsMessage = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_LOGISTICS_MESSAGE) ||
    apiConfig["v1"].GET_LOGISTICS_MESSAGE;
  return ajax.get(url, data);
};

/*
 * 花呗列表
 */
const getAlipayListHb = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].GET_ALIPAY_LISTHB) ||
    apiConfig["v1"].GET_ALIPAY_LISTHB;
  return ajax.get(url, data);
};

/*
 * 支付宝支付
 */
const postAliPayPay = (data, version = "v1") => {
  let url =
    (apiConfig[version] && apiConfig[version].POST_ALIPAY_PAY) ||
    apiConfig["v1"].POST_ALIPAY_PAY;
  return ajax.post(url, data);
};

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
  getScanData,
  getListVideo,
  getAddress,
  postAddressAdd,
  putAddressUpdate,
  deleteAddressDelete,
  postUploadImage,
  getSearchFranchisee,
  postAddFranchisee,
  postBindBankCard,
  getDownLoadFile,
  postFranchiseePay,
  getFranchiseeCheckPay,
  postCheckPriceBankCard,
  postUnBindBankCard,
  putUpdateFranchisee,
  putUpdate,
  getSpu,
  putUpdateNum,
  getListCity,
  getLocalLocation,
  getListLocation,
  getLocations,
  getCart,
  getLogisticsMessage,
  getAlipayListHb,
  postAliPayPay
};
