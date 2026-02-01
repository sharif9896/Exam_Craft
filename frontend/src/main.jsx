import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Home } from 'lucide-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import { ToastContainer } from 'react-toastify'


const router = createBrowserRouter([
  {path: "/", element: <App/>, children: [
    {path: "/", element: <Home/>},
    {path: "/login", element: <LoginPage/>},
    {path: "/signup", element: <SignupPage/>},
    {path: "/dashboard", element: <AdminDashboard/>}
  ]}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}><ToastContainer/></RouterProvider>
  </StrictMode>,
)
