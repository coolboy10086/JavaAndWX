var app=getApp();
Page({
  data:{
    list:[1,4,6,3,11,7,8,4],
    plist:[{
      pname:'广东工程职业技术学院广州校区',
      url:'https://www.gdep.edu.cn/images/20/05/09/180dcpcz0t/1.jpg',
      price:'0.99',
      pid:'0',
      amount:1000,
      discount:true
    }]
  },
  onLoad:function(){//窗口加载的时候自动运行此函数，所以场用来初始化数据
    wx.showLoading({
      title: '正在加载商品',
    })
wx.request({//向服务器请求
  url:app.globalData.BaseURL+'/getProduct',//请求地址
  data:{},
  method:'GET',//请求方式
  header:{},//配合请求方式的请求头配置信息
  success:res=>{//成功返回时调用的函数
    console.log(res)//把结果赋值给plist
    var data=res.data;//后端数据
    var plist=[];//前端数据
    data.forEach((e)=>{var p={};//初始化商品，从后端接口开始转换给前端
    p['pname']=e.name;p['url']=app.globalData.BaseURL+'/upload/'+e.picture;p['price']=e.price;p['pid']=e.id;p['amount']=e.amount; p['description']=e.description;
      plist.push(p);//压倒前端列表
    });
    this.setData({plist:plist});//刷新页面数据
  },
  fail:err=>{
    console.log(err);
    wx.showToast({
      title: '加载失败！',
    })
  },//失败时返回的回调函数
  complete:result=>{
    wx.showToast({
      title: '商品加载完成',
    })
  }//完成返回时回调的函数
})
  },
  aaa:function(e){
    //跳转到普通页
    var v=e.currentTarget.dataset.baby;
    if(v%2==1){
    wx.navigateTo({url:'/pages/logs/logs?param='+v//相当于网页设计中的window.location.hreef='url'
    
  })
}else{
  wx.switchTab({
    url: '/pages/cart/cart',
  })
}
    //跳转到tab页
    // wx.switchTab({
    //   url: '/pages/cart/cart',
    // })
  }
})