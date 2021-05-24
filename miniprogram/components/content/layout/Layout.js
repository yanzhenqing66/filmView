// components/content/layout/Layout.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    'filmsInfo': {
      type: Array,
      value: []
    },
    'userInfo': {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleHeart(e) {
      let { id } = e.currentTarget.dataset
      this.triggerEvent('heartUpd', { id }, {})
    },
    handleDetail(e) {
      let { id } = e.currentTarget.dataset
      this.triggerEvent('enterDetail', {id}, {})
    }
  }
})
