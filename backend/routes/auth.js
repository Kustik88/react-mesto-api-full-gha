const router = require('express').Router()
const userControllers = require('../controllers/users')
const {
  validateUserBodyForSignUp,
  validateUserBodyForSignIn,
} = require('../middlewares/validate')

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт')
  }, 0)
})
router.post('/signup', validateUserBodyForSignUp, userControllers.createUser)
router.post('/signin', validateUserBodyForSignIn, userControllers.loginUser)

module.exports = router
