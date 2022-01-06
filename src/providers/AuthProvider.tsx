import React, { Component, createContext } from 'react'
import firebase from 'firebase/app'
import { auth, provider } from '../utils/firebase/Firebase'
import config from '../config.json'

interface AuthProviderInterface {
  user: firebase.User | null
  token: string | undefined
  loginWithPopup: (() => Promise<void>) | undefined
}
const defaultValue = {
  user: null,
  token: undefined,
  loginWithPopup: undefined,
}
export const AuthContext: React.Context<AuthProviderInterface> =
  createContext<AuthProviderInterface>(defaultValue)

class AuthProvider extends Component {
  state = defaultValue

  constructor(props: any) {
    super(props)
    this.loginWithPopup = this.loginWithPopup.bind(this)
  }

  loginWithPopup = async (): Promise<void> => {
    let result
    try {
      await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      result = await auth.signInWithPopup(provider)
      const credential = result.credential as firebase.auth.OAuthCredential
      const token = credential.accessToken
      if (!config.authorizedUsers.includes(result.user?.email as string)) {
        alert('User not authorized')
        throw 'User not authorized'
      }
      this.setState({
        user: result.user,
        token: token,
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{ ...this.state, loginWithPopup: this.loginWithPopup }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthProvider
