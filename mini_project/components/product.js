// components/product.js
var app = getApp();
Component({
  options: {
    multipleSlots: true //说明组件具备多个插槽的功能
  },
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: ''
    },
    pname: {
      type: String,
      value: '未命名的商品'
    },
    price: {
      type: Number,
      value: 0
    },
    pid: {
      type: Number,
      value: -1
    },
    amount: {
      type: Number,
      value: 10
    },
    discount: {
      type: Boolean,
      value: true
    },
    description: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCart: function (e) {
      console.log();
      var productid = this.data.pid;
      wx.request({
        url: app.globalData.BaseURL + '/addCart',
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded",
          'Cookie': app.globalData.cookie
        },
        data: {
          'productid': productid
        },
        success: res => {
          console.log(res)
          if (res.data.errcode == 0) {
            wx.setTabBarBadge({
              index: 1,
              text: '' + res.data.cnt,
            })
          }
        },
        fail: err => {
          console.log(err)
        }
      })
    }
  }
})