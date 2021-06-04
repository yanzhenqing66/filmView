// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()
  return await cloud.database().collection('films_topic').add({
    data: {
      ...event, 
      time: Date.now(), 
      heart_num: 0, 
      heart_flag: false,
      openid: OPENID
    }
  })
  
}