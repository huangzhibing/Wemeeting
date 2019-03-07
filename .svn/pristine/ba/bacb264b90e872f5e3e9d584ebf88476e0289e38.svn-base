import Vue from 'vue'
import App from './App.vue'
import router from './router'
import api from './utils/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueCookie from 'vue-cookie'
// Tell Vue to use the plugin
Vue.use(VueCookie);
Vue.use(Vant);
Vue.use(api);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


