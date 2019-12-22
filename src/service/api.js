const API_URL_SUFFIX = '/api'

const v1 = {
  POST_MEMBER_LOGIN: `${API_URL_SUFFIX}/member/login`, // 登录
  GET_MEMBER_MESSAGE: `${API_URL_SUFFIX}/member/getMemberMessage`, // 用户信息
  GET_FRANCHISEEMESSAGE: `${API_URL_SUFFIX}/franchisee/getFranchiseeMessage`, // 加盟商个人信息
  GET_LISTCLASSIFICATION: `${API_URL_SUFFIX}/common/classification/listclassification`, // 创建订单的选项
  POST_ADD_CART: `${API_URL_SUFFIX}/cart/addCart`, // 加入购物车
  GET_SEARCH_CART: `${API_URL_SUFFIX}/cart/searchCart`, // 查看购物车
  PUT_UPDATE_CART: `${API_URL_SUFFIX}/cart/updateCart`, // 修改购物车
  DELETE__CART: `${API_URL_SUFFIX}/cart/deleteCart`, // 删除购物车
  GET_LISTDISTRICTS: `${API_URL_SUFFIX}/districts/listDistricts`, // 地区列表
  GET_SCAN_RESULT_BY_PHONE: `${API_URL_SUFFIX}/data/getScanResultByPhone`, // 根据手机号获取数据
  GET_REGISTER_CODE: `${API_URL_SUFFIX}/member/getRegisterCode`, // 注册获取手机验证码
  POST_REGISTER: `${API_URL_SUFFIX}/member/register`, // 个人注册
  GET_VERIFY: `${API_URL_SUFFIX}/member/getVerify`, // 随机码生成,
  POST_CHECK_PHONE: `${API_URL_SUFFIX}/member/checkPhone`, // 判断有没有注册过
  POST_PHONE_LOGIN: `${API_URL_SUFFIX}/member/phoneLogin` // 手机快速登录
}

export {
  v1
}