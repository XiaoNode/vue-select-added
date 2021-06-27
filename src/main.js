import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { Popover, Select,Input,Icon, Space } from 'ant-design-vue'
 
Vue.use(Select)
Vue.use(Popover)
Vue.use(Space)
Vue.use(Icon)
Vue.use(Input)

import 'ant-design-vue/dist/antd.css';

new Vue({
  render: (h) => h(App),
}).$mount('#app')
