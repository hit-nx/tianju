// pages/addsouvenir/addsouvenir.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{
      photo:'../../images/photos/souvenir.jpg',
      name:'我是纪念品的名字',
      choose:'../../images/icon-png/选择(未选中).png'
    }, {
      photo: '../../images/photos/souvenir.jpg',
      name: '我是纪念品的名字',
      choose: '../../images/icon-png/选择(未选中).png'
    }, {
      photo: '../../images/photos/souvenir.jpg',
      name: '我是纪念品的名字',
      choose: '../../images/icon-png/选择(未选中).png'
    }, {
      photo: '../../images/photos/souvenir.jpg',
      name: '我是纪念品的名字',
      choose: '../../images/icon-png/选择(未选中).png'
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
  
  },

  /**
   * 用户点击选择
   */
  choose:function(e){
    var choose = this.data.array[e.currentTarget.id].choose == '../../images/icon-png/选择(未选中).png' ? '../../images/icon-png/选择(选中).png' : '../../images/icon-png/选择(未选中).png'
    var up='array['+e.currentTarget.id+'].choose'
    this.setData({
      [up]:choose
    })
  }
})