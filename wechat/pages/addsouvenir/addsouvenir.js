// pages/addsouvenir/addsouvenir.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'我是纪念品的名字',
    souvenir1:'../../images/icon-png/选择(未选中).png',
    souvenir2: '../../images/icon-png/选择(未选中).png',
    souvenir3: '../../images/icon-png/选择(未选中).png'
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
  addSouvenir1: function(){
      if (this.data.souvenir1 =='../../images/icon-png/选择(未选中).png'){
          this.setData({
              souvenir1:'../../images/icon-png/选择(选中).png'
          })
      }
      else{
          this.setData({
              souvenir1:'../../images/icon-png/选择(未选中).png'
          })
      }
  },
  addSouvenir2: function () {
      if (this.data.souvenir2 == '../../images/icon-png/选择(未选中).png') {
          this.setData({
              souvenir2: '../../images/icon-png/选择(选中).png'
          })
      }
      else {
          this.setData({
              souvenir2: '../../images/icon-png/选择(未选中).png'
          })
      }
  },
  addSouvenir3: function () {
      if (this.data.souvenir3== '../../images/icon-png/选择(未选中).png') {
          this.setData({
              souvenir3: '../../images/icon-png/选择(选中).png'
          })
      }
      else {
          this.setData({
              souvenir3: '../../images/icon-png/选择(未选中).png'
          })
      }
  }
})