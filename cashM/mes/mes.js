// cashM/mes/mes.js
let utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "日期",
    currentDate: new Date().getTime(),
    minDate: new Date('2020-01-01').getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    type:0,//0待结算，1佣金收入 2券收入
    Capitaldetailslist:{},
    pageIndex:1,
    pageCount:1,
    MoeryCount:0,
    DataList:{},
    identification:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({MoeryCount:options.MoeryCount,identification:parseInt(options.identification || 0)});
      if(options.type==0){
        this.Incometobereceived();
      }else{
        this.setData({type:options.type});
        if(options.identification==1){
          this.OperatorsIncomedetails();
        }else if(options.identification==2){
          this.CommissionExpenses();
        }else if(options.identification==3){
          this.GetRefunddetails();
        }else{
          this.Query();
        }
        
      }
  },
  //待收入
  Incometobereceived(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={

      GroupID:app.globalData.AppGroupInfo.GroupID,
      startTime:this.data.date=="日期"?"":this.data.date
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/GetIncometobereceived", "POST", data, app.globalData.appkeyid, this.GetIncometobereceived)
  },
  GetIncometobereceived:function(res){
    wx.hideLoading();
    var json=res.data.Data;
    var chat=this;
    if(json.flag){
        chat.setData({
          Capitaldetailslist: json.data || null,
        });
    
    }else{
      chat.setData({Capitaldetailslist:{}});
    }
  },
  Query:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={
      pageIndex:this.data.pageIndex,
      pageSize:10,
      CapitalType:this.data.type,
      GroupID:app.globalData.AppGroupInfo.GroupID,
      startTime:this.data.date=="日期"?"":this.data.date
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/GetIncomedetails", "POST", data, app.globalData.appkeyid, this.GetIncomedetails)
  },
  GetIncomedetails:function(res){
    wx.hideLoading();
    var json=res.data.Data;
    var chat=this;
    if(json.flag){
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList: json.data || null,
          pageCount: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.DataList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          DataList: newlists,
          pageCount: json.pageCount, //你的总页数   
        });
      }
      chat.setData({pageIndex:chat.data.pageIndex+1});
    }else{
      chat.setData({DataList:{}});
    }
  
  },
//运营商结算详细
  OperatorsIncomedetails:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={
      pageIndex:this.data.pageIndex,
      pageSize:10,
      GroupID:app.globalData.AppGroupInfo.GroupID,
      startTime:this.data.date=="日期"?"":this.data.date
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/GetOperatorsIncomedetails", "POST", data, app.globalData.appkeyid, this.GetOperatorsIncomedetails)
  },
  GetOperatorsIncomedetails:function(res){
    wx.hideLoading();
    var json=res.data.Data;
    var chat=this;
    if(json.flag){
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList: json.data || null,
          pageCount: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.DataList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          DataList: newlists,
          pageCount: json.pageCount, //你的总页数   
        });
      }
      chat.setData({pageIndex:chat.data.pageIndex+1});
    }else{
      chat.setData({DataList:{}});
    }
  },
  CommissionExpenses:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={
      pageIndex:this.data.pageIndex,
      pageSize:10,
      GroupID:app.globalData.AppGroupInfo.GroupID,
      startTime:this.data.date=="日期"?"":this.data.date
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/CommissionExpenses", "POST", data, app.globalData.appkeyid, this.GetCommissionExpenses)
  },
  GetCommissionExpenses:function(res){
    wx.hideLoading();
    var json=res.data.Data;
    var chat=this;
    if(json.flag){
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList: json.data || null,
          pageCount: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.DataList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          DataList: newlists,
          pageCount: json.pageCount, //你的总页数   
        });
      }
      chat.setData({pageIndex:chat.data.pageIndex+1});
    }else{
      chat.setData({DataList:{}});
    }
  },
    // 显示日期
    showTime(e) {
      let that = this;
      that.setData({ show: true, hidden: true });
    },
  
    // 日期选择
    confirmDate(e) {
      console.log(e.detail);
      let that = this;
      let timer = e.detail;
      timer = utils.formatTimeyears(timer);
      console.log(timer)
      that.setData({
        date: timer,
        show: false,
        hidden: false,
        idx:0,
        pageIndex:1
      })
     if(that.data.type==0){
      that.Incometobereceived();
     }else{
      if(that.data.identification==0){
        that.Query();
      }else if(that.data.identification==2){
        that.CommissionExpenses();
      }else if(that.data.identification==3){
        that.GetRefunddetails();
      }else{
        that.OperatorsIncomedetails();
      }
     }
    },
    GetRefunddetails:function(){
      wx.showLoading({
        title: '数据加载中...',
      })
      var data={
        pageIndex:this.data.pageIndex,
        pageSize:10,
        GroupID:app.globalData.AppGroupInfo.GroupID,
        startTime:this.data.date=="日期"?"":this.data.date
      };
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/GetRefunddetails", "POST", data, app.globalData.appkeyid, this.Refunddetails)
    },
    Refunddetails:function(res){
      wx.hideLoading();
      var json=res.data.Data;
      var chat=this;
      if(json.flag){
        if (chat.data.pageIndex == 1) {
          chat.setData({
            DataList: json.data || null,
            pageCount: json.pageCount //你的总页数   
          });
        } else {
          //获取上次加载的数据
          var oldlists = chat.data.DataList;
          var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
          chat.setData({
            DataList: newlists,
            pageCount: json.pageCount, //你的总页数   
          });
        }
        chat.setData({pageIndex:chat.data.pageIndex+1});
      }else{
        chat.setData({DataList:{}});
      }
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
    if(options.type==0){
        if(this.data.pageIndex>this.data.pageCount){
          return;
        }
      this.Incometobereceived();
    }else{

      if(this.data.pageIndex>this.data.pageCount){
        return;
      }
      if(this.data.identification==0){
        this.Query();
      }else if(this.data.identification==2){
        this.CommissionExpenses();
      }else if(this.data.identification==3){
        this.GetRefunddetails();
      }else{
        this.OperatorsIncomedetails();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})