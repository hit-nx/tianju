// pages/selectRestaurant/selectRestaurant.js
// var app = new 'get'App();
// var nickName = app.globalData.userInfo.nickName;
var plan_id;
var restaurant_one;
var restaurant_two;
var restaurant_three;
var restaurant_four;
var resOneName;
var resOneAddress;
var resOneImg;
var resTwoName;
var resTwoAddress;
var resTwoImg;
var resThreeName;
var resThreeAddress;
var resThreeImg;
var resFourName;
var resFourAddress;
var resFourImg;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // date,
    firstdate:"2017-1-27",
    seconddate:"2017-1-29",
    
    firstDay:[{
      restaurantImg:'../../images/photos/restaurant.jpg',
      meal:'午餐',
      title:'我是餐厅名称',
      address:'我是餐厅地点'
    }, {
      restaurantImg: '../../images/icon-png/酒店搜索+添加餐厅(无图片).png',
      meal: '晚餐',
      title: '我是餐厅名称',
      address: '我是餐厅地点'
    }],

    secondDay: [{
      restaurantImg: '../../images/photos/restaurant.jpg',
      meal: '午餐',
      title: '我是餐厅名称',
      address: '我是餐厅地点'
    }, {
      restaurantImg: '../../images/icon-png/酒店搜索+添加餐厅(无图片).png',
      meal: '晚餐',
      title: '我是餐厅名称',
      address: '我是餐厅地点'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      // url: 'http://47.94.99.203:5000/user/'+nickName,
      url: 'http://47.94.99.203:5000/user/1',
      header: {
        'content-type': 'json'
      },
      method: 'GET',
      success: function(res){
        console.log(res);
        plan_id = res.data.plan_id;
          wx.request({
            url: 'http://47.94.99.203:5000/plan',
            data: {
              id: plan_id
            },
            header: {
              'content-type': 'json'
            },
            method: 'GET',
            success: function (res) {
              console.log(res);
                restaurant_one = res.data.restaurant_one;
                restaurant_two = res.data.restaurant_two;
                restaurant_three = res.data.restaurant_three;
                restaurant_four = res.data.restaurant_four;
                that.setData({
                  date: that.toData(res.data.date),
                  Firstdate: that.toData(res.data.date),
                  Seconddate: that.toData(res.data.date + 86400),
                })
                wx.request({
                  // url: 'http://47.94.99.203:5000/restaurant/'+restaurant_one,
                  url: 'http://47.94.99.203:5000/restaurant/1',
                  header: {
                    'content-type': 'json'
                  },
                  method: 'GET',
                  success: function(res){
                    console.log(res);
                    resOneName = "firstDay["+0+"].title";
                    resOneAddress = "firstDay["+0+"].address";
                    resOneImg = "firstDay[" + 0 +"].restaurantImg";
                    that.setData({
                      [resOneName]: res.data.name,
                      [resOneAddress]: res.data.address,
                      // [resOneImg]:res.data.picture
                    })
                  },
                  fail: function(){
                    console.log('----restaurant one----fial----')
                  },
                  complete: function(){
                    console.log('----restaurant one----complete----')
                  }
                }),
                  wx.request({
                    // url: 'http://47.94.99.203:5000/restaurant/'+restaurant_two,
                    url: 'http://47.94.99.203:5000/restaurant/1',
                    header: {
                      'content-type': 'json'
                    },
                    method: 'GET',
                    success: function (res) {
                      console.log(res);
                      resTwoName = "firstDay[" + 1 + "].title";
                      resTwoAddress = "firstDay[" + 1 + "].address";
                      resTwoImg = "firstDay[" + 1 + "].restaurantImg";
                      that.setData({
                        [resTwoName]: res.data.name,
                        [resTwoAddress]: res.data.address,
                        // [resTwoImg]: res.data.picture
                      })
                    },
                    fail: function () {
                      console.log('----restaurant two----fial----')
                    },
                    complete: function () {
                      console.log('----restaurant two----complete----')
                    }
                  }),
                  wx.request({
                  // url: 'http://47.94.99.203:5000/restaurant/'+restaurant_three,
                  url: 'http://47.94.99.203:5000/restaurant/1',
                    header: {
                      'content-type': 'json'
                    },
                    method: 'GET',
                    success: function (res) {
                      console.log(res);
                      resThreeName = "secondDay[" + 0 + "].title";
                      resThreeAddress = "secondDay[" + 0 + "].address";
                      resThreeImg = "secondDay[" + 0 + "].restaurantImg";
                      that.setData({
                        [resThreeName]: res.data.name,
                        [resThreeAddress]: res.data.address,
                        // [resThreeImg]:res.data.picture
                      })
                    },
                    fail: function () {
                      console.log('----restaurant three----fial----')
                    },
                    complete: function () {
                      console.log('----restaurant three----complete----')
                    }
                  }),
                  wx.request({
                  // url: 'http://47.94.99.203:5000/restaurant/'+restaurant_four,
                  url: 'http://47.94.99.203:5000/restaurant/1',
                    header: {
                      'content-type': 'json'
                    },
                    method: 'GET',
                    success: function (res) {
                      console.log(res);
                      resFourName = "secondDay[" + 1 + "].title";
                      resFourAddress = "secondDay[" + 1 + "].address";
                      resFourImg = "secondDay[" + 1 + "].restaurantImg";
                      that.setData({
                        [resFourName]: res.data.name,
                        [resFourAddress]: res.data.address,
                        // [resFourImg]: res.data.picture
                      })
                    },
                    fail: function () {
                      console.log('----restaurant four----fial----')
                    },
                    complete: function () {
                      console.log('----restaurant four----complete----')
                    }
                  })
            },
            fail: function(){
              console.log('----plan----fail----')
            },
            complete: function(){
              console.log('----plan----complete----')
            }
          })
      },
      fail: function(){
        console.log('----person----fail----')
      },
      complete: function(){
        console.log('----person----complete----')
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // 用户点击修改
  changeday1: function(event){
    wx.navigateTo({
      url: '../searchRestaurant/searchRestaurant?day=1&index=' + event.currentTarget.id,
      success: function(res) {
        console.log(res);
        console.log('----success----')
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  changeday2: function(event){
    wx.navigateTo({
      url: '../searchRestaurant/searchRestaurant?day=2&index=' + event.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 用户点击保存
  save: function (){
    wx.request({
      url: 'http://47.94.99.203:5000/plan',
      data: {
        id:plan_id,
        restaurant_one:restaurant_one,
        restaurant_two:restaurant_two,
        restaurant_three:restaurant_three,
        restaurant_four:restaurant_four
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'PUT',
      success: function(res) {
        console.log(res)
        console.log('--success--')
        // 成功后返回上一页
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})