import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;
App.mpType = "app";

// 接口模块出口
import { api } from "./server/api";
Vue.prototype.$api = api;

const app = new Vue(App);
app.$mount();
