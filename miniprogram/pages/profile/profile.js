const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhoto: "/images/tabbar/profile.png",
    userName: "",
    signature: "",
    logged: false,
    disabled: true
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
    wx.cloud.callFunction({
      name: 'login',
      data: {}
    }).then(res => {
      db.collection('users').where({
        _openid: res.result.openid
      }).get().then(res => {    
        if (res.data.length) {
          app.userInfo = Object.assign(app.userInfo, res.data[0]);
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            userName: app.userInfo.userName,
            signature: app.userInfo.signature,
            logged: true
          })
        } else {
          this.setData({
            disabled: false
          })
        }
      })
    })
  },

  onShow: function () {
    this.setData({
      userName: app.userInfo.userName,
      userPhoto: app.userInfo.userPhoto,
      signature: app.userInfo.signature
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindGetUserInfo(e) {
    let userInfo = e.detail.userInfo;
    if (!this.data.logged && userInfo) {
      db.collection('users').add({
        data: {
          userPhoto: userInfo.avatarUrl,
          userName: userInfo.nickName,
          gender: userInfo.gender,
          signature: '',
          weixinNum: '',
          heartNum: '',
          time: new Date()
        }
      }).then(res => {
        console.log(res);
        
        db.collection('users').doc(res._id).get().then(res => {
          app.userInfo = Object.assign(app.userInfo, res.data);
          this.setData({
            userPhoto: app.userInfo.userPhoto,
            userName: app.userInfo.userName,
            logged: true
          })
        })
      })
    }
  },

})