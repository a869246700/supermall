import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  //   加入购物车
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  },
  //  数量+1
  [ADD_COUNTER](state, payload) {
    payload.count++
  }
}