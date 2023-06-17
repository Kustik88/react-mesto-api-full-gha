import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import InfoToolTips from './InfoToolTips'
import ProtectedRouteElement from './ProtectedRoute';
import api from '../utils/Api'
import * as ApiAuth from '../utils/ApiAuth'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Register from './Register';
import Login from './Login';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isInfoToolTipPopupOpen, setisInfoToolTipPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' })
  const [currentUser, setCurrentUser] = useState({})
  const [userData, setUserData] = useState({ email: '' })
  const [cards, setCards] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistration, setIsRegistration] = useState(false)
  const [isSuccessSubmit, setIsSuccessSubmit] = useState(false)
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const tokenLocal = localStorage.getItem('token')
    setToken(tokenLocal)
  }, [])

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }
    ApiAuth.getUserData(token)
      .then(res => {
        setUserData({ email: res.data.email })
        setIsLoggedIn(true)
        setIsRegistration(false)
        navigate('/')
      })
      .catch(err => displayError(err))
      .finally(() => setIsLoading(false))
  }, [token, navigate])

  useEffect(() => {
    Promise.all([api.getCurrentUser(), api.getCards()])
      .then(([dataCurrentUser, dataCards]) => {
        setCurrentUser(dataCurrentUser)
        setCards(dataCards)
      })
      .catch(err => displayError(err))
  }, [])

  function displayError(err) {
    console.log(err)
  }

  function registerUser(email, password) {
    ApiAuth.register(email, password)
      .then(() => {
        setIsSuccessSubmit(true)
        setisInfoToolTipPopupOpen(true)
        setIsRegistration(!isRegistration)
        navigate('/sign-in')
      })
      .catch(err => {
        setIsSuccessSubmit(false)
        setisInfoToolTipPopupOpen(true)
        displayError(err)
      })
  }

  function authorizeUser(email, password) {
    ApiAuth.authorize(email, password)
      .then(res => {
        localStorage.setItem('token', res.token)
        setToken(res.token)
      })
      .catch(err => {
        setIsSuccessSubmit(false)
        setisInfoToolTipPopupOpen(true)
        displayError(err)
      })
  }

  function logOut() {
    localStorage.token = ''
    setToken(localStorage.token)
    setIsLoggedIn(false)
  }

  function handleHeaderLinkClick() {
    setIsRegistration(!isRegistration)
  }

  function handleUpdateUser(props) {
    api.editUserInfo(props)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => displayError(err))
  }

  function handleUpdateAvatar(url) {
    api.editAvatarProfile(url)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => displayError(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    (isLiked
      ? api.unlikeCard(card._id)
      : api.likeCard(card._id))
      .then(newCard => setCards(cards => cards.map(c => c._id === newCard._id ? newCard : c)))
      .catch(err => displayError(err))
  }

  function handleCardAdd(card) {
    api.addCard(card)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => displayError(err))
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => setCards(cards => cards.filter(card => card._id !== cardId)))
      .catch(err => displayError(err))
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setisInfoToolTipPopupOpen(false)
    setSelectedCard({ name: '', link: '' })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleCardAdd} />
        <InfoToolTips isOpen={isInfoToolTipPopupOpen} isSuccessSubmit={isSuccessSubmit} onClose={closeAllPopups} />
        <PopupWithForm title='Вы уверены' name='delete-card' buttonText='Да' classPopupContainer='popup__container_size_small' />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Header
          isLoggedIn={isLoggedIn}
          isRegistration={isRegistration}
          userEmail={userData.email}
          onLinkClick={isLoggedIn ? logOut : handleHeaderLinkClick} />
        <Routes>
          <Route path='/sign-in' element={<Login onLogin={authorizeUser} />} />
          <Route path='/sign-up' element={<Register onSignUp={registerUser} onLinkClick={handleHeaderLinkClick} />} />
          <Route path='/' element={
            <ProtectedRouteElement
              element={Main}
              isLoggedIn={isLoggedIn}
              listCards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />}
          />
          <Route path="/" element={
            isLoggedIn
              ? <Navigate to='/' />
              : <Navigate to='/sign-in' />
          } />
        </Routes>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
