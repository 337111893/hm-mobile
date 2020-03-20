<template>
  <!-- 整体必须有container -->
  <div class="container">
    <van-tabs >
          <!-- 内部需要放置子 标签  title值为当前显示的内容-->
         <!-- van-tab是vant组件的样式  -->
       <!-- 拿到channels数据之后吧 应该做什么 -->
      <van-tab :title="`${item.name}`" v-for="item in channels" :key="item.id">
        <!-- 内容列表加div，且类名scroll-wrapper，为了滚动 -->
        <!-- 生成若干个单元格 -->
            <!-- 这里为什么叫scroll-wrapper  因为样式中对它进行了设置 -->
        <!-- <div class="scroll-wrapper">
          van-cell单元格为了加边框
          <van-cell-group>
            <van-cell :title="`标题${item}`" value="内容" v-for="item in 20" :key="item" />
          </van-cell-group>
        </div> -->
        <ArticleList></ArticleList>
        <!-- 在tabs下放置图标  编辑频道的图标 -->
          <span class="bar_btn">
            <!-- 放入图标 vant图标 -->
            <van-icon name="wap-nav"></van-icon>
          </span>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import { getMyChannels } from '@/api/channels'

export default {
  components: {
    ArticleList
  },
  data () {
    return {
      channels: []// 接收频道数据
    }
  },
  methods: {
    // 用async和await
    async getMyChannels () {
      const data = await getMyChannels()
      this.channels = data.channels // 更新原来的channels
    }
  },
  created () {
    // 钩子函数中调用
    this.getMyChannels()
  }
}
</script>
<style lang="less" scoped >
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      // 实现下拉滚动
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
