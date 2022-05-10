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
    this.Base.setMyData({
      fenmian: '',
      zhenmian: '',
      fanmian: '',
      huishoulist: [''],
      name: '',
      dianhua: '',
      diqu: ''
    });
  }
  onMyShow() {
    var that = this;
  }

  jguploadimg() {
    this.Base.uploadOneImage("huishou", (ret) => {

      this.Base.setMyData({
        fenmian: ret
      })

    }, undefined);

  }
  zhenmian() {
    this.Base.uploadOneImage("huishou", (ret) => {

      this.Base.setMyData({
        zhenmian: ret
      })

    }, undefined);

  }
  fanmian() {
    this.Base.uploadOneImage("huishou", (ret) => {

      this.Base.setMyData({
        fanmian: ret
      })

    }, undefined);

  }
  addhuishou() {
    var huishoulist = this.Base.getMyData().huishoulist;
    console.log(huishoulist);
    huishoulist.push('');
    this.Base.setMyData({
      huishoulist
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
    var dianhua = e.detail.value;
    this.Base.setMyData({
      dianhua
    })
  }
  diqu(e) {
    var diqu = e.detail.value;
    this.Base.setMyData({
      diqu
    })
  }
  quyu(e) {
    var huishoulist = this.Base.getMyData().huishoulist;
    huishoulist[e.currentTarget.dataset.id] = e.detail.value;
    this.Base.setMyData({ huishoulist });
  }
  tijiao() {
    var fenmian = this.Base.getMyData().fenmian;
    var zhenmian = this.Base.getMyData().zhenmian;
    var fanmian = this.Base.getMyData().fanmian;
    var huishoulist = this.Base.getMyData().huishoulist;
    var name = this.Base.getMyData().name;
    var dianhua = this.Base.getMyData().dianhua;
    var diqu = this.Base.getMyData().diqu;
     huishoulist=huishoulist.join(';');
       if(fenmian=='')
       {
         this.Base.info("fenmian");
         return
       }
       if(zhenmian=='')
       {
         this.Base.info("zhenmian");
         return
       }
       if(fanmian=='')
       {
         this.Base.info("fanmian");
         return
       }
       if(huishoulist=='')
       {
         this.Base.info("huishoulist");
          return
       }
       if(name=='')
       {
         this.Base.info("name");
         return
       }
       if(diqu=='')
       {
         this.Base.info("diqu");
         return
       }
       var json={
         photo:fenmian,
         name:name,
         dianhua:dianhua,
         huishouquyu:huishoulist,
         zfzz:zhenmian,
         zfzf:fanmian,
         diqu:diqu
       }
  
    var api = new HuishouApi;
    api.huishou(json,(res)=>{
      if(res.code=='0'){
        this.Base.toast('提交成功！');
        wx.reLaunch({
          url: '/pages/check/check',
        })
      }else {
        this.Base.toast(res.result);
      }

   console.log(res);
    })
    

  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.jguploadimg = content.jguploadimg;
body.zhenmian = content.zhenmian;
body.fanmian = content.fanmian;
body.addhuishou = content.addhuishou;
body.name = content.name;
body.dianhua = content.dianhua;
body.diqu = content.diqu;
body.quyu = content.quyu;
body.tijiao = content.tijiao;
Page(body)