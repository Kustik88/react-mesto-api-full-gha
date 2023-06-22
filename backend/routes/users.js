const router = require('express').Router()
const auth = require('../middlewares/auth')
const userControllers = require('../controllers/users')
const {
  validateUserParams,
  validateUserBodyForPatchUserInfo,
  validateUserBodyForPatchAvatar,
} = require('../middlewares/validate')

router.use(auth)

router.get('/', userControllers.getUsers)
router.get('/:userId', validateUserParams, userControllers.getUserById)
router.get('/me', userControllers.getUserById)
router.patch('/me', validateUserBodyForPatchUserInfo, userControllers.editUserInfo)
router.patch('/me/avatar', validateUserBodyForPatchAvatar, userControllers.editUserAvatar)

module.exports = router
