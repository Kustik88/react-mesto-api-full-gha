import { useEffect, useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = ''
    }
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar(avatarRef.current.value)
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='avatar-edit'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      classPopupContainer='popup__container_size_average'>
      <div className="popup__input-container">
        <input
          type="url"
          ref={avatarRef}
          className="popup__input"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на картинку"
          required />
        <span className="popup__input-error" id="avatar-input-error" />
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
