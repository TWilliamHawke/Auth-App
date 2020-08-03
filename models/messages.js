const {Schema, model} = require('mongoose')


const messageSchema = new Schema({
  text: String,
  author: String,
  authorAvatar: {type: String, default: 'images\\default-avatar.jpg'},
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Messages', messageSchema)