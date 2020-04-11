const {Schema, model} = require('mongoose')

const auth = new Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  avatar: String
})

module.exports = model('Users', auth)