import './assets/css/normalize.css'
import './assets/sass/base.scss'
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from './http'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.axios = axios
Vue.use(VueLazyload)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')