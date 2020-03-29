<template>
  <!-- 整体必须有container -->
  <div class="container">
    <van-tabs v-model="activeIndex" @change="changeTab">
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
        <ArticleList @showAction="openAction" :channel_id="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <!-- 在tabs下放置图标  编辑频道的图标 -->
          <span class="bar_btn" @click="showChannelEdit=true">
            <!-- 放入图标 vant图标 -->
            <van-icon name="wap-nav"></van-icon>
          </span>
    <!-- 弹层组件 -->
    <van-popup :style="{ width: '80%' }" v-model="showMoreAction">
      <!-- 放置反馈组件 -->
      <more-action @dislike="dislikeOrReport('dislike')" @report="dislikeOrReport('report',$event)"></more-action>
    </van-popup>
    <!-- 频道编辑组件 -->
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <!-- 将父组件数据传递给子组件 -->
      <ChannelEdit @addChannel="addChannel" @delChannel="delChannel" :activeIndex="activeIndex" @selectChannel="selectChannel" :channels="channels"></ChannelEdit>
    </van-action-sheet>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import MoreAction from './components/more-action'
import { getMyChannels, delChannel, addChannel } from '@/api/channels'
import { dislikeArticle, reportArticle } from '@/api/articles' // 不感兴趣
import eventbus from '@/utils/eventbus' // 公共事件处理器
import ChannelEdit from './components/channel-edit'
export default {
  components: {
    ArticleList, MoreAction, ChannelEdit
  },
  data () {
    return {
      channels: [], // 接收频道数据
      showMoreAction: false, // 控制反馈组件显示隐藏
      articleId: null, // 定义一个值接收,点击文章的id
      activeIndex: 0, // 当前默认激活的页面0
      showChannelEdit: false// 显示编辑层，默认false
    }
  },
  methods: {
    // 切换页签事件
    changeTab () {
      // 切换页签时 我要广播一个消息  让对应的页签中的文章列表  去滚动 滚动条
      // 广播中传出一个参数 传当前谁被激活了 传出当前激活索引的 id
      eventbus.$emit('changeTab', this.channels[this.activeIndex].id)
    },
    // 删除频道的方法
    async delChannel (id) {
      // 此时应该先调用api
      try {
        await delChannel(id) // 调用api方法  此时只是删除了 缓存中的数据
        // 如果此时成功的resolve了 我们 应该去移除 当前data中的数据
        const index = this.channels.findIndex(item => item.id === id) // 找到对应的索引
        // 找到对应的索引之后
        // 要根据当前删除的索引 和 当前激活的索引的 关系 来 决定 当前激活索引是否需要改变
        if (index <= this.activeIndex) {
          //  如果你删除的索引 是在当前激活索引之前的 或者等于当前激活索引的
          // 此时就要把激活索引 给往前挪一位
          this.activeIndex = this.activeIndex - 1
        }
        this.channels.splice(index, 1) // 删除对应的索引频道
      } catch (error) {
        this.$ynotify({ message: '删除频道失败' })
      }
    },
    // 添加频道
    async  addChannel (channel) {
      // 调用api，将频道写入缓存成功之后将该频道添加到data数据
      await addChannel(channel)// 写入缓存
      this.channels.push(channel) // 自身加一个频道 影响子组件
    },
    // 用async和await
    async getMyChannels () {
      const data = await getMyChannels()
      this.channels = data.channels // 更新原来的channels
    },
    // 从编辑组件过来的切换频道
    selectChannel (index) {
      this.activeIndex = index // 将对应频道的索引 设置给当前激活的 标签
      this.showChannelEdit = false // 关闭弹层
    },
    openAction (artId) {
      // 此时弹出弹出层
      this.showMoreAction = true
      //  应该把id给存储起来
      this.articleId = artId
    },
    // 对文章不感兴趣和举报都用一个方法，只是传参不一样
    // operateType 是操作类型 如果是dislike 就是不喜欢 如果是 report 就是 举报
    async dislikeOrReport (operateType, type) {
      // 调用不感兴趣的文章接口
      try {
        // 需要根据一个参数来判断 是举报还是不喜欢
        operateType === 'dislike' ? await dislikeArticle({
          target: this.articleId // 不感兴趣的id
        }) : await reportArticle({ target: this.articleId, type }) //  这里的type怎么办 ?????? 通过$event传出来
        // await下方的逻辑 是 resolve(成功)之后 的
        this.$ynotify({
          type: 'success',
          message: '操作成功'
        })
        // 应该 触发一个事件 利用事件广播的机制 通知对应的tab 来删除 文章数据
        // 除了 传一个文章之外 你还需要告诉 监听事件的人 现在处于哪个频道 可以传递频道id
        // this.channels[this.activeIndex].id // 当前激活的频道数据
        eventbus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
        // 监听了这个事件组件 就要根据id来删除数据
        this.showMoreAction = false // 此时关闭弹层
      } catch (error) {
        // 默认是红色
        this.$ynotify({
          message: '操作失败'
        })
      }
    }
  },
  created () {
    // 钩子函数中调用
    this.getMyChannels()
  }
}
</script>
<style lang="less" scoped >
// 编辑层样式
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
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
