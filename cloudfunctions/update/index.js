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
    if(typeof event.data == 'string') {
      event.data = eval('(' + event.data + ')' );
    }

    return await db.collection(event.collection).doc(event.doc)
    .update({
      data: {
        ...event.data
      },
    })
  } catch(e) {
    console.error(e)
  }
}