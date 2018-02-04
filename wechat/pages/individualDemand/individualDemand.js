Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchNeed: '#09b2f0',
    needText: '#ffffff',
    switchIneed: '#ffffff',
    ineedText: '#09b2f0',
    pullDown:'../../images/icon-png/右箭头.png',
    showView:'none',
    firstchoose: '../../images/icon-png/选择(选中).png',
    secondchoose: '../../images/icon-png/选择(未选中).png',
    threechoose: '../../images/icon-png/选择(未选中).png',
    fourchoose: '../../images/icon-png/选择(未选中).png'
  },
  /**
   * switch选择
   */
  need: function () {
    this.setData({
      switchNeed: '#09b2f0',
      needText:'#ffffff'
    });
    this.setData({
      switchIneed:'#ffffff',
      ineedText:'#09b2f0'
    });
  },
  ineed: function () {
    this.setData({
      switchIneed: '#09b2f0',
      ineedText: '#ffffff'
    });
    this.setData({
      switchNeed: '#ffffff',
      needText: '#09b2f0'
    });
  },
  pullDown: function () {
    var photoUrl = this.data.pullDown == '../../images/icon-png/右箭头.png' ? '../../images/icon-png/下箭头.png' : '../../images/icon-png/右箭头.png'
    var show = this.data.pullDown == '../../images/icon-png/右箭头.png' ? 'block' : 'none'
    this.setData({
      pullDown: photoUrl,
      showView: show
    });
  },
})