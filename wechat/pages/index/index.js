//index.js
//获取应用实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    firstbtn: "分享给好友",
    secondbtn: "取消参与活动",
  },
  /**
   * 点击个人需求
   */
  individualDemand: function () {
    wx.navigateTo({
      url: '../individualDemand/individualDemand',
    })
  },
  /**
   * 点击纪念品
   */
  souvenir: function () {
    wx.navigateTo({
      url: '../souvenir/souvenir',
    })
  }
})