import React, { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { BrowserRouter as Router, Link, Route, useNavigate } from 'react-router-dom'
import axios from "axios";
import { useAuth } from "../hooks/useAuth";



interface NavbarProps {
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  isLoggedIn: boolean;
  logout: () => Promise<void>;
}

const Navbar: React.FC<NavbarProps> = ({ setTheme, theme, isLoggedIn, logout }) => {
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'corporate' ? "business" : "corporate";
    setTheme(newTheme);
    // setTheme((prevTheme) => prevTheme === "corporate" ? "business" : "corporate");
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    themeChange(false);
  }, [theme]);


  const handleLogout = async () => {
    await logout();
    navigate('/login')
  }
  const handleClick = (page: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="navbar bg-base-100" >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <Link to="/">Home</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/options">Options</Link>
            <Link to="/accredit">What is Accreditation?</Link>
            <Link to="/facts">Facts</Link>
            <Link to="/bibliography">Bibliography</Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <li> <button className="btn btn-ghost" onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a href="/" className="btn btn-ghost text-4xl">Let's get un-traditional</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle" onClick={toggleTheme} data-set-theme={theme === "corporate" ? "business" : "corporate"} data-act-class="ACTIVECLASS">
          {theme === "corporate" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          )}
        </button>
        {isLoggedIn && (
          <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  )
};

export default Navbar;
