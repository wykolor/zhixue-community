import {
  get,
  post
} from "../axios";

//
let login = "http://mpestate.dev.smartyface.cn/api/v1/wechat/updateUserInfo";
export default {
  loginAddress: function (loginObj) {
    return post(login, loginObj);
  }
};
