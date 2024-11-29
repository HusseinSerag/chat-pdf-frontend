import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home'
import AuthContext from './contexts/auth-context'
import LoadUser from './layouts/load-user'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
     <AuthContext>
      <LoadUser>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home /> } />
          </Routes>
        </BrowserRouter>
      </LoadUser>
     </AuthContext>
    </ClerkProvider>
  </StrictMode>,
)
