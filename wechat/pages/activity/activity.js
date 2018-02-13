Page({

  
  /**
   * 页面的初始数据
   */
  data: {
    firstTime:'',
    secondTime:'',

    firstDay:[{
      act:'上午',
      title:'',
      add:'',
      Else:'',
      id:0
    }, {
      act: '午餐',
      title: '',
      add: '',
      Else: '',
      id: 0
    }, {
      act: '中午',
      title: '',
      add: '',
      Else: '',
      id: 0
    }, {
      act: '下午',
      title: '',
      add: '',
      Else: '',
      id: 0
    }, {
      act: '晚餐',
      title: '',
      add: '',
      Else: '',
      id: 0
    },],

    secondDay: [{
      act: '上午',
      title: '',
      add: '',
      Else: '',
      id: 0
    }, {
      act: '午餐',
      title: '',
      add: '',
      Else: '',
      id: 0
    }, {
      act: '中午',
      title: '',
      add: '',
      Else: '',
      id: 0
    }, {
      act: '下午',
      title: '',
      add: '',
      Else: '',
      id: 0
    }, {
      act: '晚餐',
      title: '',
      add: '',
      Else: '',
      id: 0
    },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that=this;
    var change='';
    var Day=''
    console.log(options.click+"     "+options.activity)
    
    //console.log(options.plan_id)
    that.setData({
      wechat:options.wechat,
      plan_id:options.plan_id
    })
    function timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = (date.getDate()<10?'0'+(date.getDate()):date.getDate()) + ' ';
     
      return Y + M + D;
    }
    wx.request({
      url: 'http://127.0.0.1:5000/plan?id='+options.plan_id,
      header:{
        'Content-Type': 'json'
      },
      method:'GET',
      success:function(res){
        wx.setNavigationBarTitle({
          title: res.data.name
        })
        var time1= timestampToTime(res.data.date)
        var time2=timestampToTime(res.data.date+86400)
        that.setData({
          firstTime:time1,
          secondTime:time2
        })
        var a = new Array();
        a[0] = options.click == 0 ? options.activity : res.data.activity_one
        a[1] = options.click == 2 ? options.activity : res.data.activity_two
        a[2] = options.click == 3 ? options.activity : res.data.activity_three
        a[3] = options.click == 5 ? options.activity : res.data.activity_four
        a[4] = options.click == 7 ? options.activity : res.data.activity_five
        a[5] = options.click == 8 ? options.activity : res.data.activity_six
        var b = new Array();
        b[0] = 0
        b[1] = 2
        b[2] = 3
        b[3] = 0
        b[4] = 2
        b[5] = 3
        var c = new Array();
        c[0] = options.click == 1 ? options.activity : res.data.restaurant_one
        c[1] = options.click == 4 ? options.activity : res.data.restaurant_two
        c[2] = options.click == 6 ? options.activity : res.data.restaurant_three
        c[3] = options.click == 9 ? options.activity : res.data.restaurant_four
        var d=new Array();
        d[0] = 1
        d[1] = 4
        d[2] = 1
        d[3] = 4
        //获取活动
        wx.request({
          url: 'http://127.0.0.1:5000/activity/0',
          header:{
            'Content-Type':'json'
          },
          method:'GET',
          success:function(res1){
            for(var key=0;key<6;++key){
              for (var i = 0; i < res1.data.activity.length; ++i) {
                if(key<3){
                  Day='firstDay['
                }
                else{
                  Day='secondDay['
                }
                if (a[key] == null) {
                  change = Day + b[key] +'].title'
                  that.setData({
                    [change]: "未选择"
                  })
                  change = Day + b[key] +'].add'
                  that.setData({
                    [change]: ''
                  })
                  change = Day + b[key] +'].Else'
                  that.setData({
                    [change]: ''
                  })
                  change = Day + b[key] + '].id'
                  that.setData({
                    [change]: 0
                  })
                  break;
                }
                if (a[key] == res1.data.activity[i].id) {
                  change = Day + b[key] +'].title'
                  that.setData({
                    [change]: res1.data.activity[i].name
                  })
                  change = Day + b[key] +'].add'
                  that.setData({
                    [change]: ''
                  })
                  change = Day + b[key] +'].Else'
                  that.setData({
                    [change]: "备注:" + res1.data.activity[i].introduce
                  })
                  change = Day + b[key] + '].id'
                  that.setData({
                    [change]: a[key]
                  })
                  break;
                }
              }
            }
            
          }
          
        })
        //获取餐厅
        wx.request({
          url: 'http://127.0.0.1:5000/restaurant/0',
          header:{
            'Content-Type':'json'
          },
          method:'GET',
          success:function(res1){
            for (var key = 0; key < 4; ++key) {
              for (var i = 0; i < res1.data.restaurant.length; ++i) {
                if (key < 2) {
                  Day = 'firstDay['
                }
                else {
                  Day = 'secondDay['
                }
                if (c[key] == null) {
                  change = Day + d[key] + '].title'
                  that.setData({
                    [change]: "未选择"
                  })
                  change = Day + d[key] + '].add'
                  that.setData({
                    [change]: ''
                  })
                  change = Day + d[key] + '].Else'
                  that.setData({
                    [change]: ''
                  })
                  change = Day + d[key] + '].id'
                  that.setData({
                    [change]: 0
                  })
                  break;
                }
                if (c[key] == res1.data.restaurant[i].id) {
                  change = Day + d[key] + '].title'
                  that.setData({
                    [change]: res1.data.restaurant[i].name
                  })
                  change = Day + d[key] + '].add'
                  that.setData({
                    [change]: ''
                  })
                  change = Day + d[key] + '].Else'
                  that.setData({
                    [change]: "备注:" + res1.data.restaurant[i].introduce
                  })
                  change = Day + d[key] + '].id'
                  that.setData({
                    [change]: a[key]
                  })
                  break;
                }
              }
            }
          }
        })
        
      },
      fail:function(){
        //fail
      },
      complete:function(){
        //complete
      }

    })
    
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

  //点击到这个活动
  onclick:function(e){
    var kind=e.currentTarget.id;
    var that=this;
    //console.log(kind)
    wx.navigateTo({
      url: '../activityDisplay/activityDisplay?click='+kind+'&plan_id='+that.data.plan_id+'&wechat='+that.data.wechat,
    })
  },
  save:function(e){
    var that=this
    console.log(that.data.plan_id)
    wx.request({
      url: 'http://127.0.0.1:5000/plan/activity',
      header: {
        'Content-Type': 'application/json'
      },
      data:{
        id:that.data.plan_id,
        wechat:that.data.wechat,
        activity_one: that.data.firstDay[0].id,
        activity_two: that.data.firstDay[2].id,
        activity_three: that.data.firstDay[3].id,
        activity_four: that.data.secondDay[0].id,
        activity_five: that.data.secondDay[2].id,
        activity_six: that.data.secondDay[3].id
      },
      method: 'PUT',
      success:function(res){
        console.log(res.data.message)
        console.log("成功!!")
        //提示保存成功
      }
    })
  }
})