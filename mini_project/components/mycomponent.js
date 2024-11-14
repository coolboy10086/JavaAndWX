// components/mycomponent.js
const app = getApp();
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: false
    },
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
    cnt: {
      type: Number,
      value: 1
    },
    pid: {
      type: Number,
      value: -1
    },
    amount: {
      type: Number,
      value: 999
    },
    status:{
      type:Number,
      value:0
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
    cs: function (e) { //选择购物车项时执行的函数
      this.setData({
        selected: !this.data.selected,
        pid:this.data.pid
      });
      this.triggerEvent("tellFather", {
        'pid': this.data.pid,
        'type': 'cs',
        'selected': this.data.selected
      }); //告诉父页面有人“打”我了包括“我”是第几个孩子，怎么打的，打了多少下？状态
    },
    oper: function (e) { //加减购物车项数量时执行的函数
      // console.log(e)
      var v = e.currentTarget.dataset.value;
      var newCnt = parseInt(v) + (this.data.cnt);
      if (newCnt < 1 || newCnt > this.data.amount) return; //增减后数量不能小于0或大于存库量
      this.setData({
        cnt: newCnt
      });
      this.triggerEvent("tellFather", {
        'pid': this.data.pid,
        'type': 'oper',
        'cnt': this.data.cnt,
        "value":parseInt(e.target.dataset.value)
      })
    }
  }
})