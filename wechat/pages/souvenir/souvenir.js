// pages/souvenir/souvenir.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{
      name: '我是纪念品的名字',
      photo:'../../images/photos/souvenir.jpg'
    }, {
      name: '我是纪念品的名字',
      photo: '../../images/photos/souvenir.jpg'
    }, {
      name: '我是纪念品的名字',
      photo: '../../images/photos/souvenir.jpg'
    }, {
      name: '我是纪念品的名字',
      photo: '../../images/photos/souvenir.jpg'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // wx.request({
    //     url:'http://47.94.99.203/souvenir/0',
    //     header: {
    //         'content-type': 'application/json'
    //     },
    //     method: 'GET',
    //     success: function(res){
    //         console.log(res);
    //         // that.setData({
    //         //     array:res.data
    //         // })
    //     },
    //     fail: function(){
    //         console.log('---fail---');
    //     },
    //     complete: function(){
    //         console.log('---complete---');
    //     }
    // })
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
  
  },
  /**
   * 点击添加按钮
   */
  add: function(){
    wx.navigateTo({
      url: '../addsouvenir/addsouvenir',
    })
  },
  /**
   * 点击垃圾桶
   */
  Delete:function(e){
    var index=e.currentTarget.id
    //通过`index`识别要删除第几条数据，第二个数据为要删除的项目数量，通常为1
    this.data.array.splice(index, 1);

    //渲染数据
    this.setData({
      array: this.data.array
    });
  }
})