import Vue from "vue";
import App from "./app";
import ElementUI from "element-ui";
import router from "./router";
import "element-ui/lib/theme-chalk/index.css";
import BaiduMap from "vue-baidu-map";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(BaiduMap, {
  ak: "23ioBYIxoFA6MEPREPCzXWwqMdK5MDkS"
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#nearby");
