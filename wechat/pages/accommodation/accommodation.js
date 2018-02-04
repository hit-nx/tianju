Page({

  /**
   * 页面的初始数据
   */
  data: {
    pullDown: '../../images/icon-png/右箭头.png',
  },

  pullDown: function () {
    var photoUrl = this.data.pullDown == '../../images/icon-png/右箭头.png' ? '../../images/icon-png/下箭头.png' : '../../images/icon-png/右箭头.png'
    this.setData({
      pullDown: photoUrl,
    });
  },
})