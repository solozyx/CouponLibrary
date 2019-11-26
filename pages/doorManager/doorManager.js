// pages/doorManager/doorManager.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     shopid:"",
     datalist:{},
    Popup:true,
    shopname:"",
    latitudeX:0,
    longitudeY:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopid: options.ShopID
    });
    var datas = {
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      shopID: options.ShopID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupShop", "POST", datas, app.globalData.appkeyid, this.CouponShopView);
  },
  CouponShopView:function(res){
    var chat=this;
    var json = res.data.Data;
    if(json.flag){
      chat.data.latitudeX = json.data[0].LatitudeX;
      chat.data.longitudeY = json.data[0].LongitudeY;
      chat.setData({
        datalist:json.data
      });
    }
  },
  Jump:function(event){
    wx.navigateTo({
      url: '../staffManagements/staffManagements?ShopID=' + this.data.shopid,
    })
  },
  perfecttap:function(){
    wx.showToast({
      image: '/static/images/dp.png',
      title: '功能正在完善中',
      icon: 'none',
      duration: 2000
    })
  },
  updateshop:function(event){
    this.setData({ Popup:false});

  },
  coles:function(event){
    this.setData({ Popup: true });
  },
  nocoles:function(event){
    this.setData({ Popup: false });
  },
  blurs:function(event){
    this.setData({
      shopname: event.detail.value
    });
  },
  shopUpdate:function(event){
    if (this.data.shopname == "") {

      wx.showToast({
        title: "店铺名称不能为空",
        icon: "none"
      });
      return;
    }
    this.setData({ repeat: false });
    wx.showLoading({
      title: "数据提交中...",
      mask: true
    });

    var datas = {
      shopId: this.data.shopid,
      ShopName: this.data.shopname,
      ShopAddress: this.data.datalist[0].ShopAddress,
      Contacts: this.data.datalist[0].Contacts,
      Telephone: this.data.datalist[0].Telephone,
      latitudeX: this.data.latitudeX,
      longitudeY: this.data.longitudeY
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/UpdateShopName", "POST", datas, app.globalData.appkeyid, this.updateStaff);
  },
  updateStaff:function(res){
    var chat=this;
    wx.hideLoading();
    var json=res.data.Data;
    if(json.flag){
      wx.showToast({
        title: "修改成功",
        icon: "none"
      });
      chat.setData({Popup: true});
      var datas = {
        pGroupID: app.globalData.AppGroupInfo.GroupID,
        shopID: chat.data.shopid
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupShop", "POST", datas, app.globalData.appkeyid, chat.CouponShopView);

    }else{
      wx.showToast({
        title: "修改失败",
        icon: "none"
      });
    }
  },
  addressblurs: function (event) {//店铺地址
    var chat = this;
    wx.chooseLocation({
      latitude: app.globalData.latitudeX,
      longitude: app.globalData.longitudeY,
      success(res) {
        console.log(JSON.stringify(res));
        if (res.address) {
          chat.data.datalist[0].ShopAddress = res.address
          // chat.setData({
          //   address: res.address
          // })

          utils.getGeocoder(res.address, app.globalData.regionName, chat.getGeocoderBack)
        }
      }
    })
  },
  getGeocoderBack: function (res) {
    var chat = this;
    chat.setData({
      latitudeX: res.latitude,
      longitudeY: res.longitude
    });

  },
  Contactsblurs: function (event) {//店铺联系人

    this.data.datalist[0].Contacts = event.detail.value;
    // this.setData({
    //   Contacts: event.detail.value
    // });
  },
  Telephoneblurs: function (event) {//联系方式
    this.data.datalist[0].Telephone = event.detail.value;
    // this.setData({
    //   Telephone: event.detail.value
    // });
  },
})