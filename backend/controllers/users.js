const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const { JWT_SECRET } = require('../config')
const {
  OK,
  CREATED,
} = require('../constants/statusCodes')

const ExistingEmailError = require('../errors/ExistingEmailError')
const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')

const getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next)
}

const getUserById = (req, res, next) => {
  let userId
  if (req.params.userId === 'me') {
    userId = req.user._id
  } else {
    userId = req.params.userId
  }
  userModel
    .findById(userId)
    .orFail(() => next(new NotFoundError('Пользователь c таким id не найден')))
    .then((user) => res.status(OK).send(user))
    .catch(next)
}

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body
  if (!password) {
    return next(new BadRequestError('Поле "password" является обязательным'))
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      userModel.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((newUser) => res.status(CREATED).send({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          about: newUser.about,
          avatar: newUser.avatar,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ExistingEmailError('Такой пользователь уже существует'))
          }
          next(err)
        })
    })
    .catch(next)
}

const updateUser = (req, res, next, body) => {
  const updateObject = Object.keys(body)
    .reduce((obj, key) => (
      { ...obj, [key]: body[key] }
    ), {})

  userModel.findByIdAndUpdate(req.user._id, updateObject, { new: true, runValidators: true })
    .orFail(() => next(new NotFoundError('Пользователь c таким id не найден')))
    .then((user) => res.status(OK).send(user))
    .catch(next)
}

const editUserInfo = (req, res, next) => {
  const { name, about } = req.body
  updateUser(req, res, next, { name, about })
}

const editUserAvatar = (req, res, next) => {
  const { avatar } = req.body
  updateUser(req, res, next, { avatar })
}

const loginUser = (req, res, next) => {
  const { email, password } = req.body
  return userModel.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      )
      res.send({ token })
    })
    .catch(next)
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUserInfo,
  editUserAvatar,
  loginUser,
}
