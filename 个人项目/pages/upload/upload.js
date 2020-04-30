const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images:[],
    description: '',
    albumID: '',
    username: '',
    useravatar: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        //console.log('用户信息', res.userInfo.avatarUrl)
        //that.globalData.userInfo = res.userInfo.nickName
        that.setData({
          username: res.userInfo.nickName,
          useravatar: res.userInfo.avatarUrl
        })
      }
    });
    that.setData({
      albumID: options.albumID,
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

  bindinput: function(e){
    this.setData({
      description: e.detail.value
    });
    //console.log(this.data.description)
  },
  
  addImg: function(){
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        that.setData({
          images: res.tempFilePaths
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
      }
    })
  },

  removeImg(e) {
    var idx = e.target.dataset.index;
    this.data.images.splice(idx, 1);
    var removed = this.data.images;
    //var removed = this.data.images.slice(idx, 1);
    this.setData({
      images: removed
    })
  },

  uploadImg: function(){

    for (let path of this.data.images) {
      //console.log(path);
      wx.uploadFile({
        url: 'http://localhost:8080/miniprogram/upload.php', //开发者服务器的 url
        filePath: path, // 要上传文件资源的路径 String类型！！！
        name: 'file', // 文件对应的 key ,(后台接口规定的关于图片的请求参数)
        header: {'content-type': 'multipart/form-data'}, // 设置请求的 header
        formData: {'description': this.data.description,
                    'albumID': this.data.albumID,
                    'username':this.data.username,
                    'useravatar': this.data.useravatar}, // HTTP 请求中其他额外的参数
        success: function (res) {
          console.log("返回成功的数据:" + res.data);
          //var result = res.data.split('+');
          //console.log(result);
          if (res.data == 1) {
            console.log("yes");
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              mask: true,
              duration: 10000
            })
            setTimeout(function () {
              wx.hideToast();
              wx.navigateBack({});
            }, 1000)

          } else if (res.data == 0) {
            wx.showToast({
              title: '上传失败',
              icon: 'warn',
              mask: true,
              duration: 1000
            })
          }
          
        },
        fail: function (res) {

        }
      })
      
    }
  }

})