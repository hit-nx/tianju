Page({

  /**
   * 页面的初始数据
   */
  data: {
    pullDown: '../../images/icon-png/右箭头.png',
    showView: 'none',
    introduce: '居佳联合酒店是一家以四星级标准打造的多功能综合性酒店，酒店集客房、餐饮美食、会议、休闲于一体，是威海市高区一流酒店之一，先进的硬件设备、优质软件服务标准是居佳联合酒店的最大的特色和亮点。',
  },

  pullDown: function () {
    var photoUrl = this.data.pullDown == '../../images/icon-png/右箭头.png' ? '../../images/icon-png/下箭头.png' : '../../images/icon-png/右箭头.png'
    var show = this.data.pullDown == '../../images/icon-png/右箭头.png' ? 'block' : 'none'
    this.setData({
      pullDown: photoUrl,
      showView: show,
    });
  },
})