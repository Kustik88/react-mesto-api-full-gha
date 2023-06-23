const router = require('express').Router()
const routerAuth = require('./auth')
const routerCards = require('./cards')
const routerUsers = require('./users')

router.use('/', routerAuth)
router.use('/users', routerUsers)
router.use('/cards', routerCards)

module.exports = router
