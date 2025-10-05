
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './shell/App.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Books from './pages/Books.jsx'
import Games from './pages/Games.jsx'
import Webinars from './pages/Webinars.jsx'
import Quiz from './pages/Quiz.jsx'
import Account from './pages/Account.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Home /> },
    { path: 'learn', element: <Learn /> },
    { path: 'books', element: <Books /> },
    { path: 'games', element: <Games /> },
    { path: 'webinars', element: <Webinars /> },
    { path: 'quiz', element: <Quiz /> },
    { path: 'account', element: <Account /> },
  ]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
