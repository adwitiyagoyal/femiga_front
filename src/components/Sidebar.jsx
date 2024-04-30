import React from 'react'
import './Sidebar.css'
import logo from '../assets/femiga_logo.png'
function Sidebar({openSidebar,toggleSidebar}) {
  return (
    <div className={openSidebar ? "master_sidebar collapse" : "master_sidebar"}>
        <div className="main_sidebar">
            {/* Sidebar */}
            <div className="sidebar_navbar">
                <div className="sidebar_navbar_left">
                    <img src={logo} alt="" />
                </div>
            </div>

            {/* ----------------------- */}

            {/* content */}
            <div className="contents_sidebar">

                <div className="points_sidebar_main">  
                    <div className="points_sidebar">
                        <span> Inventory </span>
                    </div>
                </div>

                <div className="points_sidebar_main">
                    <div className="points_sidebar">
                        <span> Report </span>
                    </div>
                </div>

                <div className="points_sidebar_main">
                    <div className="points_sidebar">
                        <span> billing details </span>
                    </div>
                </div>

                <div className="points_sidebar_main">
                    <div className="points_sidebar">
                        <span> Transaction History </span>
                    </div>
                </div>

                <div className="points_sidebar_main">  
                    <div className="points_sidebar">
                        <span> Send Bulk Message </span>
                    </div>
                </div>
            </div>
        </div>
        <div onClick={toggleSidebar}   className="backdrop"></div>
        
    </div>
    
  )
}

export default Sidebar
