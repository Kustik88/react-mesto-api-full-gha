import React from 'react'
import { Link } from 'react-router-dom'
import Form from './Form'

function Register({ onLinkClick, onSignUp }) {
  return (
    <Form formHeading='Регистрация' buttonText='Зарегистрироваться' formName='reg' onSubmit={onSignUp}>
      <Link to='/sign-in' className='form__enter-link' onClick={onLinkClick}>Уже зарегистрированы? Войти</Link>
    </Form>
  )
}

export default Register
