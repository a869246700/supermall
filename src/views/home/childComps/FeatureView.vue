<template>
  <div class="feature">
    <a href="https://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" @load="imgLoad"/>
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  props: {},
  methods: {
    imgLoad() {
      this.$emit('featureImageLoad')
      
    }
  },
};
</script>

<style scoped>
.feature img {
  width: 100%;
}
</style>