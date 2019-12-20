import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

import { api } from "./server/api";
Vue.prototype.$api = api;

App.mpType = "app";

const app = new Vue({
  ...App
});
app.$mount();
