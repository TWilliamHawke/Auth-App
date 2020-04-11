const { Router } = require('express')
const router = Router()
var fileMiddleware = require('../middleware/files')
const auth = require('../middleware/auth_middleware')
const User = require('../models/auth')
const { check, validationResult } =require('express-validator')


router.post('/', auth, fileMiddleware.single('avatar'), async (req,res) => {
try {
  const user = await User.findById(req.user.id)

  if(!user) return res.status(401).json({message: 'User not found'})
  user.avatar = req.file.path
  await user.save()

  res.json({path: req.file.path})
} catch(e) {
  console.log(e)
  res.status(401).json({message: 'invalid images'})
}
})



router.put('/', auth, [check('name').isLength({min: 2})] , async(req, res) => {
  try {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(422).json({message: 'Validator Errors', errors: errors.array()})
    }

    const user = await User.findById(req.user.id)
    if(!user) return res.status(401).json({message: 'User not found'})
  
    user.name = req.body.name
    await user.save()

    res.json({message: 'all right'})

  } catch(e) {
    console.log(e)
    res.status(401).json({message: 'something went wrong'})
  }
})

router.delete('/', auth, async (req, res) => {
  try {
    console.log(req.user.id);
    
    await User.findByIdAndDelete(req.user.id)
    res.json({message: 'all right'})

  } catch(e) {
    console.log(e)
    res.status(401).json({message: 'deleting error'})

  }
})


module.exports = router