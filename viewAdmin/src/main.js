// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import Config from "./config/config.js";
import router from './router'
import Axios from './axios/axios.js'


// 页面进度条 简单配置
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })


router.beforeEach((to, from, next) => {
  if (to.path != "/login" && from.path != "/login") {
    NProgress.start();//进度条开始
  }

  // 判断是否登录
  if (to.path == "/login" || to.path == "/404") {
    next();
  } else {
    var isLogin = sessionStorage.getItem('isLogin');
    if (isLogin != 'true') {
      next("/login")
    } else {
      next();
    }
  }
})

Vue.use(ElementUI);

Vue.prototype.$http = Axios;
Vue.prototype.$server = Config.server + "/";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
