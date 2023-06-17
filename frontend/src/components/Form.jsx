import React from "react";
import { useState } from "react";

function Form({ formHeading, buttonText, formName, children, onSubmit, messageError }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    const input = e.target
    setFormValues({
      ...formValues,
      [input.name]: input.value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onSubmit(formValues.email, formValues.password)
  }

  return (
    <form className='form' onSubmit={handleSubmit} noValidate>
      <h2 className="form__heading">{formHeading}</h2>
      <div className="form__input-container">
        <input
          type="email"
          value={formValues.email}
          onChange={handleChange}
          className="form__input"
          name='email'
          id={`email-input-${formName}`}
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required />
        {/* <span className="form__input-error" id={'email-input-' + formName + '-error'} /> */}
        <input
          type="password"
          value={formValues.password}
          onChange={handleChange}
          className="form__input"
          name='password'
          id={`password-input-${formName}`}
          placeholder="Пароль"
          minLength="7"
          maxLength="30"
          required />
        {/* <span className="form__input-error" id={'password-input-' + formName + '-error'} /> */}
      </div>
      <button type="submit" className="form__submit-btn">{buttonText}</button>
      {children}
    </form>
  )
}

export default Form
