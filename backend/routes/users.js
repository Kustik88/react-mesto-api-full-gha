const router = require('express').Router()
const auth = require('../middlewares/auth')
const userControllers = require('../controllers/users')
const {
  validateUserParams,
  validateUserBodyForSignUp,
  validateUserBodyForSignIn,
  validateUserBodyForPatchUserInfo,
  validateUserBodyForPatchAvatar,
} = require('../middlewares/validate')

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт')
  }, 0)
})
router.post('/signup', validateUserBodyForSignUp, userControllers.createUser)
router.post('/signin', validateUserBodyForSignIn, userControllers.loginUser)

router.use(auth)

router.get('/users', userControllers.getUsers)
router.get('/users/:userId', validateUserParams, userControllers.getUserById)
router.get('/users/me', userControllers.getUserById)
router.patch('/users/me', validateUserBodyForPatchUserInfo, userControllers.editUserInfo)
router.patch('/users/me/avatar', validateUserBodyForPatchAvatar, userControllers.editUserAvatar)

module.exports = router
