
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      userName: app.userInfo.userName
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleIpt(e) {
    let value = e.detail.value
    this.setData({
      userName: value
    })
  },
  handleSub() {
    this.updateUserName()
  },
  updateUserName() {
    wx.showLoading({
      title: '更新中..',
    })
    
    db.collection('users').doc(app.userInfo._id).update({
      data: {
        userName: this.data.userName
      }
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '更新成功',
      })
      app.userInfo.userName = this.data.userName
    })
  },
  bindGetUserInfo(e) {
    let userInfo = e.detail.userInfo;
    if(userInfo) {
      this.setData({
        userName: userInfo.nickName
      }, () => {
        this.updateUserName()
      })
    }
   
  }
})