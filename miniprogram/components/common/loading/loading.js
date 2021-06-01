// components/common/loading/loading.js
Component({
  data: {
    loading: false
  },

  methods: {
    showLoad() {
      this.setData({
        loading: true
      })
    },

    hideLoad() {
      this.setData({
        loading: false
      })
    }
  }
})
