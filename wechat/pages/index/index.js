//index.js
//获取应用实例
const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    firstbtn: "分享给好友",
    secondbtn: "取消参与活动",
    showModal: false,
    enterPerson: false,
    joinActivity:false,
    unjoin:false,
    planId:null,
    key:null
  },
  /**
   * onLoad
   */
  onLoad:function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * onShow
   */
  onShow:function(){
    this.setData({
      showModal: false,
      enterPerson: false,
      joinActivity: false,
    })
    var that = this
    wx.request({
      url: 'http://47.94.99.203:5000/user/' + this.data.userInfo.nickName,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 404) {
          that.setData({
            enterPerson: true
          })
        }
        else {
          if (res.data.plan_id == null) {
            that.setData({
              showModal: true
            })
          } else {
            that.setData({
              planId: res.data.plan_id
            })
          }
        }
      },
    })
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
   * 点击取消参加活动
   */
  noActivity: function(){
    this.setData({
      unjoin: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 点击加入一个活动
   */
  onCancel: function () {
    this.setData({
      joinActivity:true,
      showModal:false
    })
  },
  /**
   * 点击创建一个活动
   */
  onConfirm: function () {
    wx.navigateTo({
      url: '../newActivity/newActivity',
    })
    this.hideModal();
  },
  /**
   * 完善用户信息
   */
  enter:function(){
    wx.switchTab({
      url: '../person/person',
    })
    this.setData({
      enterPerson:false
    })
  },
  /**
   * 点击确定加入
   */
  join:function(){
    if(this.data.key==null){
      wx.showToast({
        title: '输入不能为空',
        icon: 'none',
        duration: 1500,
        mask: true,
      })
    }
    else{
      wx.request({
        url: 'http://47.94.99.203:5000/plan?key='+this.data.key,
        method: 'GET',
        header: {
          'content-type': 'json'
        },
        success: function (res) {
          if(res.statusCode==404){
            wx.showToast({
              title: '激活码不存在',
              icon: 'none',
              duration: 1500,
              mask: true,
            })
          }else{
            var id=res.data.id
            wx.request({
              url: 'http://47.94.99.203:5000/user',
              method:'PUT',
              data:{
                wechat:this.data.userInfo.nickName,
                plan_id:id,
              },
              header: {
                'content-type': 'application/json'
              },
              success:function(res){
                if(res.statusCode==200){
                  wx.showToast({
                    title: '成功加入活动',
                    icon: 'success',
                    duration: 1500,
                    mask: true,
                  })
                }
                else{
                  wx.showToast({
                    title: '加入活动失败，请稍后再试',
                    icon: 'success',
                    duration: 1500,
                    mask: true,
                  })
                }
              }
            })
          }  
        },
      })
    } 
  },
  /**
   * 点击取消加入
   */
  unjoin:function(){
    this.setData({
      joinActivity: false,
      showModal: true
    })
  },
  /**
   * 点击确认取消参加活动
   */
  exit:function(){
    this.setData({
      unjoin:false,
    })
  },
  /**
   * 点击取消取消参加活动
   */
  unexit:function(){
    this.setData({
      unjoin:false,
    })
  },
  /**
   * 点击分享给好友
   */
  share:function(){

  },
  /**
   * 输入活动激活码
   */
  inputChange:function(e){
    this.setData({
      key:e.detail.value,
    })
  },
  /**
   * 点击活动流程
   */
  activity: function () {
    wx.navigateTo({
      url: '../activity/activity',
    })
  },
  /**
   * 点击活动参与人
   */
  participants: function () {
    wx.navigateTo({
      url: '../participants/participants',
    })
  },
  /**
   * 点击个人需求
   */
  individualDemand: function () {
    wx.navigateTo({
      url: '../individualDemand/individualDemand',
    })
  },
  /**
   * 点击住宿
   */
  accommodation: function () {
    wx.navigateTo({
      url: '../accommodation/accommodation',
    })
  },
  /**
   * 点击用餐
   */
  selectRestaurant: function () {
    wx.navigateTo({
      url: '../selectRestaurant/selectRestaurant',
    })
  },
  /**
   * 点击纪念品
   */
  souvenir: function () {
    wx.navigateTo({
      url: '../souvenir/souvenir',
    })
  },
})