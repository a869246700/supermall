<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>

    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" class="tab-control" @tabClick="tabClick" />
      <goods-list :goods="showGoods" />
    </Scroll>

    <back-top @click.native="handleBackClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecoommendView";
import FeatureView from "./childComps/FeatureView";
// 数据
import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      titles: ["流行", "新款", "精选"],
      isBackTopShow: false
    };
  },
  created() {
    // 初始加载
    this.init();
  },
  methods: {
    loadMore() {
      this.getHomeProducts(this.currentType)
    },
    contentScroll(position) {
      this.isBackTopShow = -position.y > 1000;
    },
    handleBackClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },

    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    /**
     * 网路请求的相关方法
     */
    init() {
      // 1. 请求多个数据
      this.getMultiData();
      // 2. 请求商品时数据
      this.getHomeProducts("pop");
      this.getHomeProducts("new");
      this.getHomeProducts("sell");
    },
    getMultiData() {
      // getHomeMultidata() 调用数据访问方法
      getHomeMultidata().then(
        res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        },
        err => {
          window.alert("报错");
        }
      );
    },
    getHomeProducts(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(
        res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page++;
          // 加载更多
          this.$refs.scroll.finishPullUp()
        },
        err => {
          window.alert("请求错误");
        }
      );
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  }
};
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  /* vh 是视口高度  viewportheight*/
  height: 100vh;
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
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
}

.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>