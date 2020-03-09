Page({
  data: {   
    scrolls: [
      {
        name: '黄色',
        tag: 'yellow',
      },
      {
        name: '绿色',
        tag: 'green',
      },
      {
        name: '蓝色',
        tag: 'blue',
      },
    ],
    moves: [
      {
        name: '垂直移动',
        tag: 'white',
        direction: 'vertical',
      },
      {
        name: '任意移动',
        tag: 'white',
        direction: 'all',
      },
      {
        name: '水平移动',
        tag: 'white',
        direction: 'horizontal',
      }
    ]
  },
  scroll: function (e) {
    console.log(e)
  },
})