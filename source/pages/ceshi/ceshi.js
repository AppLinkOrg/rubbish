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
  LajiApi
} from "../../apis/laji.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    this.Base.setMyData({
      laji: [],
      nextone: 0
    })
  }
  onMyShow() {
    var that = this;
    var lajiapi = new LajiApi();

    lajiapi.lajisousuo({
      orderby: 'RAND()',
      limit: 10
    }, (lajisousuo) => {
      this.Base.setMyData({
        lajisousuo: lajisousuo
      });
    });

  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '测试',
    });
  }

  binddianji(e) {
    // var id = e.currentTarget.id;
    // var dian = e.currentTarget.dataset.dian;
    // var lajisousuo = this.Base.getMyData().lajisousuo;
    // console.log(dian)
    // lajisousuo[dian].check = id;
    // this.Base.setMyData({
    //   lajisousuo: lajisousuo,
    // })
    var id = e.currentTarget.id;
    var nextone = this.Base.getMyData().nextone;
    var check = e.currentTarget.dataset.check;
    var title = e.currentTarget.dataset.title;
    var cat = e.currentTarget.dataset.cat;
    var laji = this.Base.getMyData().laji;

    if (check == 'A') {
      var type = '厨余垃圾'
    }
    if (check == 'B') {
      var type = '其他垃圾'
    }
    if (check == 'C') {
      var type = '可回收物'
    }
    if (check == 'D') {
      var type = '有害垃圾'
    }


    laji.push({
      'title': title,
      'xuanxiang': type,
      'cat': cat
    })
    console.log(title, "标题")



    console.log(check)
    console.log(id);
    if (id==9) {
      var laji = JSON.stringify(this.Base.getMyData().laji);
      wx.navigateTo({
        url: '/pages/report/report?laji=' + laji
      })
    }





    // setTimeout(() => {
    //   this.Base.setMyData({
    //     nextone: nextone + 1
    //   })
    // }, 250)

    this.Base.setMyData({
      check: check,
      id: id,
      laji: laji
    })

  }

  // bindtijiao() {
  //   var laji = JSON.stringify(this.Base.getMyData().laji);

  //   wx.navigateTo({
  //     url: '/pages/report/report?laji=' + laji
  //   })
  // }
  stopTouchMove() {
    return false;
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.binddianji = content.binddianji;
body.stopTouchMove = content.stopTouchMove;
body.bindtijiao = content.bindtijiao;

Page(body)