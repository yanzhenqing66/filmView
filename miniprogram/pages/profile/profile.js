import {getUser} from '../../api/profile'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "/images/tabbar/profile.png",
    userName: "",
    signature: '',
    disabled: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initUser()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  initUser() {
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then(res => {
      this.getUser({openid: res.result.userInfo.openId})
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
      fail: err => {
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
            userPhoto: res.data[0].avatarUrl,
            userName: res.data[0].nickName,
          }

          wx.setStorageSync('user', user)
        }
      })
  }

})