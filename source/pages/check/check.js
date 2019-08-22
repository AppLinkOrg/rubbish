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
  RubbishApi
} from "../../apis/rubbish.api.js";
var WxParse = require('../../wxParse/wxParse');
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      mylat: 0,
      mylng: 0,
      check: 'A'
    })

  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var rubbishapi = new RubbishApi();
    rubbishapi.rubbishlist({
    }, (one) => {
      this.Base.setMyData({
        one
      });
    });

    console.log("看看");
    this.Base.getAddress((address) => {
      console.log(address, "看看");
      this.Base.setMyData({
        myaddress: address.address_component
      });

    });

  }
  bindcheck(e) {
    var checkid = e.currentTarget.dataset.check;
    var one = this.Base.getMyData().one;
    var oneinfo = one.filter((item) => {
      return item.id == checkid
    })

    var oneinfo = oneinfo[0];
    console.log(oneinfo);
    var kelon = { ...oneinfo
    };
    kelon.content = this.Base.util.HtmlDecode(kelon.content);
    WxParse.wxParse('item', 'html', kelon.content, this, 10);
    this.Base.setMyData({
      oneinfo
    });
  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '垃圾分类',
    });
  }

  bindsousuo() {

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindsousuo = content.bindsousuo;
body.bindcheck = content.bindcheck;
Page(body)