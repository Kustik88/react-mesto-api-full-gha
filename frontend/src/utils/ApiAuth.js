const BASE_URL = 'https://auth.nomoreparties.co'

export function makeRequest(url, method, body, token) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  if (token) {
    options.headers.authorization = `Bearer ${token}`
  }

  return fetch(`${BASE_URL}${url}`, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка ${res.status}`)
    })
}

export function register(email, password) {
  return makeRequest('/signup',
    'POST',
    {
      email,
      password
    },
    ''
  )
}

export function authorize(email, password) {
  return makeRequest(
    '/signin',
    'POST',
    {
      email,
      password
    },
    ''
  )
}

export function getUserData(token) {
  return makeRequest(
    '/users/me',
    'GET',
    null,
    token
  )
}
