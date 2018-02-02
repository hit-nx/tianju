Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    switchNeed:'#09b2f0',
    needText:'#ffffff',
    switchIneed:'#ffffff',
    ineedText:'#09b2f0'
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
   * switch选择
   */
  need: function(){
    var bgColor = this.data.switchNeed == '#ffffff' ? '#09b2f0' : '#ffffff';
    // 设置背景颜色数据
    this.setData({
      switchNeed: bgColor
    });
    var textColor = this.data.needText == '#09b2f0' ? '#ffffff' : '#09b2f0';
    this.setData({
      needText: textColor
    });
  },
  ineed: function(){
    var bgColor = this.data.switchIneed == '#ffffff' ? '#09b2f0' : '#ffffff';
    // 设置背景颜色数据
    this.setData({
      switcIneed: bgColor
    });
    var textColor = this.data.ineedText == '#09b2f0' ? '#ffffff' : '#09b2f0';
    this.setData({
      ineedText: textColor
    });
  }
})