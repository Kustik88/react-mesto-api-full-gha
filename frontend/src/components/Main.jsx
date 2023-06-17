import { useContext } from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({ listCards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

  const { name, about, avatar } = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
            <button
              className="profile__edit-avatar-btn"
              aria-label="Изменить аватар"
              type="button"
              onClick={onEditAvatar}>
              <img className="profile__avatar" src={avatar} alt={name} />
              <div className="profile__overlay-avatar-btn" />
            </button>
            <div className="profile__info">
              <div className="profile__owner-container">
                <h1 className="profile__owner">{name}</h1>
                <button
                  className="profile__edit-btn"
                  aria-label="Изменить профиль"
                  type="button"
                  onClick={onEditProfile} />
              </div>
              <p className="profile__job">{about}</p>
            </div>
            <button
              className="profile__add-btn"
              aria-label="Добавить место"
              type="button"
              onClick={onAddPlace}
            />
          </section>
          <ul className="cards">
            {listCards.map(card => (
              <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            ))}
          </ul>
    </main>
  );
}

export default Main
