<template>
  <div class="more-action">
    <van-cell-group v-if="!isReport">
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell @click="$emit('report', item.value)" v-for="item in reports" :key="item.value">{{item.label}}</van-cell>

    </van-cell-group>
  </div>
</template>

<script>
import { reports } from '@/api/constants'
import eventbus from '@/utils/eventbus' // 公共事件处理器
export default {
  data () {
    return {
      isReport: false, // 是否举报的意思
      reports // 相当于定于一个变量，接收constants中的reports
    }
  },
  created () {
  //  一初始化就要开始监听
    eventbus.$on('delArticle', () => (this.isReport = false)) // 只要你一开始删除 我就把弹层中反馈组件重置为初始状态
  }
}

</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
