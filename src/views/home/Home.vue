<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"/>
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
// 通用js文件
import { debounce } from "common/utils";
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
      isBackTopShow: false,
      tabOffsetTop: 0, //tabControl 离顶高度
      isTabFixed: false //tabcontrol 是否吸顶
    };
  },
  created() {
    // 初始加载
    this.init();
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
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
      // 同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index
    },
    // 返回顶部
    handleBackClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 监听 better-scroll 滚动事件
    contentScroll(position) {
      // 1. 判断 backTop 是否显示
      this.isBackTopShow = -position.y > 1000;
      // 2. 决定 tab-control 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 商品图片加载
    loadMore() {
      this.getHomeProducts(this.currentType);
    },
    // 轮播图片加载
    swiperImageLoad() {
      // 给 tabOffsetTop 赋值
      // 所有的组件都有一个属性 $el 获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

    /*数据请求 */
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

    /* 将网络请求获取的数据 装进 goods 数组中 */
    getHomeProducts(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(
        res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page++;

          // 完成下拉加载更多 调用 inishPullUp 方法
          this.$refs.scroll.finishPullUp();
        },
        err => {
          window.alert("请求错误");
        }
      );
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //3. 监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
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
  /* vh 是视口高度  viewportheight*/
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器元素滚动时， 为了让导航不跟随一起滚动 */
  /* position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>