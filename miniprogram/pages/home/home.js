const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    filmsInfo: [],
    showBacktop: false,
    userInfo: [],
    current: 'time'
  },
  // 获取首页轮播图图片
  getLunbo() {
    wx.cloud.callFunction({
      name: 'getSwiper'
    }).then(res => {
      this.setData({
        banner: res.result.data
      })
    })
  },

  //获取电影列表数据
  getFilms() {
   wx.cloud.callFunction({
     name: 'getFilms',
     data: {
      current: this.data.current
     }
   }).then(res => {
     this.setData({
       filmsInfo: res.result.data
     })
   })
  },
  // 获取首页点击喜欢 更新 数据
  handleHeart(event) {
    let id = event.detail.id
    wx.cloud.callFunction({
      name: 'update',
      data: {
        collection: 'films_topic',
        doc: id,
        data: `{
          heart_num: _.inc(1)
        }`
      }
    }).then(res => {
      let cloneflimsInfo = [...this.data.filmsInfo]
      for(let i = 0; i < cloneflimsInfo.length; i++) {
        if(cloneflimsInfo[i]._id == id) {
          cloneflimsInfo[i].heart_num ++
        }
      }
      this.setData({
        filmsInfo: cloneflimsInfo
      })
    })
  },

  // 获取详情页数据
  handleDetail(event) {
    let id = event.detail.id
    wx.navigateTo({
      url: './detail/detail?filmID=' + id,
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
    this.getLunbo();
    this.getFilms(); 
  },

  /**
   * 
   * 监听页面滚动位置坐标 
   */
  onPageScroll(options) {
    const scrollTop = options.scrollTop;

    const flag = scrollTop >= 800;

    if(flag != this.data.showBacktop) {

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
  handleCurrent(e) {
    let current = e.target.dataset.current
    if(current == this.data.current) {
      return false
    }
    this.setData({
      current
    }, () => {
      this.getFilms();
    })
  }
  
})