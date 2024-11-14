// pages/cart/cart.js
var app = getApp();
Page({
  data: {
    sa: false,
    sum: '0.00',
    idx: 0,
    list: []
  },
  menu: function (e) {
    this.setData({
      idx: e.detail.cuerrent
    });
  },
  ch: function (e) {
    this.setData({
      idx: e.currentTarget.dataset.idx
    });
  },
  tellFather: function (e) {
    var param = e.detail;
    // console.log(param)
    this.data.list.forEach((e, idx) => {
      if (e.pid == param.pid) { //就是这个孩子被“打”了
        if (param.type == 'oper') { //修改数量
          e.cnt = param.cnt;
          wx.request({
            url: app.globalData.BaseURL + '/modityCart',
            data: {
              'cartid': param.pid,
              'value': param.value,
              'customerid':app.globalData.user.id
            },
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded",
              'Cookie': app.globalData.cookie
            },
            success: res => {
              console.log(res)
            },
            fail: err => {
              console.log(err)
            }
          })
        }
        if (param.type == 'cs') {
          e.selected = param.selected;
        }
        this.data.list[idx] = e;
      }
    });
    this.setData({
      list: this.data.list
    }); //刷新页面
    this.sumary();


  },
  sumary: function () { //统计金额和数量
    var sum = 0,
      cnt = 0,
      sa = true;
    this.data.list.forEach(e => {
      if (e.status == 0) {
        cnt += parseInt(e.cnt);
      }

      if (e.selected) {
        sum += parseFloat(e.price) * e.cnt;
      } else {
        sa = false;
      }
    });
    sum = sum.toFixed(2) //保留小数两位
    this.setData({
      sum: sum,
      sa: sa
    }); //刷新总金额
    wx.setTabBarBadge({ //刷新购物车图标右上角数值
      index: 1,
      text: cnt + '',
    })
  },
  onLoad() {

  },
  onShow: function () {
    this.init();
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
    this.sumary();
  },
  selectAll: function (e) {
    this.setData({
      sa: !this.data.sa
    }); //是否全选标记为原来的相反
    this.data.list.forEach(e => {
      if(e.status==0){
              e.selected = this.data.sa; //把购物车项的选择状态都改为和sa一致
      }

    });
    this.setData({
      list: this.data.list
    }) //刷新页面上所有的购物车项
    this.sumary(); //重新计算总价和数量
  },
  pay: function (e) {
    let cartidlist = [];
    this.data.list.forEach((e,index) => {
      if (e.selected == true) { console.log(e); cartidlist.push(e.pid); this.setData({[`list[${index}].status`]: 1 }) } })
    console.log(cartidlist);
    wx.request({
      url: app.globalData.BaseURL + '/pay',
      method: 'POST',
      header: { "content-type": "application/x-www-form-urlencoded", 'Cookie': app.globalData.cookie  },
      data: { cartids: cartidlist,customerid: app.globalData.user.id },
      success: res => { wx.showLoading({title: '购买成功'})
        setTimeout(() => { wx.hideLoading()}, 500); },
      fail: err => { console.log(err) }
    })
  }
})