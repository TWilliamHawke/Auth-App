const express = require('express')
const mongoose = require('mongoose')
const auth = require('./routes/auth_routes')
const config = require('config')
const user = require('./routes/user_routes')
const path = require('path')

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
    app.listen(5000, () => console.log('servet has running'))

  } catch (e) {
    console.log(e)
    
  }
}


start()