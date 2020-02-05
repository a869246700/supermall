import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 注册一个事件总线 bus
Vue.prototype.$bus = new Vue()

// 安装 toast 插件
Vue.use(toast)

// 解决移动端 300毫秒延迟问题
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

