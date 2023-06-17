import React from "react"

function PopupWithForm({ title, name, children, buttonText, classPopupContainer, isOpen, onClose, onSubmit }) {

  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ""}`}>
      <div className={`popup__container ${classPopupContainer}`}>
        <button className="popup__close-btn" aria-label="Закрыть" type="button" onClick={onClose} />
        <form className="popup__form" name={`popup-form-${name}`} onSubmit={onSubmit}>
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button type="submit" className="popup__submit-btn">{buttonText}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm
