import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 注册一个事件总线 bus
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
