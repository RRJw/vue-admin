import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css' // 样式重置插件
import '@/utils/plugin' // 按需加载element-ui
import '@/assets/css/index.scss' // global css

import './icons' // 图标
import './permission' // 权限控制

import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
