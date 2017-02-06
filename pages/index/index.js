//index.js
//获取应用实例
var app = getApp()
var pos = Object()
var item = Array()
var current = 0
var top = 0
Page({
  data: {
    item: {},
    current: current,
    top: 0
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //初始化数组
    for (let i = 0; i < 16; i++)
      item[i] = ''
    item[Math.round(Math.random() * 16)] = 2

    try {
      top = wx.getStorageSync('top')
    } catch (e) {
      top = 0
    }

    this.setData({
      item: item,
      top: top
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
    if (Math.abs(changeX) < 10 && Math.abs(changeY) < 10)
      return;

    //判断手势
    var changeXY = Math.abs(changeX) > Math.abs(changeY) ? 'x' : 'y'
    if (changeXY == 'x')
      var direction = changeX > 0 ? 'right' : 'left'
    else
      var direction = changeY > 0 ? 'down' : 'up'

    switch (direction) {
      case 'up':
        up()
        break
      case 'down':
        down()
        break
      case 'left':
        left()
        break
      case 'right':
        right()
        break
    }

    //计算当前分数
    current = 0;
    for (let i = 0; i < item.length; i++)
      if (!isNaN(parseInt(item[i])))
        current += item[i]

    //生成一个新的积分块
    var score = Math.ceil(Math.random() * 2) * 2
    for (; ;) {
      var temp = Math.floor(Math.random() * 16)
      if (isNaN(parseInt(item[temp]))) {
        item[temp] = score;
        break;
      }
    }

    top = top > current ? top : (function () {
      wx.setStorageSync('top', current)
      return current
    })()

    //刷新视图数据
    this.setData({
      item: item,
      current: current,
      top: top
    })
  },
})

function up() {
  //整理积分块位置
  for (let i = 4; i < item.length; i++)
    if (item[i] != '')
      for (let j = i - 4; j >= 0; j -= 4)
        item[j] == '' ? (item[j] = item[j + 4]) && (item[j + 4] = '') : -1
  //合并积分块
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      if (item[i + j * 4] == '' || item[i + (j + 1) * 4] == '')
        break;
      if (item[i + j * 4] == item[i + (j + 1) * 4]) {
        item[i + j * 4] += item[i + (j + 1) * 4]
        item[i + (j + 1) * 4] = ''
        j++
      }
    }
  //再次整理积分块位置
  for (let i = 4; i < item.length; i++)
    if (item[i] != '')
      for (let j = i - 4; j >= 0; j -= 4)
        item[j] == '' ? (item[j] = item[j + 4]) && (item[j + 4] = '') : -1
}

function down() {
  //整理积分块位置
  for (let i = 11; i >= 0; i--)
    if (item[i] != '')
      for (let j = i + 4; j < 16; j += 4)
        item[j] == '' ? (item[j] = item[j - 4]) && (item[j - 4] = '') : -1
  //合并积分块
  for (let i = 15; i >= 12; i--)
    for (let j = 0; j < 4; j++) {
      if (item[i - j * 4] == '' || item[i - (j + 1) * 4] == '')
        break;
      if (item[i - j * 4] == item[i - (j + 1) * 4]) {
        item[i - j * 4] += item[i - (j + 1) * 4]
        item[i - (j + 1) * 4] = ''
        j++
      }
    }
  //再次整理积分块位置
  for (let i = 11; i >= 0; i--)
    if (item[i] != '')
      for (let j = i + 4; j < 16; j += 4)
        item[j] == '' ? (item[j] = item[j - 4]) && (item[j - 4] = '') : -1
}

function left() {
  //整理积分块位置
  for (let i = 2; i < 16; i++) {
    if (item[i] != '')
      for (let j = i - 1; j >= Math.floor(i / 4) * 4; j--)
        item[j] == '' ? (item[j] = item[j + 1]) && (item[j + 1] = '') : -1
    i % 4 == 3 ? i++ : -1
  }
  //合并积分块
  for (let i = 0; i < 16; i += 4)
    for (let j = 0; j < 4; j++) {
      if (item[i + j] == '' || item[i + j + 1] == '')
        break;
      if (item[i + j] == item[i + j + 1]) {
        item[i + j] += item[i + j + 1]
        item[i + j + 1] = ''
        j++
      }
    }
  //再次整理积分块位置
  for (let i = 2; i < 16; i++) {
    if (item[i] != '')
      for (let j = i - 1; j >= Math.floor(i / 4) * 4; j--)
        item[j] == '' ? (item[j] = item[j + 1]) && (item[j + 1] = '') : -1
    i % 4 == 3 ? i++ : -1
  }
}

function right() {
  //整理积分块位置
  for (let i = 14; i >= 0; i--) {
    if (item[i] != '')
      for (let j = i + 1; j < (Math.floor(i / 4) + 1) * 4; j++)
        item[j] == '' ? (item[j] = item[j - 1]) && (item[j - 1] = '') : -1
    i % 4 == 0 ? i-- : -1
  }
  //合并积分块
  for (let i = 3; i < 16; i += 4)
    for (let j = 0; j < 4; j++) {
      if (item[i - j] == '' || item[i - j - 1] == '')
        break;
      if (item[i - j] == item[i - j - 1]) {
        item[i - j] += item[i - j - 1]
        item[i - j - 1] = ''
        j++
      }
    }
  //再次整理积分块位置
  for (let i = 14; i >= 0; i--) {
    if (item[i] != '')
      for (let j = i + 1; j < (Math.floor(i / 4) + 1) * 4; j++)
        item[j] == '' ? (item[j] = item[j - 1]) && (item[j - 1] = '') : -1
    i % 4 == 0 ? i-- : -1
  }
}



