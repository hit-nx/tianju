const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: '../../images/photos/餐厅.jpg',
    name: '我是餐厅名称',
    location: '我是餐厅地点',

    lunchText: '#ffffff',
    lunchbck: '#09b2f0',
    dinnerText: '#09b2f0',
    dinnerbck: '#ffffff',
    date: '2017-09-10',
    planId: null,
    restaurantOneId: null,
    restaurantTwoId: null,
    restaurantThreeId: null,
    restaurantFourId: null,
    restaurantOneName: null,
    restaurantTwoName: null,
    restaurantThreeName: null,
    restaurantFourName: null,
    restaurantOneLocation: null,
    restaurantTwoLocation: null,
    restaurantThreeLocation: null,
    restaurantFourLocation: null,
    restaurantOnePhoto: null,
    restaurantTwoPhoto: null,
    restaurantThreePhoto: null,
    restaurantFourPhoto: null,
    planFirstDay: null,
    planSecondDay: null,
    showModal: false
  },
  /**
   * onLoad
   */
  onLoad: function () {
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

        //调用plan接口得到该plan_id的restaurant_one
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
              restaurantOneId: res.data.restaurant_one,
              restaurantTwoId: res.data.restaurant_two,
              restaurantThreeId: res.data.restaurant_three,
              restaurantFourId: res.data.restaurant_four,
              date: that.toData(res.data.date),
              planFirstDay: that.toData(res.data.date),
              planSecondDay: that.toData(res.data.date+86400),
            })
            //console.log(that.data.date)
            //console.log(that.data.restaurantOneId)

            //调用restaurant接口得到该restaurant的全部信息
            wx.request({
              url: 'http://47.94.99.203:5000/restaurant/' + that.data.restaurantOneId,
              method: 'GET',
              header: {
                'content-type': 'json' // 默认值
              },
              success: function (res) {
                //console.log(res.data)
                that.setData({
                  name: res.data.name,
                  restaurantOneName: res.data.name,
                  location: res.data.address,
                  restaurantOneLocation: res.data.address,
                  //photo: res.data.picture,
                  //restaurantOnePhoto: res.data.picture
                }),

                  wx.request({
                    url: 'http://47.94.99.203:5000/restaurant/' + that.data.restaurantTwoId,
                    method: 'GET',
                    header: {
                      'content-type': 'json' // 默认值
                    },
                    success: function (res) {
                      //console.log(res.data)
                      that.setData({
                        restaurantTwoName: res.data.name,
                        restaurantTwoLocation: res.data.address,
                        //restaurantTwoPhoto: res.data.picture
                      })

                      wx.request({
                        url: 'http://47.94.99.203:5000/restaurant/' + that.data.restaurantThreeId,
                        method: 'GET',
                        header: {
                          'content-type': 'json' // 默认值
                        },
                        success: function (res) {
                          //console.log(res.data)
                          that.setData({
                            restaurantThreeName: res.data.name,
                            restaurantThreeLocation: res.data.address,
                            //restaurantThreePhoto: res.data.picture
                          })

                          wx.request({
                            url: 'http://47.94.99.203:5000/restaurant/' + that.data.restaurantFourId,
                            method: 'GET',
                            header: {
                              'content-type': 'json' // 默认值
                            },
                            success: function (res) {
                              //console.log(res.data)
                              that.setData({
                                restaurantFourName: res.data.name,
                                restaurantFourLocation: res.data.address,
                                //restaurantFourPhoto: res.data.picture
                              })
                            }
                          })
                        }
                      })
                    }
                  })
              }
            })
          }
        })
      }
    })

  },

  //时间戳转化为××××-××-××格式
  toData: function (number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return (Y + M + D)
  },

  /**
   * switch选择
   */
  lunch: function () {
    if(this.data.lunchbck == '#ffffff')
    this.setData({
      lunchbck: '#09b2f0',
      lunchText: '#ffffff',
      dinnerbck: '#ffffff',
      dinnerText: '#09b2f0'
    });
    if (this.data.name == this.data.restaurantTwoName) {
      this.setData({
        name: this.data.restaurantOneName,
        location: this.data.restaurantOneLocation,
        //photo: this.data.restaurantOnePhoto
      })
    } else {
      this.setData({
        name: this.data.restaurantThreeName,
        location: this.data.restaurantThreeLocation,
        //photo: this.data.restaurantThreePhoto
      })
    }
  },
  dinner: function () {
    if (this.data.dinnerbck == '#ffffff') {
      this.setData({
        dinnerbck: '#09b2f0',
        dinnerText: '#ffffff',
        lunchbck: '#ffffff',
        lunchText: '#09b2f0'
      });
      if(this.data.name==this.data.restaurantOneName){
        this.setData({
          name: this.data.restaurantTwoName,
          location: this.data.restaurantTwoLocation,
          //photo: this.data.restaurantTwoPhoto
        })
      }else{
        this.setData({
          name: this.data.restaurantFourName,
          location: this.data.restaurantFourLocation,
        //photo: this.data.restaurantFourPhoto
        })
      }
      //console.log(this.data.planFirstDay)
      //console.log(this.data.planSecondDay)
    }
  },
  /**
   * 选择用餐日期
   */
  chooseDay: function (e) {
    if(e.detail.value != this.data.date){
      if (e.detail.value != this.data.planFirstDay && e.detail.value != this.data.planSecondDay){
        this.setData({
          showModal: true
        })
      }else{
        this.setData({
          date: e.detail.value
        })
        if (this.data.date == this.data.planFirstDay) {
          this.setData({
            name: this.data.restaurantOneName,
            location: this.data.restaurantOneLocation,
            //photo: this.data.restaurantOnePhoto,
            lunchbck: '#09b2f0',
            lunchText: '#ffffff',
            dinnerbck: '#ffffff',
            dinnerText: '#09b2f0'
          })
        } else{
          this.setData({
            name: this.data.restaurantThreeName,
            location: this.data.restaurantThreeLocation,
            //photo: this.data.restaurantThreePhoto,
            lunchbck: '#09b2f0',
            lunchText: '#ffffff',
            dinnerbck: '#ffffff',
            dinnerText: '#09b2f0'
          })
        }
      }
    }
  },

  ok: function(){
    this.setData({
      showModal: false
    })
  },

  back: function(e) {
    //console.log(e)
    wx.switchTab({
      url: '../index/index',
    })
  },
})
