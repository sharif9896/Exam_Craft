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
import Admindept from './Pages/Admindept.jsx'
import AdminClasses from './Pages/AdminClasses.jsx'
import AdminStaffs from './Pages/AdminStaffs.jsx'
import AdminAllowed from './Pages/AdminAllowed.jsx'
import AddSyllabusForm from './Pages/Demo.jsx'
import AdminSyllabus from './Pages/AdminSyllabus.jsx'
import AppProvider from './context/AppContext.jsx'
import AdminManageDpt from './Pages/AdminManageDpt.jsx'


const router = createBrowserRouter([
  {path: "/", element: <App/>, children: [
    {path: "/", element: <Home/>},
    {path: "/login", element: <LoginPage/>},
    {path: "/signup", element: <SignupPage/>},
    {path: "/admin/dashboard", element: <AdminDashboard/>},
    {path: "/admin/departments/add", element: <Admindept/>},
    {path: "/admin/classes/add", element: <AdminClasses/>},
    {path: "/admin/staffs/add", element: <AdminStaffs />},
    {path: "/admin/allowed-things/add", element: <AdminAllowed/>},
    {path: "/admin/syllabus/add", element: <AdminSyllabus/>},
    {path: "/admin/departments/manage", element: <AdminManageDpt/>},
    {path: "/t", element: <AddSyllabusForm />}
  ]}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  </StrictMode>,
)
