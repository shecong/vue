import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index.js'
import store from './store/index'
import './api/mock'  
import GoEasy from 'goeasy'; 


Vue.config.productionTip = false;

Vue.prototype.globalData = {
    currentUser: null
};

Vue.use(ElementUI);
Vue.use(store);

const app = new Vue({})



new Vue({
  router,
  store,
  render: h => h(App), 
}).$mount('#app')




///im通讯
const goEasyIM = GoEasy.getInstance({
  host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
  appkey: 'BC-31498816867c4859b5b652aa58a43b44', // common key,
  modules: ['im','pubsub'],
});
    
Vue.prototype.GoEasy = GoEasy;
Vue.prototype.goEasyIM = goEasyIM; 