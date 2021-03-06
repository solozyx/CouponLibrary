// pages/home/home.js
var utils = require("../../utils/util.js")
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CouponCount: null,
    lastpage: 0,
    GroupName: "",
    noticeList: [{
        title: "A商家领用了100张【10元代金券】"
      },
      {
        title: "B商家领用了100张【10元代金券】"
      },
      {
        title: "C商家领用了100张【10元代金券】"
      },
    ]
  },
  onWxScanCode: function () {
    // wx.navigateTo({
    //   url: '../scanCheck/scanCheck?CouponCode=115901'
    // }); 
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '../scanCheck/scanCheck?CouponCode=' + res.result
        });
      }
    })
  },
  GetData: function () {
    let that = this;
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponHomeView/GetHomeCouponCount", "POST", data, app.globalData.appkeyid, that.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    console.log(json);
    var data = json.data.Data;
    if (data) {
      console.log(data.msg);
      that.setData({
        CouponCount: data
      })
    }
  },

  Jumptap: function () {
    wx.navigateTo({
      url: '../getTicketList/getTicketList?quick=0',
    })
  },

  noticetap: function () {
    wx.navigateTo({
      url: '../sysNotice/sysNotice',
    })
  },


  JumpwatchMesOne: function (e) {
    var couponcode = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../sendTicketMes/sendTicketMes',
    })
  },

  perfecttap: function (e) {
    let index = e.currentTarget.dataset.index;
    console.log(index)
    switch (index) {
      case "19":
        wx.navigateTo({
          url: '../classRoom/classRoom',
        });
        break;

      case "29":
        wx.showToast({
          image: '/static/images/dp.png',
          title: '功能正在完善中',
          icon: 'none',
          duration: 2000
        });
        break;
      case "39":
        wx.showToast({
          image: '/static/images/dp.png',
          title: '功能正在完善中',
          icon: 'none',
          duration: 2000
        });
        break;
      default:
        wx.showToast({
          image: '/static/images/dp.png',
          title: '功能正在完善中',
          icon: 'none',
          duration: 2000
        });
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      proname: app.globalData.sysName
    })
    wx.setNavigationBarTitle({
      title: app.globalData.sysName + '商家助手'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.setData({
      GroupName: app.globalData.AppShopInfo.ShopName
    })
    that.GetData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("返回");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})