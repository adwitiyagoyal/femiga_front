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
  const [location, setLocation] = useState('');

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const setLocation_login = (location) =>{
    setLocation(location)
  }

  

  return (
    <>
      <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
      {isLoggedIn ? <Hero location={location}/> : <Login set_location={setLocation_login} onLoginSuccess={handleLoginSuccess} />}
    </>
  );
}

export default App;
