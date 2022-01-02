import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import '../assets/styles/pages/login.scss'

const Login = () => {
  const { loginWithPopup } = useContext(AuthContext)
  return (
    <div className={'login-container'}>
      <h1 className='login-title'>Hi Talia, please sign in</h1>
      <button className={'login-button'} onClick={loginWithPopup}>
        sign in
      </button>
    </div>
  )
}

export default Login
