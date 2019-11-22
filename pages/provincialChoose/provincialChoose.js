let app = getApp();
let utils = require("../../utils/util.js")
Page({
  data: {
    idx: "",
    idb: "",
    index: 0,
    xzindex:0,
    content:[],
    content2:[],
    content3:[]
  },
  onLoad: function (options) {
   this. GetRegionIndustry();
  },
  GetRegionIndustry: function () {
    let that = this;

    var  regionData = wx.getStorageSync('Region');
    if (regionData ) {
      this.setData({
        content: regionData
      });
      console.log(regionData);
      return;
    }
    utils.GetRegionIndustry(app.globalData.apiurl + "CouponView/LoginView/GetRegionIndustry", "POST", app.globalData.appkeyid, that.GetRegionIndustry)
  },


  showHide2:function(event){//点击省选择框  如果是选中 那当前省下面的市区都选中  取消择都取消
    var contentFor = this.data.content;
    var RegionID = event.currentTarget.dataset.id;
    for (var i in contentFor) {
      if (RegionID == contentFor[i].RegionID) {
        contentFor[i].isSel = !contentFor[i].isSel;
        for (var s in contentFor[i].LevelCoupon_Region){
             contentFor[i].LevelCoupon_Region[s].isSel = !contentFor[i].LevelCoupon_Region[s].isSel
          for (var j in contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region){
            contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region[j].isSel = !contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region[j].isSel
          }

        }
        break;
      } 
    }
    this.setData({ content: contentFor });
  },
  // 省
  // showHide(e) {
  //   let that = this;
  //   let mindex = e.currentTarget.dataset.mindex;

  //   let content = that.data.content;
  //   let item = content[mindex];
  //   item.isSel = !item.isSel;

  //   let contents = item.contents
  //   for (let i in contents) {
  //     contents[i].isSel = item.isSel;
  //     let list = contents[i].list;
  //     for (let j in list) {
  //       list[j].isSel = item.isSel
  //     }
  //   }

  //   that.setData({
  //     content: content

  //   })


  // },
  showMasks:function(event){//点击省
    var contentFor = this.data.content;
    var RegionID= event.currentTarget.dataset.changeid;
    for (var i in contentFor){
      if (RegionID== contentFor[i].RegionID) {
        contentFor[i].shows = !contentFor[i].shows;
        this.data.index=i;
      　}else{
        contentFor[i].shows=false;
      }
    }
    this.setData({ content: contentFor});
  },
  showMaskChilds: function (event) {//点击市
    var inx = this.data.index;
    var RegionID = event.currentTarget.dataset.id;
    var mindex = event.currentTarget.dataset.mindex
    var contentFor = this.data.content;//得到整个对象
    for (var i in contentFor[inx].LevelCoupon_Region) {//循环省下面的市
      if (contentFor[inx].LevelCoupon_Region[i].RegionID == RegionID) {
        contentFor[inx].LevelCoupon_Region[i].shows = !contentFor[inx].LevelCoupon_Region[i].shows
      } else {
        contentFor[inx].LevelCoupon_Region[i].shows = false;
      }
    }
    this.setData({ content: contentFor });
  },
  //showMask(e) {
    //var contentFor = this.data.content;

    //for (var i = 0; i < contentFor.length; i++) {　　
     // if (e.currentTarget.dataset.changeid == contentFor[i].RegionID) {　　　　
      //  var printPrice = "content[" + i + "].shows";　　　　
        //if (this.data.content[i].shows) {　　　　　　
       //   this.setData({　　　　　　　　
         //   [printPrice]: false　　　　　　
         // });　　　　
        //} else {　　　　　　
        //  this.setData({　　　　　　　　
       //     [printPrice]: true　　　　　　
       //   });　　　　
       // }　　
     // } else {　　　　　　
      //  var printPrice1 = "content[" + i + "].shows";　　　　　　
       // this.setData({　　　　　　　　
        //  [printPrice1]: false　　　　　　
        //});　　　　
     // }　　
    //}
  //},


  // 市
  clickTrue(e) {
    let that = this;
    let content = that.data.content;
    let mindex = e.currentTarget.dataset.mindex;
    let sindex = e.currentTarget.dataset.sindex;
    console.log(mindex);
    let contents = content[mindex].contents[sindex];
    contents.isSel = !contents.isSel
    let list = contents.list;
    for (let i in list) {
      list[i].isSel = contents.isSel
    }

    let ocontents = content[mindex].contents
    let count = 0
    for (let i in ocontents) {
      if (!ocontents[i].isSel) {
        count++;
      }
    }

    content[mindex].isSel = true
    if (count == ocontents.length)
      content[mindex].isSel = false

    that.setData({
      content: content
    })
  },

  


  //showMaskChild(e){
    //let that = this;
    //let content = that.data.content;
    //let mindex = e.currentTarget.dataset.mindex;
    //let sindex = e.currentTarget.dataset.sindex;
    //console.log(mindex);
    //let contents = content[mindex].contents[sindex];
    //contents.shows = !contents.shows
    //that.setData({
     // content:content
    //})

  //},



  // 区
  clickTwo(e) {
    let that = this;
    console.log(e);
    let content = that.data.content;
    let mindex = e.currentTarget.dataset.mindex;
    let sindex = e.currentTarget.dataset.sindex;
    let cindex = e.currentTarget.dataset.cindex;
    let list = content[mindex].contents[sindex].list[cindex];
    list.isSel = !list.isSel;

    let olist = content[mindex].contents[sindex].list
    let count = 0
    for (let i in olist) {
      if (!olist[i].isSel) {
        count++
      }
    }

    content[mindex].contents[sindex].isSel = true
    if (count == olist.length) {
      content[mindex].contents[sindex].isSel = false
    }


    let ocontents = content[mindex].contents
    let ccount = 0
    for (let i in ocontents) {
      if (!ocontents[i].isSel) {
        ccount++
      }
    }
    content[mindex].isSel = true
    if (ccount == ocontents.length) {
      content[mindex].isSel = false
    }

    that.setData({
      content: content
    })

  }
})