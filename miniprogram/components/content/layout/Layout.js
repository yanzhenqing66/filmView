Component({
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

  methods: {
    handleHeart(e) {
      let { id } = e.currentTarget.dataset
      this.triggerEvent('heartUpd', { id })
    },

    goDetail(e) {
      let { id } = e.currentTarget.dataset
      this.triggerEvent('goDetail', { id })
    }
  }
})
