Page({
  data: {
    array1: [{
      message: '2016-2017社会工作单项奖学金',
    }, {
      message: '2017-2018校级二等奖学金'
    }],

    array2: [{
      message: 'GPA：3.6',
    }, {
      message: '雅思：8.0'
    },{
      message: '考试最高分：98',
    }],

    checked1: false,
    checked2:false,
    i: 1,
    j: 1,
  },

  checkScholarship: function(){
    var that = this;
    if(that.data.i == 1){
      that.data.i = 2,
      that.setData({
        checked1: true,
      })
    } else {
      that.data.i = 1,
      that.setData({
        checked1: false,
      })
    }
  },

  checkGrades: function () {
    var that = this;
    if (that.data.j == 1) {
      that.data.j = 2,
        that.setData({
          checked2: true,
        })
    } else {
      that.data.j = 1,
        that.setData({
          checked2: false,
        })
    }
  },
  
}
)

/*var pageData = {
  data: {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  }
}
*/