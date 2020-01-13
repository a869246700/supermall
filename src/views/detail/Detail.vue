<template>
  <div id="detail">
    <detail-nav-bar />
    <Scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <detail-recommend-info :recommends="recommends" />
    </Scroll>
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

// 通用js文件
import {itemListenerMixin} from 'common/mixin'
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
    };
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
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
    DetailRecommendInfo
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

      // 7 推荐信息
    });

    //  3. 请求推荐数据
    getRecommend().then(res => {
      this.recommends.push(...res.data.data.list);
      console.log(this.recommends);
      
    });
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  mixins: [itemListenerMixin]
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
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>