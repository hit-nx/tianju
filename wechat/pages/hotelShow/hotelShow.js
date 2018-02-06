Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{
      style:'photo',
      photo:'../../images/photos/酒店.jpg',
      name:'我是酒店名称',
      location:'我是酒店地点',
      choose:'../../images/icon-png/选择(未选中).png'
    }, {
      style: 'photo',
      photo: '../../images/photos/酒店.jpg',
      name: '我是酒店名称',
      location: '我是酒店地点',
      choose: '../../images/icon-png/选择(未选中).png'
    }, {
      style: 'photo',
      photo: '../../images/photos/酒店.jpg',
      name: '我是酒店名称',
      location: '我是酒店地点',
      choose: '../../images/icon-png/选择(未选中).png'
    }, {
      style: 'photo',
      photo: '../../images/photos/酒店.jpg',
      name: '我是酒店名称',
      location: '我是酒店地点',
      choose: '../../images/icon-png/选择(未选中).png'
    }, {
      style: 'nophoto',
      photo: '../../images/icon-png/酒店搜索+添加餐厅(无图片).png',
      name: '我是酒店名称',
      location: '我是酒店地点',
      choose: '../../images/icon-png/选择(未选中).png'
    },]
  },
  /**
   * 点击确认icon
   */
  choose: function(e){
    var num = this.data.array.length - 1
    for (; num >= 0; num--) {
      var up = 'array[' + num + '].choose'
      this.setData({
        [up]: '../../images/icon-png/选择(未选中).png'
      })
    }

    var up = 'array[' + e.currentTarget.id + '].choose'
    this.setData({
      [up]: '../../images/icon-png/确认.png'
    })
  }
})