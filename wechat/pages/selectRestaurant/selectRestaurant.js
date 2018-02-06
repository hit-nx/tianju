// pages/selectRestaurant/selectRestaurant.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstdate:"2017-1-27",
    seconddate:"2017-1-29",
    
    firstDay:[{
      lunchImg:'../../images/photos/餐厅.jpg',
      lunch:'午餐',
      title:'我是餐厅名称',
      address:'我是餐厅地点'
    }, {
      lunchImg: '../../images/icon-png/酒店搜索+添加餐厅(无图片).png',
      lunch: '晚餐',
      title: '我是餐厅名称',
      address: '我是餐厅地点'
    }],

    secondDay: [{
      lunchImg: '../../images/photos/餐厅.jpg',
      lunch: '午餐',
      title: '我是餐厅名称',
      address: '我是餐厅地点'
    }, {
      lunchImg: '../../images/icon-png/酒店搜索+添加餐厅(无图片).png',
      lunch: '晚餐',
      title: '我是餐厅名称',
      address: '我是餐厅地点'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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