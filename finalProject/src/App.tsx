import { useState, useEffect } from 'react'
import { themeChange } from 'theme-change'
import './App.css'
import Home from './components/home'
import Navbar from './components/navbar'
import Options from './components/options'
import Accredit from './components/accredit'
import Facts from './components/facts'
import Resources from './components/resources'
import ChatBox from './components/chat/chat_box'
import Bibliography from './components/bib'

import { BrowserRouter, Router, Link, Route, Routes } from 'react-router-dom'


function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'corporate');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    themeChange(false);
  }, [theme]);

  return (
    <>
      <BrowserRouter basename="/">
        <div data-theme={theme} className="">
          <Navbar setTheme={setTheme} theme={theme} />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/options" element={<Options />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/accredit" element={<Accredit />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/bibliography" element={<Bibliography />} />
        </Routes>
      </BrowserRouter>
      <ChatBox />
    </>
  )
}

export default App
