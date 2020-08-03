const {Router} = require('express')
const User = require('../models/auth')
const bcrypt = require('bcryptjs')
const config = require('config')
const { validationResult, check } = require('express-validator')
const jwt = require('jsonwebtoken')
const Session = require('../models/sessions')

const router = Router()


router.post('/register', [
  check('email', 'incorrect email').normalizeEmail().isEmail(),
  check('password', 'Password is too short').isLength({min: 6}),
  check('name', 'incorrect username').isLength({min: 2})
], async (req,res) => {
try{
  const { email, password, name } = req.body

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(422).json({message: 'Validator Errors', errors: errors.array()})
  }


  const checkExist = await User.findOne({email})

  if(checkExist) {
    return res.status(403).json({message: 'User is already exist'})
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await new User({email, password: hashedPassword, name})
  await user.save()
  
  res.status(201).json(user)

} catch(e) {
  res.status(500).json({message: 'error'})
}
})

router.post('/login', [], async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({email})

    if(!user) {
      return res.status(403).json({message: 'user is not exist'})
    }

    const isPassword = await bcrypt.compare(password, user.password)

    if(!isPassword) return res.status(403).json({message: 'Wrong password'})


    const token = jwt.sign({id: user._id}, config.get('secret'), {expiresIn: '1h'})
    const refToken = jwt.sign({id: user._id}, config.get('secretRef'))
    const expiresIn = Date.now() + 3000*1000

    const sessions = await Session.find({user: user._id})
    if(sessions.length > 4) {
      await Session.deleteMany({user: user._id})
    }

    const session = new Session({user: user._id, date: expiresIn})
    await session.save()


    res.json({userData: {name: user.name, avatar: user.avatar, email},
              tokenData: {token, refToken: session._id, expiresIn}})

  } catch(e) {
    console.log(e)
    res.status(500).json({message: 'error'})
  }
})

router.post('/refresh', async(req, res) => {
  try {
    const {refToken, date} = req.body
    const session = await Session.findById(refToken)

    if(!session || session.date !== date) {
      await Session.findByIdAndDelete(refToken)
      return res.status(401).json({message: 'You are not authorise'})
    }


    const token = jwt.sign({id: session.user}, config.get('secret'), {expiresIn: '1h'})
    const expiresIn = Date.now() + 3000*1000

    session.date = expiresIn
    await session.save()

    res.json({token, refToken, expiresIn})
  
  }catch(e) {
    console.log(e)
    return res.status(401).json({message: 'Some server error'})
  }
})

module.exports = router