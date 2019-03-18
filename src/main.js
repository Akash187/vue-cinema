import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './filters'
import './registerServiceWorker'

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
