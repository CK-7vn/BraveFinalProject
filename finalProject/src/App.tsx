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

import { BrowserRouter, Router, Link, Route, Routes } from 'react-router-dom'


function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [theme, setTheme] = useState('corporate');

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <BrowserRouter basename="/">
        <div data-theme={theme} className="">
          <Navbar setCurrentPage={setCurrentPage} theme={theme} setTheme={setTheme} />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/options" element={<Options />} />
          <Route path="/facts" element={<Facts />} />
          <Route path="/accredit" element={<Accredit />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </BrowserRouter>
      <ChatBox />
    </>
  )
}

export default App
