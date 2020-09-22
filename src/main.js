import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import VueClipboard from 'vue-clipboard2'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/css/main.scss'

import http from './plugins/axios'

import ScrollAnimation from './directives/scrollanimation'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

Vue.directive('scrollanimation', ScrollAnimation)

Vue.config.productionTip = false
Vue.prototype.$axios = http

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
