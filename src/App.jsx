import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import './components/Sidebar.css';
import Login from './components/Login';

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      {isLoggedIn ? <Hero /> : <Login onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}

export default App;
