import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Estilos: primero Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
//bootstrap-icons:
import 'bootstrap-icons/font/bootstrap-icons.css'

// import './index.css'
import './styles/theme.css'   // ← aquí pega paleta “Bosque” y utilidades

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)