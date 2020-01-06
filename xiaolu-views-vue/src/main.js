import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import '@/assets/service/permission.js'


import '@/assets/style/index.less'
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'



Vue.use(Antd);
Vue.config.productionTip = false
Vue.prototype.$mainUrl = process.env.NODE_ENV === "production" ? "/api" : "/api"
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
