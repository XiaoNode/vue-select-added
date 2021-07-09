import Vue from "vue";
import App from "./App.vue";

import { Popover, Select, Input, Icon, Space, Tag } from "ant-design-vue";
Vue.use(Select);
Vue.use(Popover);
Vue.use(Space);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Tag);
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
