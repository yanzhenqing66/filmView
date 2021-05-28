import {
  getFilms,
  getSwipers,
  uptHeartNum
} from '../../api/home'

const db = wx.cloud.database()
const _ = db.command
Page({

  data: {
    banner: [],
    filmsInfo: [],
    showBacktop: false,
    userInfo: [],
    current: 'time'
  },

  getSwipers() {
    getSwipers().then(res => {
      this.setData({
        banner: res.data
      })
    })
  },

  handleCurrent(e) {
    let current = e.target.dataset.current
    if (current == this.data.current) {
      return false
    }
    this.setData({
      current
    }, () => {
      this.getFilms();
    })
  },

  getFilms() {
    getFilms(this.data.current)
      .then(res => {
        this.setData({
          filmsInfo: res.data
        })
      })
  },

  // 获取首页点击喜欢 更新 数据
  heartUpd(event) {
    let id = event.detail.id
    const data = {
      heart_num: _.inc(1)
    }
    uptHeartNum({
      _id: id
    }, data).then(res => {
      const cloneflimsInfo = [...this.data.filmsInfo]
      for (let i = 0; i < cloneflimsInfo.length; i++) {
        if (cloneflimsInfo[i]._id === id) {
          cloneflimsInfo[i].heart_num++
        }
      }
      this.setData({
        filmsInfo: cloneflimsInfo
      })
    })
  },

  goDetail(event) {
    let id = event.detail.id
    wx.navigateTo({
      url: 'detail/detail?filmId=' + id,
    })
  },

  // 获取用户信息
  getUsers() {
    db.collection('users').field({
      userName: true,
      userPhoto: true
    }).get().then(res => {
      this.setData({
        userInfo: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwipers();
    this.getFilms();
  },

  /**
   * 
   * 监听页面滚动位置坐标 
   */
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    const flag = scrollTop >= 800;
    if (flag !== this.data.showBacktop) {
      this.setData({
        showBacktop: flag
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})