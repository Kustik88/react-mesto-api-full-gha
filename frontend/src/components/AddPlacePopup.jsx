import { useRef, useEffect } from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameCardRef = useRef(null)
  const urlCardRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      nameCardRef.current.value = ''
      urlCardRef.current.value = ''
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onAddPlace({
      name: nameCardRef.current.value,
      link: urlCardRef.current.value
    })
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__input-container">
        <input
          type="text"
          ref={nameCardRef}
          className="popup__input"
          name="name"
          id="title-input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required />
        <span className="popup__input-error" id="title-input-error" />
        <input
          type="url"
          ref={urlCardRef}
          className="popup__input"
          name="link"
          id="url-input"
          placeholder="Ссылка на картинку"
          required />
        <span className="popup__input-error" id="url-input-error" />
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup
