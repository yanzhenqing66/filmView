// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  if (event.type === 'add') {
    return db.collection('users')
      .where({
        openid: event.openid
      })
      .update({
        data: {
          likes: _.addToSet(event.id)
        }
      })
  } else if (event.type === 'sub') {
    return db.collection('users')
      .where({
        openid: event.openid
      })
      .update({
        data: {
          likes: _.pull(_.in([event.id]))
        }
      })
  }
}