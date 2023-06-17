import React from "react"
import unionSuccess from '../images/union-success.svg'
import unionFailed from '../images/union-failed.svg'

function InfoToolTips({ isOpen, isSuccessSubmit, onClose }) {
  return (
    <section className={`popup popup_type_info-tool-tip ${isOpen ? 'popup_opened' : ""}`}>
      <div className='popup__container popup__container_text-align_center'>
        <button className="popup__close-btn" aria-label="Закрыть" type="button" onClick={onClose} />
        <img className="popup__union-img"
          src={isSuccessSubmit ? unionSuccess : unionFailed}
          alt='соединение' />
        <h2 className="popup__heading popup__heading_position-horizontal_center">
          {isSuccessSubmit
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так. Попробуйте еще раз!'}
        </h2>
      </div>
    </section>
  )
}

export default InfoToolTips
