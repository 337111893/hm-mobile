import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/index.less'// 引入全局的自定义样式  因为要覆盖vant的样式

Vue.use(Vant) // 全局注册  实际上调用了 Vant导出的对象的方法  install方法

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
