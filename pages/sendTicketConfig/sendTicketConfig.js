// pages/sendTicketConfig/sendTicketConfig.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    couponList: [],
    lastpage: 0,
    section: [],
    IndustryCode:"C1",
    currentId: 'C1', 
    isshow:false, 
  },
  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = page;
    data.pPageSize = 30;
    data.pSearchName = that.data.searchValue;
    data.pIndustryCode= that.data.IndustryCode == "C1" ?"": that.data.IndustryCode,
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponGiveConfig", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        that.setData({
          couponList: json.data,
          isshow:false,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.couponList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

        that.setData({
          couponList: newlists,
          lastpage: json.pageCount //你的总页数   
        });
      }

    } else {
      if (page == 1) {
        that.setData({
          couponList: [],
          isshow:true 
        });
      }
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    page = 1;
    that.GetData(page);
    that.GetCouponIndustry();
  },

  onbindblur: function(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  onSearch: function(event) {
    let that = this;
    page = 1;
    that.GetData(page);
  },


  UpdateCouponInfoState:function(e){
    var CouponID = e.currentTarget.dataset.couponid;
    var State = e.currentTarget.dataset.state;
    var data = {};
    data.pCouponID = CouponID;
    data.pState = State;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/UpdateCouponInfoState", "POST", data, app.globalData.appkeyid, this.GetUpdateCouponInfoState)
  },

  GetUpdateCouponInfoState:function(json){
    let that = this;
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      that.GetData();
    }
    wx.showToast({
      title: json.msg,
      icon: 'none',
      duration: 2000
    })
  },

  handleTap: function (e) {
    let that = this
    let id = e.currentTarget.dataset.id;
    var industryCode=id;
    if (id == 1) {
      industryCode = "C1";
    }
      that.setData({
        isshow:false,
        currentId: id,
        IndustryCode: industryCode,
      })      
      page=1,
      that.GetData(page);
  },

  GetCouponIndustry: function () { //获取行业数据
    var datas = {
      pGID: app.globalData.AppGroupInfo.GroupID,
      pGradeID: app.globalData.AppWxUserInfo.GradeID,
      State: 0
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponIndustryView/GetCouponIndustry", "POST", datas, app.globalData.appkeyid, this.GetCouponIndustryList);
  },
  GetCouponIndustryList: function (res) {
    var json = res.data.Data;
    var chat = this;
    var section = [{
      IndustryName: "全部",
      IndustryCode: "C1",      
    }];
    if (json.flag) {

      var newlists = section.concat(json.data) //合并数据 res.data 你的数组数据
      chat.setData({
        section: newlists,
        currentId: chat.data.IndustryCode        
      });
      chat.setData({        
        itemindex:chat.data.IndustryCode
      });
    }
   
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    if (that.data.lastpage > page) {
      page++
      that.GetData(page);
    } else if (that.data.lastpage == page) {
      page++;
      wx.showToast({
        title: '没有更多数据!',
        icon: 'success',
        duration: 2000
      })

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})