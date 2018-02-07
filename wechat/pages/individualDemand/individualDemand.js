Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstDay:'2017-02-01',
    secondDay:'2017-02-02',
    switchNeed: '#09b2f0',
    needText: '#ffffff',
    switchIneed: '#ffffff',
    ineedText: '#09b2f0',
    pullDown:'../../images/icon-png/右箭头.png',
    showView:'none',
    height:'0%',
    array:[{
      content:'标准间26平方米',
      choose:'../../images/icon-png/选择(未选中).png'
    }, {
      content: '大床房26平方米',
      choose: '../../images/icon-png/选择(未选中).png'
    }, {
      content: '家庭房26平方米',
      choose: '../../images/icon-png/选择(未选中).png'
    }, {
      content: '单人房18平方米',
      choose: '../../images/icon-png/选择(未选中).png'
    },],
  },
  /**
   * onload
   */
  onLoad:function(){
    var index = this.data.array.length * 7.5
    var height = index + '%'
    this.setData({
      height: height
    })
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
  /**
   * 点击下箭头
   */
  pullDown: function () {
    var photoUrl = this.data.pullDown == '../../images/icon-png/右箭头.png' ? '../../images/icon-png/下箭头.png' : '../../images/icon-png/右箭头.png'
    var show = this.data.pullDown == '../../images/icon-png/右箭头.png' ? 'block' : 'none'
    this.setData({
      pullDown: photoUrl,
      showView: show
    });
  },
  /**
   * 选择户型
   */
  choose:function(e){
    var num = this.data.array.length - 1
    for (; num >= 0; num--) {
      var up = 'array[' + num + '].choose'
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
   * 酒店入住时间
   */
  firstDay:function(e){
    this.setData({
      firstDay:e.detail.value
    })
  },
  /**
   * 酒店离店时间
   */
  secondDay:function(e){
    this.setData({
      secondDay: e.detail.value
    })
  }
})