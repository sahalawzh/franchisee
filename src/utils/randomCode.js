// 生成随机数
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

export default function drawPic ($canvas) {
  var _str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' //设置随机数库
  var _picTxt = '' // 随机数
  var _num = 4 // 4个随机数字
  
  for (var i = 0; i < _num; i++) {
    var txt = _str[randomNum(0, _str.length)]
    _picTxt += txt // 获取一个随机数
  }
  
  return _picTxt//返回随机数字符串
}
