const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth_routes')
const config = require('config')
const user = require('./routes/user_routes')
const path = require('path')
const { ioInit } = require('./ioSocket')

const app = express()
app.use(express.json({ extended: true }))

app.use('/images',express.static(path.join(__dirname, 'images')))


app.use('/api/auth', auth)
app.use('/api/user', user)


const start = async () => {
  const url = config.get('mongoUrl')
  try {
    
    await mongoose.connect(url, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    const server = app.listen(5000, () => console.log('server has running'))
    ioInit(server)
  } catch (e) {
    console.log(e)
    
  }
}


start()