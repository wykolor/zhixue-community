import {
  get,
  post
} from "../axios";

//
let login = "http://mpestate.dev.smartyface.cn/api/v1/esMember/list";
export default {
  loginAddress: function (loginObj) {
    return get(login, loginObj);
  }
};
