import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { EthereumContextProvider } from './Contexts/contractContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EthereumContextProvider>
      <BrowserRouter>
    <App />
      </BrowserRouter>
    </EthereumContextProvider>
  </StrictMode>,
)
