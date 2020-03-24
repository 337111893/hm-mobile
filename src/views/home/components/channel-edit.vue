<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
          <!-- 渲染我的频道数据 -->
        <van-grid-item v-for="(item,index) in channels" :key="item.id">
            <!-- 添加点击事件，传索引给父组件 -->
            <!-- :class="{red: index===activeIndex }" 相等才会红色，不等不会 -->
          <span @click="$emit('selectChannel', index)" :class="{red: index===activeIndex }" class="f12">{{item.name}}</span>
          <!-- 只有在编辑时叉号标签才显示 -->
          <!-- 因为第一个永远不显示 所以说条件应该加一个 不等于0 -->
          <!-- 调用辅助间方法，传id -->
          <van-icon @click="$emit('delChannel', item.id)" v-if="index!==0 && editing" class="btn" name="cross"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 可选频道 -->
    <!-- 我的频道的数据 是 当前用户自己的频道(在登录情况下用户自己的频道, 匿名情况下自己的频道 ) -->
    <!-- 可选频道 全部的频道 - 我的频道 -->
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="item in optionalChannels" :key="item.id">
          <span class="f12">{{item.name}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  data () {
    return {
      editing: false, // 正在编辑状态，是否删除图标
      allChannels: []// 定义一个变量，接收频道数据
    }
  },
  // 频道数据，对象的形式
  props: {
    channels: {
      required: true,
      type: Array, // 数组形式
      default: () => []// 必须是个函数，给个箭头函数
    },
    // home传过来的选中的索引
    activeIndex: {
      required: true, // 表示必须传递channels
      type: Number, // 指定type是number类型
      default: 0
    }
  },
  methods: {
    async getAllChannels () {
      const data = await getAllChannels()
      this.allChannels = data.channels// 直接把频道数据赋值给频道
    }
  },
  //   为什么要不用计算属性? 可选频道 其实是一个动态的结果  全部数据(data) - 用户频道(props) => 重新计算频道数据 => 缓存
  computed: {
    //   可选频道 计算属性必须要求有返回值
    optionalChannels () {
      // 全部频道 - 我的频道
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  },
  created () {
    this.getAllChannels()// 调用组件方法
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
