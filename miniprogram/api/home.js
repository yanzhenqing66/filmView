import {get, update} from './index'

const db = wx.cloud.database()

export const getFilms = (current, len) => {
  return db.collection('films_topic')
    .skip(len)
    .orderBy(current, 'desc')
    .get()
}

export const getSwipers = () => {
  return db.collection('films_topic')
    .orderBy('time', 'desc')
    .limit(3)
    .get()
}

export const uptHeartNum = (searchParam, data) => 
  update('films_topic', searchParam, data)

export const getFilmDetail = param => get('films_topic', param)