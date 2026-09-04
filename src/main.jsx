import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useContext} from 'react'
import TokenR from './tokenResponse.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <TokenR>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </TokenR>
  </StrictMode>,
)
