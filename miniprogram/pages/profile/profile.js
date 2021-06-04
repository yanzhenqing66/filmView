import {getUser} from '../../api/profile'

Page({
  data: {
    userPhoto: "/images/tabbar/profile.png",
    userName: "",
    signature: '',
  },

  onLoad: function (options) {
    this.initUser()
  },

  onShareAppMessage: function () {

  },

  initUser() {
    wx.showLoading({
      title: 'loading...',
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then(res => {
      this.getUser({openid: res.result.userInfo.openId})
      wx.hideLoading()
    })
  },

  login() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: res => {
        wx.cloud.callFunction({
          name: 'login',
          data: {...res.userInfo, time: Date.now()}
        }).then(res => {
          this.getUser({_id: res.result._id})
        })
      },
      fail: () => {
        wx.showToast({
          title: '授权登录失败',
          icon: 'error'
        })
      }
    })
  },

  getUser(trem={}) {
    getUser(trem)
      .then(res => {
        if(res.data.length>0) {
          this.setData({
            userPhoto: res.data[0].avatarUrl,
            userName: res.data[0].nickName,
          })

          const user = {
            userAvatar: res.data[0].avatarUrl,
            userName: res.data[0].nickName,
          }

          wx.setStorageSync('user', user)
          wx.setStorageSync('openid', res.data[0].openid)
        }
      })
  }

})