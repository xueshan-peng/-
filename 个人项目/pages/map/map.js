// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'WU4BZ-IQE6D-7EG44-PWDL6-SOPPT-PGBZJ' // 必填
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 116.4965075,
    latitude: 40.006103,
    markers: [],

    inputShowed: false,
    inputVal: "",
    searchResults: [], //搜索框提示信息
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.inputTips(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true,//高精度定位
      //定位成功，更新定位结果
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude

        that.setData({
          longitude: longitude,
          latitude: latitude,
        })
      },
      //定位失败回调
      fail: function () {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },

      complete: function () {
        //隐藏定位中信息进度
        wx.hideLoading()
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



// 事件触发，调用接口
nearby_search: function() {
  var _this = this;
  // 调用接口
  qqmapsdk.search({
    keyword: '公园',  //搜索关键词
    //location: '39.980014,116.313972',  //设置周边搜索中心点
    success: function (res) { //搜索成功后的回调
      var mks = []
      for (var i = 0; i < res.data.length; i++) {
        mks.push({ // 获取返回结果，放到mks数组中
          title: res.data[i].title,
          id: res.data[i].id,
          latitude: res.data[i].location.lat,
          longitude: res.data[i].location.lng,
          iconPath: "/images/marker.png", //图标路径
          width: 20,
          height: 20
        })
      }
      _this.setData({ //设置markers属性，将搜索结果显示在地图中
        markers: mks
      })
    },
    fail: function (res) {
      console.log(res);
    },
    complete: function (res) {
      console.log(res);
    }
  });
},


  //在Page({})中使用下列代码
  //数据回填方法
  backfill: function (e) {
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.suggestion.length; i++) {
      if (i == id) {
        this.setData({
          backfill: this.data.suggestion[i].title
        });
      }
    }
  },

  //触发关键词输入提示事件
  getsuggest: function (e) {
    var _this = this;
    //调用关键词提示接口
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: e.detail.value, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: function (res) {//搜索成功后的回调
        console.log(res);
        var sug = [];
        for (var i = 0; i < res.data.length; i++) {
          sug.push({ // 获取返回结果，放到sug数组中
            title: res.data[i].title,
            id: res.data[i].id,
            addr: res.data[i].address,
            city: res.data[i].city,
            district: res.data[i].district,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng
          });
        }
        _this.setData({ //设置suggestion属性，将关键词搜索结果以列表形式展示
          suggestion: sug
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  },

  search(param) {
    var that = this
    this.setData({
      markers: [],
    })
    qqmapsdk.search({
      keyword: param,
      success: function (res) {
        console.log(res);
        var mks = []
        for (var i = 0; i < res.data.length; i++) {
          mks.push({
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: '../../images/marker.png',
            width: 20,
            height: 20,
            callout: {
              content: res.data[i].title + '\n' + '(' + res.data[i].address + ')' || '',
              fontSize: 12,
              bgColor: "#FFF",
              borderWidth: 1,
              borderColor: "#CCC",
              padding: 4,

              textAlign: "center"
            }
          })
        }
        that.setData({
          markers: mks

        })

      }
    })
  },
  //搜索提示搜索关键字
  inputTips(param) {
    var that = this

    qqmapsdk.getSuggestion({
      keyword: param,
      success: function (res) {
        // console.log(res)
        that.setData({
          searchResults: res.data
        })
      }
    })
  },
  select(e) {
    //console.log(e.currentTarget.dataset.object);
    this.setData({
      markers: [],
    })
    var obj = e.currentTarget.dataset.object;
    let mks = []
    var selmk = {
      title: obj.title,
      id: obj.id,
      latitude: obj.location.lat,
      longitude: obj.location.lng,
      iconPath: '../../images/marker.png',
      width: 20,
      height: 20,
      callout: {
        content: obj.title + '\n' + '(' + obj.address + ')' || '',
        fontSize: 12,
        bgColor: "#FFF",
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 4,
        display: "ALWAYS",
        textAlign: "center"
      }
    }
    mks.push(selmk);
    //console.log(mks);
    this.setData({
      markers: mks,
    })
    this.hideInput();
  },
  //根据经纬度获取地址信息
  reverseGeocoder(lat, long) {
    var that = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: long
      },
      success: function (res) {
        console.log(res);

        let mks = []
        var selmk = {
          title: res.result.address,

          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          iconPath: '../../img/marker_red.png',
          width: 20,
          height: 20


        }
        mks.push(selmk);
        //console.log(mks);
        that.setData({
          markers: mks
        })
      }
    })
  },
  tapMark(e) {
    console.log(e)
    var mks = this.data.markers
    console.log(mks)
    var that = this
    for (var i = 0; i < mks.length; i++) {
      if (mks[i].id == e.markerId) {
        that.setData({
          toLat: mks[i].latitude,
          toLng: mks[i].longitude
        })
      }
    }

  },
})