// pages/activityDisplay/activityDisplay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[{
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }, {
      name: "我是活动名称",
      address: "我是活动地址",
      introduce: "我是活动备注",
      decideIcon: '../../images/icon-png/选择(未选中).png'
    }],
    decideadd:''   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var activityList=[];
    var that = this;
    var ta=options.click;
    that.setData({
      plan_id:options.plan_id,
      wechat:options.wechat,
      click:options.click
    })
    //console.log(ta)
    //console.log(this.data.array[0].name)
    var resname;
    if(ta==1){
      console.log("66666666666666666666666666666")
    }
    if(ta=='0'||ta=='2'||ta=='3'||ta=='5'||ta=='7'||ta=='8'){
      //console.log("activity")
      wx.request({
        url: 'http://47.94.99.203:5000/activity/0',
        header: {
          'Content-Type': 'json'
        },
        method: 'GET',
        success: function (res) {
          for (var key in res.data.activity) {
            res.data.activity[key]["decideIcon"] = '../../images/icon-png/选择(未选中).png'
            res.data.activity[key]["decideId"] = String(res.data.activity[key].id) + 'l' + String(key)
          }
          that.setData({
            post: res.data.activity
          })
          //this.data["p"]=res.data.activity
          //console.log(res.data.activity)
          //console.log(that.data.post)
        }
      })
    }
    else{
      //console.log("restaurant")
      wx.request({
        url: 'http://47.94.99.203:5000/restaurant/0',
        header: {
          'Content-Type': 'json'
        },
        method: 'GET',
        success: function (res) {
          for (var key in res.data.restaurant) {
            res.data.restaurant[key]["decideIcon"] = '../../images/icon-png/选择(未选中).png'
            res.data.restaurant[key]["decideId"] = String(res.data.restaurant[key].id) + 'l' + String(key)
          }
          that.setData({
            post: res.data.restaurant
          })
          //this.data["p"]=res.data.activity
          //console.log(res.data.activity)
          //console.log(that.data.post)
        }
      })
    }
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
  /**
   * 点击选择
   */
  choose:function (e) {
    var that=this;
    var kind=e.currentTarget.id;
    console.log(kind)
    var str=kind.split("l")
    // console.log(str[0])//id
    // console.log(str[1])//key
    var up='post['+str[1]+'].decideIcon';
    var down;
    //console.log(that.data.post[1].decideIcon)
    if(kind=='add'){
      if(that.data.decideadd==''){
        //提示请选择
        console.log("?????????????")
      }
      else{
        wx.navigateTo({
          url: '../activity/activity?activity=' + that.data.decideadd+'&plan_id='+that.data.plan_id+'&wechat='+that.data.wechat+'&click='+that.data.click,
        })
        //console.log(that.data.decideadd)
      }
    }
    else{
      if (that.data.post[str[1]].decideIcon == '../../images/icon-png/确认.png') {
        that.setData({
          [up]: '../../images/icon-png/选择(未选中).png',
          decideadd: ''
        })
      }
      else {
        for (var key in that.data.post) {
          if (that.data.post[key].decideIcon == '../../images/icon-png/确认.png') {
            down = 'post[' + key + '].decideIcon'
            that.setData({
              [down]: '../../images/icon-png/选择(未选中).png',
            })
          }
        }
        that.setData({
          [up]: '../../images/icon-png/确认.png',
        })
        //str[0]就是当前点击的活动id
        that.setData({
          decideadd: str[0]
        })
      }
    }
  }
})