<template>
  <div class="cart">
    <nav-bar class="nav-nav">
      <template #center>购物车{{'(' + cartNumber + ')'}}</template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Cart",
  components: {
    NavBar
  },
  computed: {
      cartNumber() {
          return this.$store.state.cartList.length
      }
  }
};
</script>

<style scoped>
.nav-nav {
    background-color: var(--color-tint);
    color: #fff;
}
</style>