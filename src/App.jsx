import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import './components/Sidebar.css'
import Additional_charge from './components/Additional_charge'
import Print_bill from './components/Print_bill'


function App() {
  
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAdditional_charge,setopenAdditional_charge] = useState(false);
  const [openPrint_bill,setOpenPrint_bill] = useState(false);
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  }
  const toggleAdditional_charge = () => {
    setopenAdditional_charge(!openAdditional_charge);
  }
  const togglePrint_bill = () => {
    setOpenPrint_bill(!openPrint_bill)
  }
  
  return (
    <>
      <Sidebar openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
      
      <Navbar toggleSidebar={toggleSidebar}/>
      
      <Hero toggleCharge={toggleAdditional_charge} toggleBill={togglePrint_bill} />
      <Additional_charge open={openAdditional_charge} toggler={toggleAdditional_charge}/>
      
      <Print_bill open={openPrint_bill} toggler={togglePrint_bill}/>

    </>
  )
}

export default App
