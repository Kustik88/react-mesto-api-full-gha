const cardModel = require('../models/card')
const {
  OK,
  CREATED,
} = require('../constants/statusCodes')

const NotFoundError = require('../errors/NotFoundError')
const ForbiddenError = require('../errors/ForBiddenError')

const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => res.send(cards))
    .catch(next)
}

const createCard = (req, res, next) => {
  const { name, link } = req.body
  const owner = req.user._id
  cardModel.create({ name, link, owner })
    .then((newCard) => res.status(CREATED).send(newCard))
    .catch(next)
}

const deleteCard = (req, res, next) => {
  cardModel
    .findOne({ _id: req.params.cardId })
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка c таким id не найдена'))
      }
      if (card.owner.toString() !== req.user._id) {
        return next(new ForbiddenError('Вы не являетесь владельцем карточки'))
      }
      return card.deleteOne()
        .then(() => res.send(card))
    })

    .catch(next)
}

const updateCard = (req, res, next, method, status) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { [method]: { likes: req.user._id } },
    {
      new: true,
    },
  )
    .orFail(() => next(new NotFoundError('Карточка c таким id не найдена')))
    .then((card) => res.status(status).send(card))
    .catch(next)
}

const likeCard = (req, res, next) => {
  updateCard(req, res, next, '$addToSet', CREATED)
}

const dislikeCard = (req, res, next) => {
  updateCard(req, res, next, '$pull', OK)
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
