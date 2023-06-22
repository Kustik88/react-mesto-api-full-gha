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

router.get('/', userControllers.getUsers)
router.get('/:userId', validateUserParams, userControllers.getUserById)
router.get('/me', userControllers.getUserById)
router.patch('/me', validateUserBodyForPatchUserInfo, userControllers.editUserInfo)
router.patch('/me/avatar', validateUserBodyForPatchAvatar, userControllers.editUserAvatar)

module.exports = router
