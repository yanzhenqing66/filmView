import {get, update} from './index'

const db = wx.cloud.database()

export const getFilms = current => {
  return db.collection('films_topic')
    .orderBy(current, 'desc')
    .get()
}

export const getSwipers = () => get('lunbo')

export const uptHeartNum = (searchParam, data) => 
  update('films_topic', searchParam, data)

export const getFilmDetail = param => get('films_topic', param)