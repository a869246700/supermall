import {POP, NEW, SELL} from "./const";
import {
  debounce
} from "common/utils";

import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: {},
      refresh: {}
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => this.refresh()
    this.$bus.$on("itemImageLoad", this.itemImgListener)

  },
}
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    showBackTop(position, Y) {
      this.isShowBackTop = (-position.y) > Y
    }
  },
  components: {
    BackTop
  }
}
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
