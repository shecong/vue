import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index.js'
import store from './store/index'
import './api/mock'
 
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(store);

const app = new Vue({})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
