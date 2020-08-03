const { Schema, model, Types} = require('mongoose')

const sessionsSchema = new Schema({
  user: {type: Types.ObjectId, ref: 'User'},
  date: Number
})

module.exports = model('Session', sessionsSchema)