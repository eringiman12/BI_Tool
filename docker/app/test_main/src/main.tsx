import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import User_Data from './api/User_Data.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <User_Data />
  </StrictMode>,
)
