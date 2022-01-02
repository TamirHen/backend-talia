import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage'
import './assets/styles/app.scss'
import Pages from './pages/pages'
import Login from './pages/login'
import { AuthContext } from './providers/AuthProvider'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <div className='App'>
      {user ? (
        <Routes>
          <Route path={'/*'} element={<Homepage />} />
          <Route path={'/pages'} element={<Pages />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={'/*'} element={<Login />} />
        </Routes>
      )}
    </div>
  )
}

export default App
