import Vue from 'vue'
import App from './app'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/common.less'


Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: h => h(App)
}).$mount('#business')
