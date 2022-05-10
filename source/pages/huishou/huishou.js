// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";

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
  }
  huishou() {
    this.Base.toast("功能暂未开放~")
    return;
    wx.navigateTo({
      url: '/pages/zhijie/zhijie',
    })

  }
  zhijie() {
    this.Base.toast("功能暂未开放~")
    return;
    wx.navigateTo({
      url: '/pages/yuyue/yuyue',
    })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.huishou = content.huishou;
body.zhijie = content.zhijie;
Page(body)