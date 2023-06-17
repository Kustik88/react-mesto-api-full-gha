import React from "react"

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image popup_background-blackout_hard${card.link ? ' popup_opened' : ""}`}>
      <figure className="popup__figure">
        <button className="popup__close-btn" aria-label="Закрыть" type="button" onClick={onClose} />
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup
