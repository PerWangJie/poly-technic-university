// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/js/rem'
import {
  post,
  fetch
} from './axios/axios'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import animate from 'animate.css'
import hasPermission from './assets/js/btnPermissions'
import glourl from './globel/globel.js'
Vue.use(ElementUI)
Vue.use(animate)
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$http = axios;
Vue.prototype.has = hasPermission;
Vue.prototype.$server = glourl;
/* eslint-disable no-new */
Vue.prototype.baseUrls = Vue.prototype.$server.glourl + "tutorApply/upload";
// Vue.prototype.baseUrls = Vue.prototype.$server.glourl + "xmfb/upload";
Vue.prototype.baseUrl1 = Vue.prototype.$server.glourl + "stuxscg/uploadFile";
Vue.prototype.baseUrl2 = Vue.prototype.$server.glourl + "stuzljs/uploadFile";
Vue.prototype.baseUrl3 = Vue.prototype.$server.glourl + "stukyxm/uploadFile";
Vue.prototype.baseUrl4 = Vue.prototype.$server.glourl + "stufbzz/uploadFile";
Vue.prototype.baseUrl5 = Vue.prototype.$server.glourl + "stusclw/TestPaper";
Vue.prototype.baseUrl6 = Vue.prototype.$server.glourl + "stuyxlw/uploadFile";
Vue.prototype.baseUrl7 = Vue.prototype.$server.glourl + "stuxwlw/upload";

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
