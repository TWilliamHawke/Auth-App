const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images')
  },
  filename(req, file, cb) {
    const fileExt = file.originalname.split('.').pop()
    const filename = `${req.user.id}-avatar.${fileExt}`
    cb(null, filename)
  }
})

const allowTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
  try {
    if(allowTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  
  } catch(e) {
    console.log(e)
  }
}

module.exports = multer({
  storage,
  fileFilter
})