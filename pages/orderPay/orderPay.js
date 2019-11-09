// pages/orderPay/orderPay.js
var utils = require("../../utils/util.js")
var app=getApp();
Page({
  data: {
    CouponID:"",
    ReceiveID:"",
    datalist: null, 
    SalePrice:0,
    countlist:0,
    number:1,
    repeat:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.CouponID = options.CouponID;
    this.data.ReceiveID = options.ReceiveID;
    var datas = {
      ReleaseID: this.data.ReceiveID,
      pGroupID: app.globalData.AppGroupInfo.GroupID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetReceivepurchase", "POST", datas, app.globalData.appkeyid, this.collarCouponDetail)
  },
  collarCouponDetail:function(res){
    var chat=this;
    var json=res.data.Data;
    chat.setData({
      SalePrice: json.data[0].SalePrice,
      countlist: json.count,
      datalist:json.data
    });
  }, 
  plus:function(event){//加数量
    if (this.data.number >= this.data.countlist){//说明超过最大可领取数量
      return;
    }
    this.setData({
      number: this.data.number + 1
    });

  },
  reduce:function(event){//减数量
    if(this.data.number==1){
      return;
    }
    this.setData({
      number: this.data.number - 1
    });
  },
  blurnuber:function(event){
    if (event.detail.value > this.data.countlist){
      wx.showToast({
        title:"已超过可领数量",
        icon: "none"
      });
      event.detail.value=this.data.number;
    }
      this.setData({
        number: event.detail.value
      });
    
  },
  seve:function(event){
    var chta=this;
    var datas={
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      pReleaseID: chta.data.ReceiveID,
      pReceiveNUM: chta.data.number
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/AddCouponReceive", "POST", datas, app.globalData.appkeyid, this.CouponReceive)
  },
  CouponReceive:function(res){
    var json=res.data.Data;
    if(json.flag){
      if (json.ispay){//说明是要掉支付
        var oJsApiParam =json.paydata;
        wx.requestPayment({
          oJsApiParam,
          success(res) {
            wx.redirectTo({ url: '../pages/myTicket/myTicket' })
           },
          fail(res) { }
        })
      }else{
        wx.showToast({
          title: json.msg,
          icon: "none"
        });
      }
    }else{
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
    }

  }


 
})