import React, {useState} from 'react'
import {login} from '../services/login'
import localstorage from '../utils/localstorage'
import PropTypes from 'prop-types'

const LoginForm = ({onLoginSuccess}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const resetForm = () => {
    setUsername('')
    setPassword('')
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({username: username, password: password})
      const token = user.token
      const name = user.name
      const id = user.id

      if (!token) {
        console.log('fail')
        return null
      }
      localstorage.saveItem('access_token', token)
      localstorage.saveItem('user', {username, name, id})

      onLoginSuccess({username, name, id})
      console.log('login success')
      resetForm()
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        setErrorMessage(e.response.data.error)
      }
    }
  }

  const updateNewValue = (e) => {
    const fieldName = e.target.name
    const value = e.target.value
    if (fieldName === 'username') {
      setUsername(value)
    } else if (fieldName === 'password') {
      setPassword(value)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={updateNewValue}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={updateNewValue}
        />
      </div>
      <div>
        <span className={'login-error-message'}>{errorMessage}</span>
      </div>
      <button type="submit">login</button>
    </form>
  )
}
LoginForm.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
}

export default LoginForm
