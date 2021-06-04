import {getSwipers} from '../../../api/home'

Component({
  data: {
    swiperIndex:0,
    banner: []
  },

  lifetimes: {
    attached() {
      this.getSwipers()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSwipers() {
      getSwipers().then(res => {
        this.setData({
          banner: res.data
        })
      })
    },

    // 监听轮播图图片变化
    bindchange:function(e){
      this.setData({
        swiperIndex:e.detail.current
      })
    },

    goDetail(e) {
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: 'detail/detail?filmId=' + id,
      })
    },
  }

 
})
