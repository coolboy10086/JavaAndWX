// pages/statused/statused.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
init: function () {
  wx.showLoading({
    title: '获取购物车中',
  })
  if (app.globalData.openid == null) {
    setTimeout(() => {
      this.init()
    }, 1000);
  } else {
    if (app.globalData.user == null) {
      wx.switchTab({
        url: '/pages/my/my',
      })
    } else {
      this.getCart()
    }
    wx.hideLoading();
  }
},
getCart: function () {
  wx.request({
    url: app.globalData.BaseURL + '/getCart',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      customerid: app.globalData.user.id
    },
    success: (res) => {
      console.log(res)
      var cartlist = res.data.cartlist;
      var list = [];
      cartlist.forEach((e) => {
        var t = {}; //
        t['selected'] = false;
        t['pname'] = e.name;
        t['url'] = app.globalData.BaseURL + "/upload/" + e.picture;
        t['price'] = e.price;
        t['cnt'] = e.amount;
        t['pid'] = e.id;
        t['status'] = e.status;
        t['amount'] = 100;
        list.push(t);
      });
      this.setData({
        list: list
      })
    },
    fail: err => {
      console.log(err)
    }
  })
},

})


