<template>
  <div class="goodsItem" @click="handleItemClick">
    <img v-lazy="showImage" @load="imageLoad" />
    <div class="goodsItem-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      // 法一
      this.$bus.$emit("itemImageLoad");
      
      // 法二
      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("homeitemImageLoad");
      // } else if (this.$route.path.indexOf("/detail")) {
      //   this.$bus.$emit("detailitemImageLoad");
      // }
    },
    handleItemClick() {
      // 使用 push 而不是用 replace 是为了之后能够路由返回
      this.$router.push({
        path: "/detail",
        query: {
          id: this.goodsItem.iid
        }
      });
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  }
};
</script>

<style scoped>
.goodsItem {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goodsItem img {
  width: 100%;
  border-radius: 5px;
}

.goodsItem-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goodsItem-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goodsItem-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goodsItem-info .collect {
  position: relative;
}

.goodsItem-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>