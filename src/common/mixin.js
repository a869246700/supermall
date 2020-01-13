import {
  debounce
} from "common/utils";
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
