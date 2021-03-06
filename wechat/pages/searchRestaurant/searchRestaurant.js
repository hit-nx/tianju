// pages/searchRestaurant/searchRestaurant.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    day:null,
    index:null,
    // array:[{
    //   item:'../../images/photos/餐厅.jpg',
    //   title: "我是餐厅名称",
    //   address: "我是餐厅地址",
    // }, {
    //   item: '../../images/photos/餐厅.jpg',
    //   title: "我是餐厅名称",
    //   address: "我是餐厅地址",
    // }, {
    //   item: '../../images/photos/餐厅.jpg',
    //   title: "我是餐厅名称",
    //   address: "我是餐厅地址",
    // }, {
    //   item: '../../images/icon-png/餐厅-餐厅搜索.png',
    //   title: "我是餐厅名称",
    //   address: "我是餐厅地址",
    // },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
        url: 'http://47.94.99.203:5000/restaurant/0',
        header: {
            'content-type': 'json'
        },
        method:'GET',
        success: function(res){
            console.log(res);
            that.setData({
                array : res.data.restaurant
            })
        },
        fail: function(){
            console.log('----error----')
        },
        complete: function(){
            console.log('----complete----')
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
    wx.navigateBack({
        delta: 1,
    })
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

  // 用户点击具体酒店
  details:function(id){
    var up="array["+id+"].id"
    wx.navigateTo({
      url: '../restaurant/restaurant',
      data:{
        restaurant_id:[up],
        day:
      },
      success: function(res) {
        console.log('--success--')
      },
      fail: function(res) {
        console.log('--fail--')
      },
      complete: function(res) {
        console.log('--complete--')
      },
    })
  }
})