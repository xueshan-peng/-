const util = require('../../utils/util.js')
Page({
  /**
 * 页面的初始数据
 */
  data: {
    username: '',
    albums: [],
    crt: "0"
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      username: options.username,
    })
  },
  onReady: function(){
    var that = this;
    wx.request({
        method: 'GET',
        url: 'http://localhost:8080/miniprogram/album.php',
        data: {},
        header: { 'Content-Type': 'application/json' },
        success: function(res) {
          //console.log("返回成功的数据:" + res.data.split('+').match(/\d(.*)/));
          //var albumArr = res.data.split('+');
          //var albumNames = albumArr.match(/\d(.*)/)[1];
          that.setData({ 
            albums: res.data.split('+')
          })
        }
    })
  },
  currentIndex(e){
    var num = e.target.dataset.index;
    var albumName = this.data.albums[num];
    //console.log(albumName);
    this.setData({
      crt:num
    })
    //console.log(num)
    var albumID = num+1;
    //console.log (albumID);
    wx.navigateTo({
      url: '../photo/photo?albumID=' + albumID + '&&albumName=' + albumName + '&&username=' + this.data.username
    })
  }
})