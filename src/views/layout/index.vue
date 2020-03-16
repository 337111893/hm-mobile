<template>
  <!-- 导航 -->
  <div class="container">
    <!-- fixed是固定用的 -->
    <!-- 可以采用vant的导航组件 来实现 -->
    <van-nav-bar v-if="showNavBar" fixed @click-right="$router.push('/search')" title="黑马头条" right-text="搜索"></van-nav-bar>
   <!-- 二级路由 -->
   <div class="my-wrapper" :class="{ noTop: !showNavBar }">
     <router-view></router-view>
   </div>
  <!-- 底部标签组件 -->
  <van-tabbar route>
    <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
    <van-tabbar-item to="/video" icon="tv-o">视频</van-tabbar-item>
    <van-tabbar-item to="/user" icon="contact">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  computed: {
    // 是否显示navbar
    showNavBar () {
      // this  指向 组件实例
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
