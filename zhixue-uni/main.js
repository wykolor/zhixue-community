import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

import { api } from "./server/api";
import validCode from './components/pwdinput/pwdinput.vue'
Vue.component('validcode',validCode)
Vue.prototype.$api = api;
// 引入上拉刷新 下拉加载组件
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-uni', MescrollUni)

App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();




