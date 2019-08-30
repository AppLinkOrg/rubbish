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
    var api=new HuishouApi();
    api.huishoulist({}, (huishoulist)=>{

      this.Base.setMyData({ huishoulist})

    })
    this.Base.getAddress((location) => {
      console.log(location);
      console.log(555555555);
      var mylat = location.location.lat;
      var mylng = location.location.lng;
      this.Base.setMyData({
        mylocation: location.ad_info
      });
    });
  }
  xianqin(e)
  {
    console.log(e);
     wx.navigateTo({
       url: '/pages/lianxirenxianqin/lianxirenxianqin?id=' + e.currentTarget.dataset.id,
     })

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.xianqin = content.xianqin;
Page(body)