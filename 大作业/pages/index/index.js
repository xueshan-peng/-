//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indexPhotoList: [],
    tabIndex: 0,
    showView: false,
    motto: 'Hi，欢迎使用赏花限定小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  tabHandle: function (e) {
    this.tabIndex = e.currentTarget.dataset.idx;

    if (this.tabIndex == 1) {
      this.getIndexPhotoList();
    }

    this.setData({
      tabIndex: this.tabIndex
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //删除
  bindDelete: function (e) {
    var that = this;
    var idx = e.target.dataset.index;
    var url = that.data.indexPhotoList[idx].imageUrl.substring(34);
    wx.request({
      url: 'http://localhost:8080/miniprogram/delete.php',
      method: 'GET',
      data: {
        url: url
      },
      header: { 'Content-Type': 'application/json;charset=utf-8' },
      success: function (res) {
        console.log(res.data);
        if (res.data == 1){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            mask: true,
            duration: 1000
          })
          that.getIndexPhotoList();
        } else if (res.data == 0){
          wx.showToast({
            title: '删除失败',
            icon: 'warn',
            mask: true,
            duration: 1000
          })
        }
      }
    })
  },
  //获取照片列表
  getIndexPhotoList: function () {
    let _this = this;

    wx.request({
      url: 'http://localhost:8080/miniprogram/userphoto.php',
      method: 'GET',
      data: {
        username: this.data.userInfo.nickName
      },
      header: { 'Content-Type': 'application/json;charset=utf-8' },
      success: function (res) {
          //console.log(res.data);
          _this.setData({
            indexPhotoList: res.data,
          })
      }
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        showView: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          showView: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            showView: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      showView: true
    })
  },
})
