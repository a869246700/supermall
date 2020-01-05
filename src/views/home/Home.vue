<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>
    
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { getHomeMultidata } from "network/home";
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecoommendView'
import FeatureView from './childComps/FeatureView'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  created() {
    // 1. 请求多个数据
    getHomeMultidata().then(
      res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      },
      err => {
        window.alert("报错");
      }
    );
  }
};
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
}
</style>