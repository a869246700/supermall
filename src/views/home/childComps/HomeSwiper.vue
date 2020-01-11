<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link"></a>
      <img :src="item.image" @load="ImageLoad" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    }
  },
  props: {
    banners: {
        type: Array,
        default() {
            return []
        }
    }
  },
  methods: {
    ImageLoad() {
      // 两种方法  
      // 第一种方法 在接收方法处添加.once 只调用一次 (虽然只监听了一次 但是还是发送4次请求)
      // 第二种方法 如下 为了让我们 HomeSwiper 多次发出事件  可以使用 isLoad 变量进行状态的记录
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
  components: { Swiper, SwiperItem }
};
</script>

<style>
</style>