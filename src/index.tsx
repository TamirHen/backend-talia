import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import DataProvider from './providers/DataProvider'
import AuthProvider from './providers/AuthProvider'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
