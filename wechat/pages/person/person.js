//logs.js
const util = require('../../utils/util.js')
const app=getApp()

Page({

  data: {
    showText: 'block',
    showInput: 'none',
    btnText: '编辑个人信息',
    classnum: '',
    major: '',
    name: '',
    location: '',
    userInfo:[],
    hasUserInfo:false
  },

  onLoad: function () {
    var that=this
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
          wx.request({
            url: 'http://47.94.99.203:5000/user/' + app.globalData.userInfo.nickName,
            header: {
              'content-type': 'json'
            },
            method: 'GET',
            success: function (res) {
              console.log(res);
              if (res.statusCode == 404){
                wx.request({
                  url: 'http://47.94.99.203:5000/user/' + app.globalData.userInfo.nickName,
                  header: {
                    'content-type': 'json'
                  },
                  data: {
                    wechat: app.globalData.userInfo.nickName
                  },
                  method: 'POST',
                  success: function (res) {
                    console.log(res);
                  },
                  fail: function () {
                    console.log('---fail---');
                  },
                  complete: function () {
                    console.log('---complete---');
                  }
                })
              }else{
                that.setData({
                  name: res.data.name,
                  major: res.data.major,
                  classnum: res.data.classnum,
                  location: res.data.college,
                })
              }
            },
            fail: function () {
              console.log('---fail---');
            },
            complete: function () {
              console.log('---complete---');
            }
          })
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
    } else {
      // ???
      wx.getUserInfo({
        success: res => {
          //console.log(res.userInfo)
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
   * 编辑个人信息
   */
  edit: function () {
    var that=this
    if (this.data.btnText == '编辑个人信息') {
      this.setData({
        showText: 'none',
        showInput: 'block',
        btnText: '保存个人信息'
      })
    }
    else {
      this.setData({
        showText: 'block',
        showInput: 'none',
        btnText: '编辑个人信息'
      })
      wx.request({
        url: 'http://47.94.99.203:5000/user/' + app.globalData.userInfo.nickName,
        header: {
          'content-type': 'json'
        },
        data: {
          name: that.data.name,
          major: that.data.major,
          classnum: that.data.classnum,
          college: that.data.location,
        },
        method: 'PUT',
        success: function (res) {
          console.log(res);
        },
        fail: function () {
          console.log('---fail---');
        },
        complete: function () {
          console.log('---complete---');
        }
      })
    }
  },
  /**
   * 修改学校
   */
  locationInput: function (e) {
    this.setData({
      location: e.detail.value
    })
  },
  /**
   * 修改班级
   */
  classInput: function (e) {
    this.setData({
      classnum: e.detail.value
    })
  },
  /**
   * 修改专业
   */
  majorInput: function (e) {
      this.setData({
        major: e.detail.value
      })
  },
  /**
   * 修改姓名
   */
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  loginConfirm: function(){
    console.log("确认登录")
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

})