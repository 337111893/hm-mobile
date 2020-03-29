import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 用按需加载的方式配置路由，不用在下边写，直接在routes外边定义变量
// layout变成一级，home首页变成二级，以及另外三个
const Layout = () => import('@/views/layout')// 按需引入layout
const home = () => import('@/views/home')// 按需引入home，二级路由
const question = () => import('@/views/question')// 按需引入question，二级路由
const video = () => import('@/views/video')// 按需引入video，二级路由
const user = () => import('@/views/user')// 按需引入user，二级路由
// 其他一级组件
const chat = () => import('@/views/user/chat')// 按需引入小智同学
const login = () => import('@/views/login')// 按需引入登录模块
const profile = () => import('@/views/user/profile')// 按需引入编辑资料组件
const search = () => import('@/views/search')// 按需引入搜索中心组件
const searchresult = () => import('@/views/search/result')// 按需引入搜索结果组建
const article = () => import('@/views/article')// 按需引入文章详情

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout, // 一级路由
    // 二级是孩子
    children: [{
      path: '', //  如果path什么都不写 默认就是二级路由的默认组件
      component: home,
      meta: {
        isAlive: true // 是否缓存组件实例
      }
    }, {
      path: '/question', // 问答组件，二级路由
      component: question
    }, {
      path: '/video', // 视频组件，二级路由
      component: video
    }, {
      path: '/user', // 用户组件，二级路由
      component: user
    }]
  }, {
    path: '/user/chat',
    component: chat // 小智同学组件，一级路由
  }, {
    path: '/login',
    component: login // 登录组件，一级路由
  }, {
    path: '/user/profile',
    component: profile // 编辑资料组件，一级路由
  }, {
    path: '/search',
    component: search // 搜索中心组件，一级路由
  }, {
    path: '/search/result',
    component: searchresult // 搜索结果组件，一级路由
  }, {
    path: '/article',
    component: article // 搜索结果组件，一级路由
  }

]

const router = new VueRouter({
  routes
})

export default router
