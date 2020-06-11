// pages/content/content.js
import { AppBase } from "../../appbase";
import { ApiConfig } from "../../apis/apiconfig";
import { InstApi } from "../../apis/inst.api.js";
import {
  HuishouApi
} from "../../apis/huishou.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;
    var api = new HuishouApi();
    api.huishouinfo({ id: this.Base.options.id }, (huishouinfo) => {
     console.log(huishouinfo);
    var ss = huishouinfo.huishouquyu.split(";");
      this.Base.setMyData({ huishouinfo,ss:ss })

    })

  }
  lianxi(){
    var huishouinfo = this.Base.getMyData().huishouinfo;
    wx.showActionSheet({
      itemList: ["拨打电话"],
      success(e) {
        if (e.tapIndex == 0) {
          wx.makePhoneCall({
            phoneNumber: huishouinfo.dianhua
          })
        }
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.lianxi = content.lianxi;
Page(body)