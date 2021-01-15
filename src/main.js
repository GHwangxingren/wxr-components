import Vue from "vue";

import App from "./App.vue";
import router from "./router/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/less/index.less";
import hxeComponents from "./packages";

Vue.config.productionTip = false;

// 完整引入
Vue.use(ElementUI);
Vue.use(hxeComponents);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
