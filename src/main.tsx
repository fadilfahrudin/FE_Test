import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/main.css"
import MainRoutes from './routes/MainRoutes.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  </StrictMode>
)
