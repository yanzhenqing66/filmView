// components/content/swiper/Swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'banner':{
      type: Array,
      value: 'default value'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperIndex:0
  },
  
  

  

  /**
   * 组件的方法列表
   */
  methods: {
    // 监听轮播图图片变化
    bindchange:function(e){
      this.setData({
        swiperIndex:e.detail.current
      })
    }
  }

 
})
