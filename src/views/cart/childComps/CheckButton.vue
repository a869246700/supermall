<template>
  <div class="check-button" :class="{check: isCheck}" @click="handleCheckClick">
    <img src="~assets/img/cart/tick.svg" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isCheck: {
      type: Boolean,
      default: false
    }
  },
  methods: {
      handleCheckClick() {
          this.$emit("checkClick")
      }
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  background-color: red;
  border-color: red;
}
</style>