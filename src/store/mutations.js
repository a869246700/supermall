import {ADD_COUNTER, ADD_TO_CART} from './mutation-types'

export default {
  //   加入购物车
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
    console.log('首次加入');
  },
  //  数量+1
  [ADD_COUNTER](state, payload) {
    payload.count++
    console.log('再次加入');
  }
}