import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permisstion'
import store from './store'
import Vant from 'vant'
import plugin from '@/utils/plugin'// 引入插件
import 'vant/lib/index.less'// 引入vant组件的less文件
import 'amfe-flexible'
import '@/styles/index.less'// 引入全局的自定义样式  因为要覆盖vant的样式

Vue.use(Vant) // 全局注册  实际上调用了 Vant导出的对象的方法  install方法
Vue.use(plugin)// 需要放在vant之后，因为里边有vant的小函数，必须等vant注册完毕

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
