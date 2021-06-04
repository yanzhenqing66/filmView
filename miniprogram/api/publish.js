const db = wx.cloud.database()

export const getMyFilms = (openid, len) => {
  return db.collection('films_topic')
    .where({openid})
    .skip(len)
    .get()
}