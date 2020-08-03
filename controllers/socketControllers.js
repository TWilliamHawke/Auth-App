const Message = require('../models/messages')

const sendMessage = async (socket, data) => {
  try {
    const message = await new Message(data)
    socket.emit('sendMessage', message)
    await message.save()
  } catch(e) {
    console.log(e)
  }
}

const getOldMessages = async (socket, data) => {
  const messages = await Message.find({}).sort('-date').limit(10)
  socket.emit('getOldMessages', messages || [])
}

const deleteMessage = async (socket, id) => {
  try {
    //await Message.findByIdAndDelete(id)
    socket.emit('deleteMessageS', id)
  } catch(e) {
    console.log(e)
  }
}

module.exports = {
  sendMessage,
  getOldMessages,
  deleteMessage
}