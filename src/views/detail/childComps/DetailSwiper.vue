<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topImages" :key="index" class="swiper-item">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.swiper-item,
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>