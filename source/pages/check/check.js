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
      //check: 'A'
    })
 
      
  }
  onMyShow() {
    var that = this;
    var instapi = new InstApi();
    var rubbishapi = new RubbishApi();
    rubbishapi.rubbishlist({}, (one) => {
      this.Base.setMyData({
        one: one
      });
      var one = this.Base.getMyData().one;

      console.log(one);
      var oneinfo = one[0];
      console.log(oneinfo);
      var kelon = { ...oneinfo };
      kelon.content = this.Base.util.HtmlDecode(kelon.content);
      WxParse.wxParse('item', 'html', kelon.content, this, 10);
      this.Base.setMyData({
        oneinfo
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
    var kelon = { ...oneinfo};
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


  bindfind() {
    wx.navigateTo({
      url: '/pages/find/find',
    })
  }
  bindsousuo() {

  }
   lianxi(){

     var instinfo = this.Base.getMyData().instinfo;
     console.log(instinfo);
     wx.showActionSheet({
       itemList: [instinfo.kefuweixin,"一键复制"],
       success(e) {
         if (e.tapIndex == 0) {
          
         } else {
           wx.setClipboardData({
             data: instinfo.kefuweixin,
           })
         }
       }
     })
   }
  // bindxiaochu(){
  //   var that = this;
  //   this.Base.setMyData({
  //     name: ''
  //   })
  // }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindsousuo = content.bindsousuo;
body.bindcheck = content.bindcheck;
body.bindcha = content.bindcha;
body.bindxiaochu = content.bindxiaochu;
body.bindfind = content.bindfind;
body.lianxi = content.lianxi
Page(body)