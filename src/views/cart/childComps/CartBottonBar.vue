<template>
  <div class="botton-bar">
    <div class="check-content">
      <check-button class="check-button" :is-check="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="total-price">合计: {{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算 ({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";
export default {
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;

      // return this.cartList.every(item => item.checked)

      return this.cartList && !this.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      /*
       *   如果原来都是选中的，点击一次，全部不选择
       *   如果原来都是不选择（某些不选中）， 全部选中
       */

      if (this.isSelectAll) {
        //   全部选中的情况
        this.cartList.forEach(item => item.checked = false)
      } else {
        //   全部未选中 或者 部分未选中
        this.cartList.forEach(item => item.checked = true)
      }

    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 1000)
      }
    }
  }
};
</script>

<style scoped>
.botton-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;

  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 60px;
}
.check-button {
  height: 20px;
  width: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
}
</style>