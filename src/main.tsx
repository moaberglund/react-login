import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/main.scss'
import { router } from './routing.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  ,
)
