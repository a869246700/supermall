import Vue from 'vue'
import Vuex from 'vuex'

// 1. 安装插件
Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
const state = {
    cartList: []
}

// 2. 创建 Store 对象
const store = new Vuex.Store({
  state,
  /* mutations 尽可能完成的事件比较单一一点 */
  mutations,
  actions,
  getters
})
// 3. 挂载到 vue 实例上
export default store
