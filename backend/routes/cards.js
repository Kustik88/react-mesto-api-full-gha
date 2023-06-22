const router = require('express').Router()
const auth = require('../middlewares/auth')
const cardsControllers = require('../controllers/cards')
const { validateCardBodyForPost, validateCardParams } = require('../middlewares/validate')

router.use(auth)
router.get('/', cardsControllers.getCards)
router.post('/', validateCardBodyForPost, cardsControllers.createCard)
router.delete('/:cardId', validateCardParams, cardsControllers.deleteCard)
router.put('/:cardId/likes', validateCardParams, cardsControllers.likeCard)
router.delete('/:cardId/likes', validateCardParams, cardsControllers.dislikeCard)

module.exports = router
