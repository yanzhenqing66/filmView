function rules() {
  return [{
      name: 'film_name',
      rules: {
        required: true,
        message: 'idcard必填'
      },
    },
    {
      name: 'title',
      rules: {
        required: true,
        message: '请输入标题'
      }
    }
  ]
}

function initForm() {
  return {
    film_name: undefined,
    title: undefined,
    imgUrl: undefined,
    content: undefined,
    hot_comment: undefined
  }
}

Page({
  data: {
    formData: initForm(),
    rules: rules(),
    error: '',
    files: [],
    picUrl: '',
    contLen: 0,
    hotLen: 0
  },

  onLoad: function (options) {
    this.setData({
      uplaodFile: this.uplaodFile.bind(this)
    })
  },

  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
    if (field === 'content') {
      this.setData({
        contLen: this.data.formData.content.length
      })
    }
    if (field === 'hot_comment') {
      this.setData({
        hotLen: this.data.formData.hot_comment.length
      })
    }
  },

  uplaodFile(files) {
    return new Promise((resolve, reject) => {
      const tempFilePaths = files.tempFilePaths;
      this.setData({
        picUrl: tempFilePaths[0]
      })
      var object = {};
      object['urls'] = tempFilePaths;
      resolve(object);
    })
  },

  async uploadPic() {
    if (!this.data.picUrl) {
      wx.showToast({
        icon: 'error',
        title: '请上传封面',
      })
      return
    }
    const file = this.data.picUrl
    const str = 'film_pic_' +
      Date.now() +
      (Math.random() * 1000).toFixed() +
      file.substring(file.lastIndexOf('.'))

    return await wx.cloud.uploadFile({
      cloudPath: `films_topic/${str}`,
      filePath: file
    })
  },

  submitForm() {


    this.selectComponent('#form').validate(valid => {
      if (valid) {
        wx.showLoading({
          title: '发布中...',
        })

        const user = Object.freeze(wx.getStorageSync('user'))

        if(!user.userName) {
          wx.showToast({
            title: '请先登录',
            icon: 'error'
          })
          return
        }

        if (!this.data.formData.content) {
          wx.showToast({
            icon: 'error',
            title: '请填写简介'
          })
          return
        }

        this.uploadPic()
          .then(res => {
            this.setData({
              ['formData.imgUrl']: res.fileID
            })
            return Promise.resolve()
          }).then(() => {
            wx.cloud.callFunction({
              name: 'uploadFilm',
              data: {
                ...this.data.formData,
                ...user
              }
            }).then(() => {
              wx.hideLoading({
                success: () => {
                  wx.showToast({
                    icon: 'success',
                    title: '发布成功'
                  })
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              })
            })
          })
      }
    })

  },
})