import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/femiga_logo.png';
import { IoMenu } from "react-icons/io5";


function Navbar({toggleSidebar}) {

    return (
        <div className='main_nav'>

            <div className="menu">
                <button className='menu_butt' onClick={toggleSidebar}>
                    <IoMenu />
                </button>
            </div>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
        </div>
    );
}

export default Navbar;
