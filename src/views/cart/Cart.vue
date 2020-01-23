<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-nav">
      <template #center>购物车{{'(' + length + ')'}}</template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-botton-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottonBar from './childComps/CartBottonBar'
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,

    CartList,
    CartBottonBar
  },
  computed: {
    // 两种语法
    // 第一种
    // ...mapGetters(['cartLength', 'cartList'])
    // 第二种
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>