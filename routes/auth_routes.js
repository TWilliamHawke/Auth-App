const {Router} = require('express')
const User = require('../models/auth')
const bcrypt = require('bcryptjs')
const config = require('config')
const { validationResult, check } = require('express-validator')
const jwt = require('jsonwebtoken')

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
  res.status(400).json({message: 'error'})
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
    const tokenDie = Date.now() + 3000*1000


    res.json({userData: {name: user.name, avatar: user.avatar, email},
              tokenData: {token, refToken, tokenDie}})

  } catch(e) {
    console.log(e)
    res.status(400).json({message: 'error'})
  }
})

router.post('/refresh', async(req, res) => {
  try {
    const {refToken} = req.body


    const {id} = jwt.verify(refToken, config.get('secretRef'))

    const newRef = jwt.sign({id}, config.get('secretRef'))
    const token = jwt.sign({id}, config.get('secret'), {expiresIn: '1h'})
    const tokenDie = Date.now() + 3000*1000

    res.json({token, refToken: newRef, tokenDie})
  
  }catch(e) {
    console.log(e)
    return res.status(401).json({message: 'You are not authorise'})
  }
})

module.exports = router