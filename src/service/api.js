const API_URL_SUFFIX = '/api'

const v1 = {
  POST_MEMBER_LOGIN: `${API_URL_SUFFIX}/member/login`, // 登录
  GET_MEMBER_MESSAGE: `${API_URL_SUFFIX}/member/getMemberMessage`, // 用户信息
  GET_FRANCHISEEMESSAGE: `${API_URL_SUFFIX}/franchisee/getFranchiseeMessage`, // 加盟商个人信息
  GET_LISTCLASSIFICATION: `${API_URL_SUFFIX}/common/classification/listClassification`, // 创建订单的选项
  POST_ADD_CART: `${API_URL_SUFFIX}/cart/addCart`, // 加入购物车
  GET_SEARCH_CART: `${API_URL_SUFFIX}/cart/searchCart`, // 查看购物车
  PUT_UPDATE_CART: `${API_URL_SUFFIX}/cart/updateCart`, // 修改购物车
  DELETE__CART: `${API_URL_SUFFIX}/cart/deleteCart`, // 删除购物车
  GET_LISTDISTRICTS: `${API_URL_SUFFIX}/districts/listDistricts`, // 地区列表
  GET_SCAN_RESULT_BY_PHONE: `${API_URL_SUFFIX}/data/getScanResultByPhone`, // 根据手机号获取数据
  GET_REGISTER_CODE: `${API_URL_SUFFIX}/member/getRegisterCode`, // 注册获取手机验证码
  GET_LOGIN_CODE: `${API_URL_SUFFIX}/member/getLoginCode`, // 获取手机登录验证码
  POST_REGISTER: `${API_URL_SUFFIX}/member/register`, // 个人注册
  GET_VERIFY: `${API_URL_SUFFIX}/member/getVerify`, // 随机码生成,
  POST_CHECK_PHONE: `${API_URL_SUFFIX}/member/checkPhone`, // 判断有没有注册过
  POST_PHONE_LOGIN: `${API_URL_SUFFIX}/member/phoneLogin`, // 手机快速登录
  GET_CART_NUM: `${API_URL_SUFFIX}/cart/getCartNum`, // 购物车数量
  POST_ADD_ORDER: `${API_URL_SUFFIX}/order/addOrder`, // 创建订单
  GET_CART_PRICE: `${API_URL_SUFFIX}/cart/getCartPrice`, // 获取购物车金额
  POST_WX_PAY: `${API_URL_SUFFIX}/wxPay/pay`, // 微信支付
  GET_CHECK_PAY: `${API_URL_SUFFIX}/order/checkPay`, // 微信是否有支付
  GET_SEARCH_ORDER: `${API_URL_SUFFIX}/order/searchOrder`, // 查询订单
  GET_ORDER_PRICE: `${API_URL_SUFFIX}/order/getOrderPrice`, // 查询订单金额
  POST_UPDATE_FORGET: `${API_URL_SUFFIX}/member/updateForget`, // 修改忘记密码
  GET_FORGET_CODE: `${API_URL_SUFFIX}/member/getForgetCode`, // 获取忘记密码手机验证码
  POST_UPDATE_PASSWORD: `${API_URL_SUFFIX}/member/updatePassword`, // 修改密码
  GET_SCAN: `${API_URL_SUFFIX}/data/getScan`, // 获取用户足行list
  GET_SCAN_DATA: `${API_URL_SUFFIX}/data/getScanData`, // 获取具体足行信息
  GET_LIST_VIDEO: `${API_URL_SUFFIX}/common/video/listVideo`, // 视频列表
  GET_ADDRESS: `${API_URL_SUFFIX}/address/list`, // 地址列表
  POST_ADDRESS_ADD: `${API_URL_SUFFIX}/address/add`, // 新增地址
  PUT_ADDRESS_UPDATE: `${API_URL_SUFFIX}/address/update`, // 修改地址
  DELETE_ADDRESS_DELETE: `${API_URL_SUFFIX}/address/delete` // 删除地址
}

export {
  v1
}