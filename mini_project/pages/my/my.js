// pages/my/my.js
var app = getApp();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    birth: '2022-09-01',
    place: ["广东省", "广州市", "天河区"],
    user: null,
    openid: null
  },
  goToCart: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },
  goToStatused: function () {
    wx.navigateTo({
      url: '/pages/statused/statused'
    })
  },
  baby: function (e) {
    var data = e.detail.value;
    if (data.realname.length < 3 || data.username.length < 3 || data.password.length < 3) {
      wx.showToast({title: '用户名密码长度少于3位',icon: 'none'})
      return;}
    if (data.password != data.password2) {
      wx.showToast({title: '两次密码不一致',icon: 'none'})
      return;}
    if (!/^1[3-9]\d{9}$/.test(data.mobile)) {
      wx.showToast({title: '手机号码格式不正确',icon: 'none'})
      return; }
    wx.request({
      url: app.globalData.BaseURL + '/bindU',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded'},
      data: data,
      success: (res) => {
        if (res.data.errcode != null && res.data.errcode == 0) {
          this.setData({user: res.data.user})
          app.globalData.user = res.data.user;} else {
          wx.showToast({title: res.data.msg,icon: 'none'})}},
      fail: err => {console.log(err)}})},
  chd: function (e) {
    this.setData({
      birth: e.detail.value
    });
  },
  chp: function (e) {
    this.setData({
      place: e.detail.value
    })
  },
  aaa: function () {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  login: function () {
    wx.showLoading({
      title: '登录中...',})
    if (app.globalData.openid == null) { //如果app.js中的login话没有执行完，则
      setTimeout(this.login, 1000); //一秒钟之后递归调用自己重新判断登录
    } else {
      this.setData({
        openid: app.globalData.openid
      })
      var user = app.globalData.user;
      if (user != null && user != " ") {
        this.setData({
          user: user
        });
        wx.showToast({
          title: '登陆成功',
          icon: 'none'
        })
      } else {
        wx.hideLoading()
      }
    }
  },
  onLoad: function () {
    this.login()
    var map = wx.createMapContext('mymap');
    map.addMarkers({
      markers: [{
          id: 2,
          latitude: '23.135242',
          longitude: '113.576207',
          title: '家',
          label: {
            content: '家',
            color: '#foo',
            fontSize: 14
          },
          iconPath: '/images/Home.png',
          width: '20',
          height: '20'
        },
        {
          id: 3,
          latitude: '22.932723',
          longitude: '115.553104',
          title: '学校',
          label: {
            content: '学校',
            color: '#foo',
            fontSize: 14,
            bgColor: '#00f'
          },
          iconPath: '/images/Home(1).png',
          width: '20',
          height: '20'
        }
      ]
    })
  }

})