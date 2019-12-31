// 测试模块
import testApi from "./apiList/test.js";

// 首页模块
import indexApi from "./apiList/index.js";
import hsbindApi from "./apiList/housebind.js";

// 授权登录模块
import authApi from "./apiList/auth.js";

// 文章详情模块
import articleDetailApi from "./apiList/articleDetail.js";

// 家政服务模块
import homeHelpApi from "./apiList/homeHelp.js";

// 服务模块
import serverApi from "./apiList/server.js";

// 意见建议
import suggestionApi from "./apiList/suggestion.js";

// 切换小区
import switchVillageApi from "./apiList/switchVillage.js";

// 消息模块
import newApi from "./apiList/news.js";
// 访客模块
import visitorApi from "./apiList/visitor.js";

export const api = {
  testApi,
  indexApi,
  authApi,
  articleDetailApi,
  homeHelpApi,
  serverApi,
  suggestionApi,
  switchVillageApi,
  newApi,
  visitorApi,
  hsbindApi
};
