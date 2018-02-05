Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{
      name:'匆匆那年',
      choose:'../../images/icon-png/选择(未选中).png',
    }, {
      name: '民俗',
      choose: '../../images/icon-png/选择(未选中).png',
    }, {
      name: '海洋之旅',
      choose: '../../images/icon-png/选择(未选中).png',
    }, {
      name: '联谊会',
      choose: '../../images/icon-png/选择(未选中).png',
    }, {
      name: '旅游',
      choose: '../../images/icon-png/选择(未选中).png',
    }, ],
    showModal: false,
    showView: 'none',
    photoUrl: '../../images/icon-png/右箭头.png',
    height:'0%',
    camera:'../../images/icon-png/选择(未选中).png',
    cloth: '../../images/icon-png/选择(未选中).png'
  },
  /**
   * onLoad
   */
  onLoad: function () {
    var up=(this.data.array.length+2)*5.2+'%'
    this.setData({
      height:up
    })
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
  },
  /**
   * 选择活动方案
   */
  choose:function (e) {
    var num=this.data.array.length-1
    for(;num>=0;num--){
      var up = 'array['+num+'].choose'
      this.setData({
        [up]: '../../images/icon-png/选择(未选中).png'
      })
    } 
   
    var up = 'array[' + e.currentTarget.id + '].choose'
    this.setData({
      [up]: '../../images/icon-png/选择(选中).png'
    })
  },
  /**
   * 查看活动方案
   */
  look:function (e) {
    console.log(e.currentTarget.id)
  },
  /**
   * 点击住宿地点
   */
  hotelShow:function () {
    wx.navigateTo({
      url: '../hotelShow/hotelShow',
    })
  },
  /**
   * 点击用餐地点
   */
  selectRestaurant:function(){
    wx.navigateTo({
      url: '../selectRestaurant/selectRestaurant',
    })
  },
  /**
   * 点击纪念品选择
   */
  addsouvenir:function(){
    wx.navigateTo({
      url: '../addsouvenir/addsouvenir',
    })
  },
  /**
   * 点击个人需求
   */
  individualDemand:function(){
    wx.navigateTo({
      url: '../individualDemand/individualDemand',
    })
  },
  /**
   * 点击航拍需求
   */
  camera:function() {
    if (this.data.camera =='../../images/icon-png/选择(未选中).png'){
      this.setData({
        camera: '../../images/icon-png/确认.png'
      })
    }
    else{
      this.setData({
        camera: '../../images/icon-png/选择(未选中).png'
      })
    }
  },
  /**
   * 点击集体定制服装需求
   */
  cloth: function () {
    if (this.data.cloth == '../../images/icon-png/选择(未选中).png') {
      this.setData({
        cloth: '../../images/icon-png/确认.png'
      })
    }
    else {
      this.setData({
        cloth: '../../images/icon-png/选择(未选中).png'
      })
    }
  }
})