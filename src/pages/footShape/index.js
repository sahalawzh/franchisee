import Vue from 'vue'
import App from './app'
import ElementUI from 'element-ui'
import router from './router';
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/common.less'


Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
