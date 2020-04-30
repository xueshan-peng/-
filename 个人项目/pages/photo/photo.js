const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    albumID: '',
    albumName: '',
    username: '',
    items: [],
    crt: "0",
    //authorInfo: {}
  },
splash: function(str){
  var s = str.Replace("\"", "");
  return s;
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);
    var that = this;
    that.setData({
      albumID: options.albumID,
      albumName: options.albumName,
      username: options.username,
    });
    that.getPhoto();
    //console.log(getApp().globalData.userInfo);
  },
  getPhoto: function (){
    var that = this;
    wx.request({
      method: 'GET',
      url: 'http://localhost:8080/miniprogram/photo.php',
      data: { albumID: that.data.albumID },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        if (res.data == 0) {
          that.setData({
            showView: true
          })
        } else {
          that.setData({
            items: res.data,
          })
        }
      },
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
    this.getPhoto();
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

  toUpload: function () {
    wx.navigateTo({
      url: '../upload/upload?albumID=' + this.data.albumID + '&&username=' + this.data.username
    })
  },

  preview(e) {
    console.log(e.target.dataset.src);
    this.setData({
      //crt: num
    })
  }
})