import { createRoot } from 'react-dom/client'
import "./styles/main.css"
import MainRoutes from './routes/MainRoutes.tsx'
import { BrowserRouter } from 'react-router-dom'
import ReduxProvider from './components/ReduxProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }}>
    <ReduxProvider>
      <MainRoutes />
    </ReduxProvider>
  </BrowserRouter>
)
