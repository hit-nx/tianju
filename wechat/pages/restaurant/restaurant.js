Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo:'../../images/photos/餐厅.jpg',
    name:'我是餐厅名称',
    location:'我是餐厅地点',
    
    lunchText:'#09b2f0',
    lunchbck:'#ffffff',
    dinnerText:'#ffffff',
    dinnerbck:'#09b2f0',
    date:'2017-09-10'
  },
  /**
   * switch选择
   */
  lunch: function () {
    this.setData({
      lunchbck: '#09b2f0',
      lunchText: '#ffffff',
      dinnerbck: '#ffffff',
      dinnerText: '#09b2f0'
    });
  },
  dinner: function () {
    this.setData({
      dinnerbck: '#09b2f0',
      dinnerText: '#ffffff',
      lunchbck: '#ffffff',
      lunchText: '#09b2f0'
    });
  },
  /**
   * 选择用餐日期
   */
  chooseDay:function(e){
    this.setData({
      date: e.detail.value
    })
  }
})
