import { getMyFilms } from '../../api/publish'

Page({
  data: {
    filmsInfo: []
  },

  onLoad: function (options) {
    this.getMyFilms()
  },

  getMyFilms() {
    const openid = wx.getStorageSync('openid')
    const len = this.data.filmsInfo.length
    getMyFilms(openid, len).then(res => {
      this.setData({
        filmsInfo: res.data
      })
    })
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