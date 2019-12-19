import { get, post } from "../axios";
//
let login = "/login";
export default {
  loginAddress: function(loginObj) {
    return get(login, loginObj);
  }
};
