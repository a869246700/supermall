<template>
  <div id="app">
    <!-- 使用 keep-alive 保证路由切换的时候不被销毁 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>

    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";

export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
