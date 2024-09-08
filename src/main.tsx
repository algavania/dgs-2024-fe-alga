import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CategoryProvider } from './contexts/CategoryContext';
import { ExpenseProvider } from './contexts/ExpenseContext';
import { WalletProvider } from './contexts/WalletContext';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CategoryProvider>
      <ExpenseProvider>
        <WalletProvider>
          <App />
        </WalletProvider>
      </ExpenseProvider>
    </CategoryProvider>
  </StrictMode>,
)
