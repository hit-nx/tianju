// pages/activityDisplay/activityDisplay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }],   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://47.94.99.203:5000/activity/0', //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          array:res.data.activity,
        })
      },
      fail: function () {
        console.log("error")
      }
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */


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
  
  },
  /**
   * 点击选择
   */
  choose:function (e) {
    var up = "array[" + e.currentTarget.id + "].decideIcon";
    if (this.data.array[e.currentTarget.id].decideIcon == '../../images/icon-png/选择(未选中).png'){
      this.setData({
        [up]:'../../images/icon-png/确认.png',
      })
    }
    else{
      this.setData({
        [up]: '../../images/icon-png/选择(未选中).png',
      })
    }
  },
  decideAdd:function(){
    var that = this;
    wx.request({
      url: 'http://47.94.99.203:5000/activity/0', //仅为示例，并非真实的接口地址
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        "name":this.data.array.name,
        "introduce": this.data.array.introduce,
        "pic": this.data.array.decideIcon
      },
      success: function () {
        console.log("ojbk");
      },
      fail: function () {
        console.log("error")
      }
    })
  }
})