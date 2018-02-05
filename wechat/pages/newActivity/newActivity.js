Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    showView: 'none',
    photoUrl: '../../images/icon-png/右箭头.png',
  },
  onLoad: function () {
  },
  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  /**
   * 活动方案右箭头
   */
  pullDown: function () {
    var photo = this.data.photoUrl == '../../images/icon-png/右箭头.png' ? '../../images/icon-png/下箭头.png' : '../../images/icon-png/右箭头.png'
    var show = this.data.photoUrl == '../../images/icon-png/右箭头.png' ? 'block' : 'none'
    this.setData({
      photoUrl:photo,
      showView:show
    })
  }
})