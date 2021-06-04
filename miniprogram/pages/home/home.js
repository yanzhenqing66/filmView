import {
  getFilms,
  uptHeartNum
} from '../../api/home'

const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    filmsInfo: [],
    showBacktop: false,
    userInfo: [],
    current: 'time',
    showFoot: true,
    filmLen: 1
  },

  handleCurrent(e) {
    let current = e.target.dataset.current
    if (current == this.data.current) {
      return false
    }
    this.data.filmsInfo = []
    this.setData({
      current
    }, () => {
      this.getFilms();
    })
  },

  getFilms() {
    if(this.data.filmLen <= 0) return
    const len = this.data.filmsInfo.length
    this.selectComponent("#loading").showLoad()
    getFilms(this.data.current, len)
      .then(res => {
        this.selectComponent("#loading").hideLoad()
        if(res.data.length <= 0)  {
          this.data.filmLen = 0
        }
        this.setData({
          filmsInfo: this.data.filmsInfo.concat(res.data)
        })
      })
  },

  // 获取首页点击喜欢 更新 数据
  heartUpd(event) {
    const id = event.detail.id
    const data = {}
    this.data.filmsInfo.forEach(film => {
      if(film._id === id) {
        if(!film.heart_flag) {
          data.heart_num = _.inc(1)
          data.heart_flag = true
        }else {
          data.heart_num = _.inc(-1)
          data.heart_flag = false
        }
      }
    })
    uptHeartNum({
      _id: id
    }, data).then(() => {
      this.getFilms()
    })
  },

  goDetail(event) {
    let id = event.detail.id
    wx.navigateTo({
      url: 'detail/detail?filmId=' + id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFilms()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    await this.getFilms()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getFilms()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})