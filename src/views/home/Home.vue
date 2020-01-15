<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="calcOffsetTtop" />
      <recommend-view :recommends="recommends" @recommendViewImageLoad="calcOffsetTtop" />
      <feature-view @featureImageLoad="calcOffsetTtop" />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </Scroll>

    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
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
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
// 数据
import { getHomeMultidata, getHomeGoods } from "network/home";
// 通用js文件
import { itemListenerMixin, backTopMixin } from "common/mixin";
export default {
  name: "Home",
  mixins: [itemListenerMixin, backTopMixin],
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
      tabOffsetTop: 0, //tabControl 离顶高度
      isTabFixed: false, //tabcontrol 是否吸顶
      saveY: 0, //离开当前路由时的 y值
      LoadNum: 0 //加载次数
    };
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
      this.$refs.tabControl2.currentIndex = index;
    },
    // 监听 better-scroll 滚动事件
    contentScroll(position) {
      // 1. 判断 backTop 是否显示
      this.showBackTop(position, this.tabOffsetTop);
      // 2. 决定 tab-control 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 商品图片加载
    loadMore() {
      this.getHomeProducts(this.currentType);
    },
    // 监听 swiper recommendview feature 三个图片加载完成 再去计算 nav 的 offsettop 属性
    calcOffsetTtop() {
      // 给 tabOffsetTop 赋值
      // 所有的组件都有一个属性 $el 获取组件中的元素
      if (this.LoadNum === 2) {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
      this.LoadNum++;
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
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 初始加载
    this.init();
  },
  destroyed() {
    console.log("Home destroy");
  },
  /* 
    activated  deactivated 这两个钩子函数 只在 keep-alive 才有效
  */
  activated() {
    // 进入当前组件
    this.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 300);
    // 重新刷新  防止回到页面顶部
    
  },
  deactivated() {
    // 离开当前组件
    // 1. 保存 Y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 2. 取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
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