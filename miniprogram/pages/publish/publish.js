Page({
  data: {
    filmsInfo: []
  },

  onLoad: function (options) {

  },

  goUpfile() {
    wx.navigateTo({
      url: 'upfile/upfile',
    })
  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})