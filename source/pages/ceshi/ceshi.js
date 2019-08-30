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
      nextone: 0,
      yixuan: false
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
        lajisousuo: lajisousuo,
        nextone:0

      });
    });

  }
  // setPageTitle() {
  //   wx.setNavigationBarTitle({
  //     title: '测试',
  //   });
  // }

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
    console.log(id);
    console.log(this.Base.getMyData().yixuan);

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

    laji[id] = {
      'title': title,
      'xuanxiang': type,
      'cat': cat
    }


    if (id == 9) {
      var laji = JSON.stringify(this.Base.getMyData().laji);
    
      wx.navigateTo({
        url: '/pages/report/report?laji=' + laji
      })
    }



    this.jinqu(id);




    this.Base.setMyData({
      check: check,
      id: id,
      laji: laji
    })

  }

  jinqu(nextone) {
    console.log("进来了熬" + nextone);
    setTimeout(() => {
      this.Base.setMyData({
        nextone: parseInt( nextone) + 1,

      })
    }, 250)
  }
  stopTouchMove() {
    console.log("禁止滑动");
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.binddianji = content.binddianji;
body.stopTouchMove = content.stopTouchMove;
body.bindtijiao = content.bindtijiao;
body.jinqu = content.jinqu;
Page(body)