const { loginUser, registerUser, updateUser } = require('../controllers/userController')

const router = require('express').Router()



router.post('/Login', loginUser)
router.post('/Register', registerUser)

// router.put('/profile', updateUser)

module.exports = router