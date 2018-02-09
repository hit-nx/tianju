const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    isuser: false,

    enterPerson:false,
    planId:null,
    plan:null,

    activity:[],

    eat:[],

    souvenir:[],

    hotelName:'酒店名称',
    hotelLocation:'酒店地址'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      planId:options.id
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log('now')
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log('callback')

        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        this.checkUser()
      }
    }
    if (this.data.hasUserInfo == false) {
      wx.showLoading({
        title: '加载个人信息',
        mask: true,
        success: function () {
          console.log('success')
        },
        complete: function () {
          console.log('complete')
        }
      })
      console.log('load结束')
    } else {
      this.checkUser()
    }
    this.planRequest()
  },
  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
  * 检查用户信息
  */
  checkUser: function () {
    if (this.data.isuser == false) {
      console.log('请求')
      console.log('请求' + this.data.userInfo.nickName)
      var that = this
      wx.request({
        url: 'http://47.94.99.203:5000/user/' + encodeURI(that.data.userInfo.nickName),
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          if (res.statusCode != 200) {
            that.setData({
              enterPerson: true
            })
          }
          else {
            that.setData({
              isuser: true,
            })
            if (res.data.plan_id != null && res.data.plan_id != 0) {
              wx.showLoading({
                title: '您已参加其他活动，即将跳往首页！',
                mask:true
              })
              setTimeout(function () {
                wx.hideLoading()
                wx.switchTab({
                  url: '../index/index',
                })
              }, 5000) 
            } 
          }
        },
      })
    } 
  },
  /**
   * 进入个人中心
   */
  enter:function(){
    wx.switchTab({
      url: '../person/person',
    })
  }, 
  /**
   * 请求活动方案信息
   */
  planRequest:function(){
    var that=this
    wx.request({
      url: 'http://47.94.99.203:5000/plan?id=' + that.data.planId,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        console.log(res)
        if(res.statusCode==200){
          that.setData({
            plan:res.data
          })
          that.load()
        }else if(res.statusCode==400){
          wx.showLoading({
            title: '活动方案不存在',
            mask:true
          })
          setTimeout(function () {
            wx.hideLoading()
            wx.switchTab({
              url: '../index/index',
            })
          }, 5000)
        }else{
          wx.showToast({
            title: '网络请求失败',
            icon:'none',
            duration:1500
          })
        }
      }
    })
  },
  /**
   * 加载活动信息
   */
  load:function(){
    var day=this.data.plan.date
    var firstDay=util.formatDate(day,'Y-M-D')
    var day=this.data.plan.date+86400
    var secondDay=util.formatDate(day,'Y-M-D')
    this.activityRequest(this.data.plan.activity_one, '上午',firstDay)
    this.activityRequest(this.data.plan.activity_two, '中午',firstDay)
    this.activityRequest(this.data.plan.activity_three, '下午',firstDay)
    this.activityRequest(this.data.plan.activity_four, '上午',secondDay)
    this.activityRequest(this.data.plan.activity_five, '中午',secondDay)
    this.activityRequest(this.data.plan.activity_six, '下午',secondDay)
    this.hotelRequest(this.data.plan.hotel)
    this.restaurantRequest(this.data.plan.restaurant_one,'午餐',firstDay)
    this.restaurantRequest(this.data.plan.restaurant_two, '晚餐',firstDay)
    this.restaurantRequest(this.data.plan.restaurant_three, '午餐',secondDay)
    this.restaurantRequest(this.data.plan.restaurant_four, '晚餐',secondDay)
    if(this.data.plan.souvenir.length==0){
      var array = [{
        name: '此活动无纪念品',
      }]
      that.setData({
        souvenir: that.data.souvenir.concat(array)
      })
    }else{
      var num=this.data.plan.souvenir.length-1
      for(;num>=0;num--){
        this.souvenirRequest(this.data.plan.souvenir[num].souvenir)
      }
    }
  },
  /**
   * 请求活动信息
   */
  activityRequest:function(id,time,day){
    var that=this
    wx.request({
      url: 'http://47.94.99.203:5000/activity/'+id,
      method:'GET',
      header: {
        'content-type': 'json'
      },
      success:function(res){
        if(res.statusCode==200){
          
          var array = [{
            day: day,
            time:time,
            name:res.data.name==null?'活动名称':res.data.name,
            location:'活动地点',
            Else:res.data.introduce==null?'活动介绍':res.data.introduce
          }]
          that.setData({
            activity:that.data.activity.concat(array)
          })
        }else if(res.statusCode==400){
          wx.showToast({
            title: '活动不存在',
            icon:'none',
            duration:1500
          })
        }else{
          wx.showToast({
            title: '网络请求失败',
            icon:'none',
            duration:1500
          })
        }
      }
    })
  },
  /**
   * 请求宾馆信息
   */
  hotelRequest:function(id){
    var that = this
    wx.request({
      url: 'http://47.94.99.203:5000/hotel/' + id,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            hotelName:res.data.name,
            hotelLocation:res.data.address
          })
        } else if (res.statusCode == 400) {
          wx.showToast({
            title: '酒店不存在',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '网络请求失败',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  /**
   * 请求餐厅信息
   */
  restaurantRequest:function(id,time,day){
    var that = this
    wx.request({
      url: 'http://47.94.99.203:5000/restaurant/' + id,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var array = [{
            day: day,
            time: time,
            name: res.data.name == null ? '餐厅名称' : res.data.name,
            location: res.data.address==null?'餐厅地址':res.data.address,
          }]
          that.setData({
            eat: that.data.eat.concat(array)
          })
        } else if (res.statusCode == 400) {
          wx.showToast({
            title: '餐厅不存在',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '网络请求失败',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  /**
   * 请求纪念品信息
   */
  souvenirRequest:function(souvenir){
    var that = this
    wx.request({
      url: 'http://47.94.99.203:5000/souvenir/' + souvenir,
      method: 'GET',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var array = [{
            name: res.data.name,
          }]
          that.setData({
            souvenir: that.data.souvenir.concat(array)
          })
        } else if (res.statusCode == 400) {
          wx.showToast({
            title: '纪念品不存在',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '网络请求失败',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })
  },
  /**
   * 点击确认加入活动
   */
  join:function(){
    wx.request({
      url: 'http://47.94.99.203:5000/plan/participant',
      method: 'POST',
      data: {
        participant_wechat: this.data.userInfo.nickName,
        plan: this.data.planId,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) { 
          wx.showToast({
            title: '成功加入活动',
            icon: 'success',
            duration: 1500,
            mask: true,
            complete:function(){
              wx.switchTab({
                url: '../index/index',
              })
            }
          })
        }
        else {
          wx.showToast({
            title: '加入活动失败，请稍后再试',
            icon: 'none',
            duration: 1500,
            mask: true,
          })
        }
      }
    })
  }
})