import React from 'react'
import Form from './Form'

function Login({ onLogin }) {
  return (
    <Form formHeading='Вход' buttonText='Войти' formName='login' onSubmit={onLogin} />
  )
}

export default Login
