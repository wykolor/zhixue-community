import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

import { api } from "./server/api";
import validCode from './components/pwdinput/pwdinput.vue'
Vue.component('validcode',validCode)
Vue.prototype.$api = api;

App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();




