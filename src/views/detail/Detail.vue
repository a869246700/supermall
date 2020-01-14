<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="detailScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" ref="goodsinfo"/>
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <detail-recommend-info :recommends="recommends" ref="recommend" />
    </Scroll>
    <detail-botton-bar />
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

// 子组件
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottonBar from './childComps/DetailBottonBar'
// 通用js文件
import { itemListenerMixin, backTopMixin } from "common/mixin";
// 请求
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [], //轮播图照片
      goods: {}, //商品概要信息
      shop: {}, //商家信息
      detailInfo: {}, //  商品详细信息
      paramInfo: {}, //参数信息
      commentInfo: {}, //评论信息
      recommends: [], //推荐信息
      themeTopYs: [],
      currentIndex: 0
    };
  },
  methods: {
    imageLoad() {
      this.refresh();
      this.initHeight();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 40, 200);
    },
    initHeight() {
      // 定义高度
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 添加一个占位
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    detailScroll(position) {
      const positionY = -position.y + 44;
      /* 
        对比
        [0, 8888] -> 0
        [8888, 9999] -> 1
        [9999, 11111] -> 2
        [11111, 18888] -> 3 
      */
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 判断是否显示 backTop
      this.showBackTop(position, this.$refs.goodsinfo.$el.offsetTop)
    }
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottonBar
  },
  created() {
    //  1. 保存传入的 iid
    this.iid = this.$route.query.id;
    //  2. 根据 iid 请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.data.result;
      // 1 获取顶部轮播图图片
      this.topImages = data.itemInfo.topImages;

      // 2 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 4 商品详细信息
      this.detailInfo = data.detailInfo;

      // 5 商品获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    //  3. 请求推荐数据
    getRecommend().then(res => {
      this.recommends.push(...res.data.data.list);
    });
  },
  updated() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  mixins: [itemListenerMixin, backTopMixin]
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>