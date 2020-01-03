import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载 导入 组件
const Home = () => import( 'views/home/Home')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Category = () => import('views/category/Category')

// 1. 安装插件
Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/profile",
    component: Profile
  }
]

// 2. 创建 router 实例
const router = new VueRouter({
  routes,
  mode: 'history'
})

// 3. 导出
export default router
