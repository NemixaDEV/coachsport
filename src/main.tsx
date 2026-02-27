import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './global.css'
import { AuthProvider } from './contexts/AuthContext'

const savedTheme = localStorage.getItem('theme') || 'dark'
const root = document.documentElement
root.classList.remove('dark', 'light')
root.classList.add(savedTheme)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
