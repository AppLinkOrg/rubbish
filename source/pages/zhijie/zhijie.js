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
  YuyueApi
} from "../../apis/yuyue.api.js";
import {
  AliyunApi
} from "../../apis/aliyun.api.js";
class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var myDate = new Date();
    var jintian = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    this.Base.setMyData({
      zhenmian: '',
      xssj: '',
      jintian,
      region: [],
      name: '',
      dianhua: '',
      dizhi: '',
      shijian: '',
      wupin: '',
      diqu: '',
      skimages: []
    });



  }
  onMyShow() {
    var that = this;

    this.Base.getAddress((location) => {
      console.log(location);
      console.log(555555555);
      var mylat = location.location.lat;
      var mylng = location.location.lng;
      this.Base.setMyData({
        mylocation: location.ad_info
      });
      var address = location;
      if (address.address_component != undefined) {

        console.log(address);
        var region = [address.address_component.province, address.address_component.city, address.address_component.district];
        this.Base.setMyData({
          region,
          diqu: region[0] + region[1] + region[2]
        });
        console.log(region[0] + region[1] + region[2]);
      }
    });




  }

  // zhenmian() {
  //   this.Base.uploadOneImage("huishou", (ret) => {

  //     this.Base.setMyData({
  //       zhenmian: ret
  //     })

  //   }, undefined);

  // }
  bindDateChange(e) {
    console.log(e);

    console.log(e.detail.value);

    var shijian = e.detail.value;
    var shijians = shijian.split("-");
    var xssj = (shijians[0] + ' 年 ' + shijians[1] + ' 月 ' + shijians[2] + ' 日 ');

    this.Base.setMyData({
      xssj: xssj
    })
  }

  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      diqu: e.detail.value[0] + e.detail.value[1] + e.detail.value[2]
    })
  }
  name(e) {
    console.log(e);
    var name = e.detail.value;
    this.Base.setMyData({
      name
    })
  }
  dianhua(e) {
    console.log(e);
    var dianhua = e.detail.value;
    this.Base.setMyData({
      dianhua
    })
  }
  dizhi(e) {
    console.log(e);
    var dizhi = e.detail.value;
    this.Base.setMyData({
      dizhi
    })
  }
  shijian(e) {
    console.log(e);
    var shijian = e.detail.value;
    this.Base.setMyData({
      shijian
    })
  }
  wupin(e) {
    console.log(e);
    var wupin = e.detail.value;
    this.Base.setMyData({
      wupin
    })
  }

  tijiao() {
    var that = this;
    var name = this.Base.getMyData().name;
    var dianhua = this.Base.getMyData().dianhua;
    var diqu = this.Base.getMyData().diqu;
    var dizhi = this.Base.getMyData().dizhi;
    var riqi = this.Base.getMyData().xssj;
    var shijian = this.Base.getMyData().shijian;
    var wupin = this.Base.getMyData().wupin;
    var tupian = this.Base.getMyData().skminusImg;
    var json = {
      name: name,
      dianhua: dianhua,
      diqu: diqu,
      dizhi: dizhi,
      riqi: riqi,
      shijian: shijian,
      wupin: wupin,
      tupian: tupian
    }

    var api = new YuyueApi();
    var dapi = new AliyunApi();
    api.yuyue(json, (res) => {
      if (res.code == 0) {
        dapi.sendverifycode({
          mobile: that.Base.getMyData().instinfo.shouji,
          type: 'tonzhi'
        }, (dx) => {

          wx.redirectTo({
            url: '/pages/tijiaochengon/tijiaochengon',
          })

        })


      }


    })

  }

  skuploadimg() {
    var that = this;
    this.Base.uploadImage("huishou", (ret) => {
      var skimages = that.Base.getMyData().skimages;
      skimages.push(ret);
      that.Base.setMyData({
        skimages
      });
    }, 9, undefined);
  }


  skminusImg(e) {
    var that = this;
    var seq = e.currentTarget.id;
    var skimages = that.Base.getMyData().skimages;
    var skimgs = [];
    for (var i = 0; i < skimages.length; i++) {
      if (seq != i) {
        skimgs.push(skimages[i]);
      }
    }
    that.Base.setMyData({
      skimages: skimgs
    });
  }


}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.zhenmian = content.zhenmian;


body.skuploadimg = content.skuploadimg;
body.skminusImg = content.skminusImg;



body.bindDateChange = content.bindDateChange;
body.bindRegionChange = content.bindRegionChange;
body.name = content.name;
body.dianhua = content.dianhua;
body.dizhi = content.dizhi;
body.shijian = content.shijian;
body.wupin = content.wupin;
body.tijiao = content.tijiao;

Page(body)