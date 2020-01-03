<template>
  <div class="tab-bar-item" @click="handleItemClick">

    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path)
      // return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ?  {color: this.activeColor} : {}
    }
  },
  methods: {
    handleItemClick() {
      if (this.$route.path !== this.path) {
        // 改变路由
        this.$router.replace(this.path);
      }
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  font-size: 14px;
}
.tab-bar-item:hover {
  background-color: #ddd;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}

.active {
  color: red;
}
</style>