const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()
  if(event.nickName) {
    return await cloud.database().collection('users').add({
      data: {...event, openid: OPENID}
    })
  }
  return event
}

