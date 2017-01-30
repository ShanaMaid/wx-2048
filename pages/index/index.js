//index.js
//获取应用实例
var app = getApp()
var pos = Object();
var item = Array();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    item: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化数组
    for (let i = 0; i < 16; i++) {
      item[i] = ' '
    }
    that.setData({
      item: item
    })
  },
  scrollstart: function (e) {
    var start = Object();
    start.x = e.changedTouches[0].clientX
    start.y = e.changedTouches[0].clientY
    pos.start = start
  },
  scrollend: function (e) {
    var end = Object();
    end.x = e.changedTouches[0].clientX
    end.y = e.changedTouches[0].clientY
    pos.end = end

    var changeX = pos.end.x - pos.start.x
    var changeY = pos.end.y - pos.start.y

    if(Math.abs(changeX)<10&&Math.abs(changeY)<10)
    return;

    //生成一个新的积分块
    var score = Math.ceil(Math.random() * 2 ) * 2
    for(;;){
      var temp = Math.floor(Math.random()*16)
      if(isNaN(parseInt(item[temp]))){
        item[temp]=score;
        break;
      }
    }

    //判断手势
    var changeXY = Math.abs(changeX) > Math.abs(changeY) ? 'x':'y'
    if(changeXY=='x')
    var direction = changeX>0?'right':'left'
    else
    var direction = changeY>0?'down':'up'

    console.log(direction)



    console.log(pos)
 
    this.setData({
      item:item
    })
  },
})

function getGesture(pos){

}



