<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" />

    <ul>
      <li>推荐1</li>
      <li>推荐2</li>
      <li>推荐3</li>
      <li>推荐4</li>
      <li>推荐5</li>
      <li>推荐6</li>
      <li>推荐7</li>
      <li>推荐8</li>
      <li>推荐9</li>
      <li>推荐10</li>
      <li>推荐11</li>
      <li>推荐12</li>
      <li>推荐13</li>
      <li>推荐14</li>
      <li>推荐15</li>
      <li>推荐16</li>
      <li>推荐17</li>
      <li>推荐18</li>
      <li>推荐19</li>
      <li>推荐20</li>
      <li>推荐21</li>
      <li>推荐22</li>
      <li>推荐23</li>
      <li>推荐24</li>
      <li>推荐25</li>
      <li>推荐26</li>
      <li>推荐27</li>
      <li>推荐28</li>
      <li>推荐29</li>
      <li>推荐30</li>
      <li>推荐31</li>
      <li>推荐32</li>
      <li>推荐33</li>
      <li>推荐34</li>
      <li>推荐35</li>
      <li>推荐36</li>
      <li>推荐37</li>
      <li>推荐38</li>
      <li>推荐39</li>
      <li>推荐40</li>
      <li>推荐41</li>
      <li>推荐42</li>
      <li>推荐43</li>
      <li>推荐44</li>
      <li>推荐45</li>
      <li>推荐46</li>
      <li>推荐47</li>
      <li>推荐48</li>
      <li>推荐49</li>
      <li>推荐50</li>
      <li>推荐51</li>
      <li>推荐52</li>
      <li>推荐53</li>
      <li>推荐54</li>
      <li>推荐55</li>
      <li>推荐56</li>
      <li>推荐57</li>
      <li>推荐58</li>
      <li>推荐59</li>
      <li>推荐60</li>
      <li>推荐61</li>
      <li>推荐62</li>
      <li>推荐63</li>
      <li>推荐64</li>
      <li>推荐65</li>
      <li>推荐66</li>
      <li>推荐67</li>
      <li>推荐68</li>
      <li>推荐69</li>
      <li>推荐70</li>
      <li>推荐71</li>
      <li>推荐72</li>
      <li>推荐73</li>
      <li>推荐74</li>
      <li>推荐75</li>
      <li>推荐76</li>
      <li>推荐77</li>
      <li>推荐78</li>
      <li>推荐79</li>
      <li>推荐80</li>
      <li>推荐81</li>
      <li>推荐82</li>
      <li>推荐83</li>
      <li>推荐84</li>
      <li>推荐85</li>
      <li>推荐86</li>
      <li>推荐87</li>
      <li>推荐88</li>
      <li>推荐89</li>
      <li>推荐90</li>
      <li>推荐91</li>
      <li>推荐92</li>
      <li>推荐93</li>
      <li>推荐94</li>
      <li>推荐95</li>
      <li>推荐96</li>
      <li>推荐97</li>
      <li>推荐98</li>
      <li>推荐99</li>
      <li>推荐100</li>
    </ul>
  </div>
</template>

<script>
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
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
      }
    };
  },
  created() {
    // 初始加载
    this.init()
  },
  methods: {
    init() {
      // 1. 请求多个数据
      this.getMultiData()
      // 2. 请求商品时数据
      this.getHomeProducts("pop")
      this.getHomeProducts("new")
      this.getHomeProducts("sell")
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
        },
        err => {
          window.alert("请求错误");
        }
      );
    }
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
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
}
</style>