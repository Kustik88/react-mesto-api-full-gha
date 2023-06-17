import { useContext } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext)
  const isLiked = card.likes.some(user => user._id === currentUser._id)
  const classNameLikeButton = `card__like-icon ${isLiked && 'card__like-icon_active'}`
  const isOwner = card.owner._id === currentUser._id

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleCardDelete() {
    onCardDelete(card._id)
  }

  return (
    <li className="card">
      {isOwner && <button className="card__delete-btn" aria-label="Удалить" type="button" onClick={handleCardDelete}></button>}
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__heading">{card.name}</h2>
        <div className="card__like-container">
          <button className={classNameLikeButton} aria-label="Нравится" type="button" onClick={handleLikeClick} />
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}
