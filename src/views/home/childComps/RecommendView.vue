<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad"/>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imgLoad() {
      if(!this.isLoad) {
        this.isLoad = true
        this.$emit('recommendViewImageLoad')
      }
    }
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  font-size: 12px;
  padding: 10px 0 15px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
}

.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 5px;
}
</style>