const db = wx.cloud.database()
const _ = db.command

export const get = (dataTable, term={}) => {
  return db.collection(dataTable).where({...term}).get()
}

export const update = (dataTable, term={} ,data={}) => {
  return db.collection(dataTable).where(term).update({data: {...data}})
}