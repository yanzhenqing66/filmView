// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    if (typeof event.heart_num === 'string') {
      event.heart_num = eval('('+ event.heart_num + ')')
    }

    return db.collection('films_topic')
      .doc(event.id)
      .update({
        data: {
          ...event.heart_num,
        }
      })
  } catch (error) {
    return error
  }




}