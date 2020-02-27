Page({
  data:{
    imgUrls:[
      '/images/img1.jpeg',
      '/images/img2.jpeg',
      '/images/img3.jpeg',
      '/images/img4.jpeg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    imgheights:[],
    imgwidth: 750
,  },

  changeAutoplay: function(){
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

//swiper自适应高度代码参考自https://blog.csdn.net/zhaohanqq/article/details/84256557
  imageLoad: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth; //获取屏幕宽度
    var imgWid = e.detail.width; //图片高度
    var imgHeg = e.detail.height; //图片高度
    this.setData({
      heig: winWid * imgHeg / imgWid + 'px'
    })
  }
})