<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  },
  mounted() {
    // 1. 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    });

    // 2. 监听滚动的位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });

    //3. 监听上啦事件
    this.scroll.on("pullingUp", () => {
      this.$emit('pullingUp')
      // setTimeout(() => {
      //   this.scroll.finishPullUp();
      // }, 2000);
    });
  }
};
</script>

<style>
</style>