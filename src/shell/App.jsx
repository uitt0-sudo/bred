
import React,{useEffect} from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../store'
import './shell.css'
import Cursor from '../ui/Cursor.jsx'
import { LoginModal, SignupModal } from '../ui/AuthModals.jsx'
import { AnimatePresence, motion } from 'framer-motion'

export default function App(){
  const loc = useLocation()
  useEffect(()=>{ window.scrollTo({top:0,behavior:'smooth'}) },[loc.pathname])
  return (
    <div>
      <Cursor/>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main key={loc.pathname} className="container"
          initial={{opacity:0, y:14}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-14}} transition={{duration:.35}}>
          <Outlet/>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <LoginModal/><SignupModal/>
      <Toaster/>
    </div>
  )
}

function Header(){
  const { user, openAuth } = useApp()
  const navigate = useNavigate()
  return (
    <header className="header">
      <div className="container row">
        <div className="brand" onClick={()=>navigate('/')} style={{cursor:'pointer'}}>
          <img src="/assets/img/logo-bear.png" alt="logo"/><div><b>BNB Academy</b> Kids</div>
        </div>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/learn">Learn</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/webinars">Webinars</NavLink>
          <NavLink to="/quiz">Quiz</NavLink>
        </nav>
        <div style={{marginLeft:'auto',display:'flex',gap:8}}>
          {user ? (
            <>
              <span className="pill">👋 {user.name}</span>
              <NavLink className="btn ghost" to="/account">Account</NavLink>
            </>
          ) : (
            <>
              <button className="btn ghost" onClick={()=>openAuth('login')}>Log in</button>
              <button className="btn" onClick={()=>openAuth('signup')}>Join Free</button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function Footer(){
  return <footer><div className="container muted">Demo only · © BNB Academy Kids</div></footer>
}

function Toaster(){
  const { toast } = useApp()
  if(!toast) return null
  return <div className="toast">{toast}</div>
}
