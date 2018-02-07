const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pullDown: '../../images/icon-png/右箭头.png',
    showView: 'none',
    introduce: '居佳联合酒店是一家以四星级标准打造的多功能综合性酒店，酒店集客房、餐饮美食、会议、休闲于一体，是威海市高区一流酒店之一，先进的硬件设备、优质软件服务标准是居佳联合酒店的最大的特色和亮点。',
    name:'我是酒店名称',
    location:'我是酒店地点',
    height:'0%',
    photo:'../../images/photos/酒店.jpg',
    hotelId: null,
    planId: null
  },
  /**
   * onLoad
   */
  onLoad:function () {
    var index=((this.data.introduce.length/25)+1)*4.2
    var height=index+'%'
    this.setData({
      height:height
    })

    var that = this
    //调用user接口得到该用户的plan_id
    wx.request({
      url: 'http://47.94.99.203:5000/user/' + app.globalData.userInfo.nickName,
      method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        //console.log(res.data.plan_id)
        that.setData({
          planId: res.data.plan_id
        })
        //console.log(that.data.planId)

        //调用plan接口得到该plan_id的hotel
        wx.request({
          url: 'http://47.94.99.203:5000/plan',
          method: 'GET',
          data: {
            //wechat: app.globalData.userInfo.nickName
            id: that.data.planId
          },
          header: {
            'content-type': 'json' // 默认值
          },
          success: function (res) {
            //console.log(res.data)
            that.setData({
              hotelId: res.data.hotel
            })
            //console.log(that.data.hotelId)

            //调用hotel接口得到该hotel的全部信息
            wx.request({
              url: 'http://47.94.99.203:5000/hotel/' + that.data.hotelId,
              method: 'GET',
              header: {
                'content-type': 'json' // 默认值
              },
              success: function (res) {
                //console.log(res.data)
                that.setData({
                  name: res.data.name,
                  introduce: res.data.introduce,
                  location: res.data.address,
                  //photo: res.data.picture
                })
              }
            })
          }
        })
      }
    })
    //console.log(this.data.planId)
  },
  /**
   * 点击下拉箭头
   */
  pullDown: function () {
    var photoUrl = this.data.pullDown == '../../images/icon-png/右箭头.png' ? '../../images/icon-png/下箭头.png' : '../../images/icon-png/右箭头.png'
    var show = this.data.pullDown == '../../images/icon-png/右箭头.png' ? 'block' : 'none'
    this.setData({
      pullDown: photoUrl,
      showView: show,
    });
  },
})