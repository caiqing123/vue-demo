import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
//引入公共路径
import domain from './domain.js';
global.domain = domain;

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,Vuex,
    render: h => h(App)
}).$mount('#app');