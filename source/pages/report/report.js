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
  BaocunApi
} from "../../apis/baocun.api.js";


class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    var id =this.Base.options.id;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      laji: JSON.parse(this.Base.options.laji)
    })
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });

   
  }
  
  onMyShow() {
    var that = this;
    var baocunapi = new BaocunApi();

  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '测试结果',
    });
  }
  bindzaici(){

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    prevPage.onLoad();
    prevPage.onMyShow();
    wx.navigateBack({})
  }
  bindshare(){
    
  
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindzaici = content.bindzaici;
body.bindshare = content.bindshare;
Page(body)