Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan_id:"1",
    array:[{
      user:'发起人',
      small:'发起人'
    }, {
      user:'参与者1',
      small:''
    }, {
      user: '参与者2',
      small: ''
    }, {
      user: '参与者3',
      small: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      plan_id:option.plan_id
    })
    wx.request({
      url: 'http://47.94.99.203:5000/plan/'+plan_id, //仅为示例，并非真实的接口地址
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        // that.setData({
        //   array: res.data.activity,
        // })
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
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})