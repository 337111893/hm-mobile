import Vue from 'vue'
import Vuex from 'vuex'
// 引入auth,把默认和平常都引入且变成一个对象
import * as auth from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 因为俩个token定义一个对象,// 专门来放置需要共享的状态
    // 且第一个是可能获取本地，所以获取直接调用auth的方法
    user: auth.getUser()
  },
  mutations: {
    // 修改token
    updateUser (state, payload) {
      // 设置的直接赋值，定义载荷中的user数据给本地state
      state.user = payload.user
      // 同时从vuex更新到本地，保持vuex和本地同步
      auth.setUser(payload.user)
    },
    // 删除token
    delUser (state) {
      // 本地为空
      state.user = {}// 将vuex中的token设置为空对象
      // 缓存数据也需要更新,删除本地缓存中的token
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
