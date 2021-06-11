import {
  getFilms,
  getUserInfo
} from '../../api/home'

const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    openid: '',
    filmsInfo: [],
    showBacktop: false,
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

        this.getUserInfo()
        console.log(this.data.filmsInfo);
      })
  },

  // 获取首页点击喜欢 更新 数据
  heartUpd(event) {
    const id = event.detail.id
    if(!this.data.openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      })
      return
    }
    const data = {}
    this.data.filmsInfo.forEach(film => {
      if(film._id === id) {
        if(!film.like_flag) {
          data.heart_num = 1
        }else {
          data.heart_num = -1
        }
      }
    })
    wx.cloud.callFunction({
      name: 'uptHeartNum',
      data: {
        id,
        heart_num: `{heart_num: _.inc(${data.heart_num})}`
      }
    }).then(res => {
      const updated = res.result.stats.updated
      if(updated) {
        const cloneFilms = [...this.data.filmsInfo]
        cloneFilms.forEach(item => {
          if(!item.heart_flag) {
            if(item._id === id) {
              item.like_flag = true
              item.heart_num++ 
              this.updUserLike(this.data.openid, id, 'add')
            }
          }else {
            if(item._id === id) {
              item.like_flag = false
              item.heart_num-- 
              this.updUserLike(this.data.openid, id, 'sub')
            }
          }
        })
        this.setData({
          filmsInfo: cloneFilms
        })
      }
    })
  },

  updUserLike(openid ,id, type) {
    wx.cloud.callFunction({
      name: 'updUserLike',
      data: {
        openid,
        id,
        type
      }
    })
  },

  getUserInfo() {
    if(!this.data.openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      })
      return
    }
    getUserInfo({
      openid: this.data.openid
    }).then(res => {
      res.data[0].likes.forEach(like => {
        this.data.filmsInfo.forEach(film => {
          if(like === film._id) {
            film.like_flag = true
          }else {
            film.like_flag = false
          }
        })
        console.log(this.data.filmsInfo);
      })
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
    const openid = wx.getStorageSync('openid')
    this.setData({
      openid
    })
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
  onPullDownRefresh: function () {
    this.getFilms()
    this.getUserInfo()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getFilms()
    this.getUserInfo()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})