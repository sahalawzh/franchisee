/**
 */

// 引用axios
import axios from 'axios'
import Vue from 'vue'
import { MessageBox, Notification } from 'element-ui'
import storage from '@/utils/storage'

Vue.prototype.$axios = axios
axios.defaults.withCredentials = true
// 默认一分钟超时
axios.defaults.timeout = 60000
axios.defaults.baseURL =  process.env.VUE_APP_BASE_API
// axios.interceptors.push((request, next) => {
//   if (window.localStorage.getItem('token')) {
//     axios.defaults.headers.common['token'] = window.localStorage.getItem('gdlwzn_login')
//   }
//   next((response) => {
//     if (response.status === 401) {
//       del('token')
//       window.location.pathname = '/login'
//     }
//   })
// })

const handleAuthStatus = function (msg) {
  Notification({
    type: 'error',
    title: '温馨提示',
    message: msg,
    duration: 600,
    onClose () {
      storage.remove('gdlwzn_login')
      window.location.href = 'index.html'
    }
  })
}

axios.interceptors.request.use(function (config) {
  if (storage.get('gdlwzn_login')) {
    config.headers.common['token'] = storage.get('gdlwzn_login').token
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
axios.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) {
    handleAuthStatus(response.data.msg)
  } else {
    return response
  }
}, function (error) {
  return Promise.resolve(error.response)
})


const checkStatus = function (response) {
  if (response) {
    if (response.status === 200 || response.status === 304) {
      if (response.data.code === 0) {
        return response.data
      } else {
        if (response.headers['content-type'] === 'image/jpeg') {
          return {
            code: 0,
            url: response.request.responseURL
          }
        } else {
          return {
            code: -404,
            url: response.config.url,
            ...response.data
          }
        }
      }
    }
    return {
      code: -404,
      status: response.status,
      msg: response.msg,
      url: response.url
    }
  } else {
    return {
      code: -404
    }
  }
}

const checkCode = function (res) {
  // 错误处理
  if (res.code === 0 || res.code === 200) {
    return res
  } else {
    return handleErrorStatus(res)
  }
}


const handleErrorStatus = function (res) {
  const {status, msg, url} = res
  let message = msg
  switch (status) {
    case 401:
      message = `请重新登录`
      break
    case 404:
      message = process.env.NODE_ENV === 'development' ? `接口${url}未找到` : '请联系管理员确认是否存在相关页面'
      break
    case 500:
    case 504:
      message = process.env.NODE_ENV === 'development' ? `服务器发生内部错误` : '请刷新页面后重试'
      break
  }
  if (message) {
    if (status === 401) {
      handleAuthStatus(message)
    } else {
      res.$msgbox = MessageBox({
        type: 'error',
        title: '温馨提示',
        message: message
      })
    }
  }
  return Promise.reject(res)
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, data) {
    let _config = Object.assign({}, {params: data, url, method: 'get'})
    return axios(_config).then(checkStatus).then(checkCode)
  },
  post (url, data) {
    let _config = Object.assign({}, {data: data, url, method: 'post'})
    return axios(_config).then(checkStatus).then(checkCode)
  },
  put: function (url, data) {
    let _config = Object.assign({}, {data: data, url, method: 'put'})
    return axios(_config).then(checkStatus).then(checkCode)
  },
  delete: function (url, data) {
    url = url + '/' + data
    let _config = Object.assign({}, {url, method: 'delete'})
    return axios(_config).then(checkStatus).then(checkCode)
  }
}
