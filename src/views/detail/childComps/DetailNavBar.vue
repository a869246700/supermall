<template>
  <div>
    <nav-bar>
        <template #left>
            <div class="back" @click="handleBackClick">
                <img src="~assets/img/common/back.svg">
            </div>
        </template>
      <template #center>
        <div class="title">
          <div
            v-for="(item, index) in titles"
            :key="index"
            class="title-item"
            :class="{active: index === currentIndex}"
            @click="handleItemClick(index)"
          >{{ item }}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    handleItemClick(index) {
        this.currentIndex = index
    },
    handleBackClick() {
        // 相对于back
        this.$router.back()
    }
  },
  components: { NavBar }
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}
.back img{
    vertical-align: middle;
}
</style>