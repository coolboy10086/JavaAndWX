// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        url:this.globalData.BaseURL+'/login',
        method:'POST',
        data:{'code':res.code},
        header:{'content-type':'application/x-www-form-urlencoded'},
        success:res=>{
          console.log(res)
          //以下是没有注册的用户信息
          this.globalData.openid=res.data.openid
          this.globalData.session_key=res.data.session_key;
          //以下是有注册的用户信息
        if(res.data.user !=null&&res.data.cart!=null){
          wx.setTabBarBadge({
            index: 1,
            text: ''+res.data.cart,
          })
        }
        this.globalData.cookie  =res.header['Set-Cookie'].split(";")[0]
        this.globalData.user=res.data.user;//把登录用户的信息保存成全局变量user（这里第一种保存的方式，但是关机重启后不存在）
        wx.setStorageSync('user', res.data.user)//把登录用户的信息保存在手机存储器里，这是第二种保存方式，就算关机再重启后也还在
        },
        fail:err=>{console.log(err)}
      })},
      fail:err=>{console.log(err)}
    })
  },
  globalData: {
    userInfo: null,
    user:null,
    openid:null,
    session_key:null,
    BaseURL:'http://dahle.natapp1.cc/Weixin',
    cookie:""
  }
})
