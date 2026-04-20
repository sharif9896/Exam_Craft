import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppProvider from './context/AppContext.jsx'
import LoaderVerify from './components/LoaderVerify.jsx'
import Home from './Pages/Home.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import StaffAccessCard from './components/StaffAccessCard.jsx'
import AssignmentCard from './components/AssignmentCard.jsx'
import Editor from './components/Editor.jsx'


const router = createBrowserRouter([
  {path: "/", element: <App/>, 
    children: [
      {path: "/", element: <Home />},
    {path: "/verify", element: <LoaderVerify />},
    {path: "/profile", element: <ProfilePage />},
    {path: "/staffaccess", element: <StaffAccessCard />},
    {path: "/assignment", element: <AssignmentCard />},
    {path:"/editor", element: <Editor/>},
    {path: "*", element: <div className='min-h-screen flex items-center justify-center'><h1 className='text-4xl font-bold text-gray-700'>404 - Page Not Found</h1></div>},
  ]}
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
    <RouterProvider router={router}></RouterProvider>
    </AppProvider>
  </StrictMode>,
)
