const app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstDay:'2017-02-01',
    secondDay:'2017-02-02',
    switchNeed: '#09b2f0',
    needText: '#ffffff',
    switchIneed: '#ffffff',
    ineedText: '#09b2f0',
    pullDown:'../../images/icon-png/right.png',
    showView:'none',
    height:'0%',
    roomInfo:[],
    array:[{
      choose:'../../images/icon-png/unselected.png'
    }, {
      choose: '../../images/icon-png/unselected.png'
    }, {
      choose: '../../images/icon-png/unselected.png'
    }, {
      choose: '../../images/icon-png/unselected.png'
    },],
    plan_id:null,
    needCar: true,
    date_in:null,
    date_out:null,
    choose_room:null
  },
  /**
   * onload
   */
  onLoad:function(){
    var index = this.data.array.length * 7.5
    var height = index + '%'
    this.setData({
      height: height
    })
    var that = this
    /*通过nickName得到plan_id*/
    wx.request({
      url: 'http://47.94.99.203:5000/user/' + app.globalData.userInfo.nickName,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          plan_id: res.data.plan_id
        })
      },
      fail: function () {
        console.log('---fail---');
      },
      complete: function () {
        console.log('---complete---');
      }
    })
  },
  /**
   * switch选择
   */
  need: function () {
    this.setData({
      switchNeed: '#09b2f0',
      needText:'#ffffff',
      needCar:true
    });
    this.setData({
      switchIneed:'#ffffff',
      ineedText:'#09b2f0',
    });
    console.log(this.data.needCar)
  },
  ineed: function () {
    this.setData({
      switchIneed: '#09b2f0',
      ineedText: '#ffffff'
    });
    this.setData({
      switchNeed: '#ffffff',
      needText: '#09b2f0',
      needCar:false
    });
    console.log(this.data.needCar)
  },
  /**
   * 点击下箭头
   */
  pullDown: function () {
    var photoUrl = this.data.pullDown == '../../images/icon-png/right.png' ? '../../images/icon-png/down.png' : '../../images/icon-png/right.png'
    var show = this.data.pullDown == '../../images/icon-png/right.png' ? 'block' : 'none'
    this.setData({
      pullDown: photoUrl,
      showView: show
    });
    var that = this;
    if (this.data.pullDown == '../../images/icon-png/down.png'){
      wx.request({
        url: 'http://47.94.99.203:5000/hotelRoom/0',
        header: {
          'content-type': 'json'
        },
        method: 'GET',
        success: function (res) {
          console.log(res);
          that.setData({
            roomInfo: res.data.list
          })
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
   * 选择户型
   */
  choose:function(e){
    console.log(e)
    var num = this.data.array.length - 1
    for (; num >= 0; num--) {
      var up = 'array[' + num + '].choose'
      this.setData({
        [up]: '../../images/icon-png/unselected.png'
      })
    }
    var up = 'array[' + e.currentTarget.id + '].choose'
    this.setData({
      [up]: '../../images/icon-png/selected.png',
      choose_room: parseInt(e.currentTarget.id)+1,
    })
    console.log(this.data.choose_room)
  },
  /**
   * 酒店入住时间
   */
  firstDay:function(e){
    var that=this
    that.setData({
      firstDay:e.detail.value
    })
    var date1 = new Date(Date.parse(that.data.firstDay.replace(/-/g, "/")));
    that.setData({
      date_in: date1.getTime()
    })
    console.log(that.data.date_in)
  },
  /**
   * 酒店离店时间
   */
  secondDay:function(e){
    var that=this
    that.setData({
      secondDay: e.detail.value
    })
    var date2 = new Date(Date.parse(that.data.secondDay.replace(/-/g, "/")));
    that.setData({
      date_out: date2.getTime()
    })
    console.log(that.data.date_out)
  },

  save:function(){
    var that=this
    wx.request({
      url: 'http://47.94.99.203:5000/plan/room',
      header: {
        'content-type': 'json'
      },
      data: {
        plan:that.data.plan_id,
        participant_wechat: app.globalData.userInfo.nickName,
        room:that.data.choose_room,
        date_in:that.data.date_in,
        date_out: that.data.date_out,
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
    if (that.data.needCar == true){
      wx.request({
        url: 'http://47.94.99.203:5000/plan/personal',
        header: {
          'content-type': 'json'
        },
        data: {
          plan: that.data.plan_id,
          participant_wechat: app.globalData.userInfo.nickName,
          personal: 1,
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
      wx.request({
        url: 'http://47.94.99.203:5000/plan/personal',
        header: {
          'content-type': 'json'
        },
        data: {
          plan: that.data.plan_id,
          participant_wechat: app.globalData.userInfo.nickName,
          personal: 1,
        },
        method: 'DELETE',
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
  }
})