//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    showText:'block',
    showInput:'none',
    btnText:'编辑个人信息',
    location:'哈尔滨工业大学',
    Class:'1211104',
    sex:'男',
    name:'某某某',
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  /**
   * 编辑个人信息
   */
  edit: function () {
    if(this.data.btnText=='编辑个人信息'){
      this.setData({
        showText:'none',
        showInput:'block',
        btnText:'保存个人信息'
      })
    }
    else{
      this.setData({
        showText: 'block',
        showInput: 'none',
        btnText: '编辑个人信息'
      })
    }
  },
  /**
   * 修改工作单位
   */
  locationInput:function (e) {
    this.setData({
      location:e.detail.value
    })
  },
  /**
   * 修改班级
   */
  classInput: function (e) {
    this.setData({
      Class: e.detail.value
    })
  },
  /**
   * 修改性别
   */
  sexInput: function (e) {
    if(e.detail.value!='男'||e.detail.value!='女'){
      this.setData({
        sex: e.detail.value
      })
    }
  },
  /**
   * 修改姓名
   */
  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  }
})
