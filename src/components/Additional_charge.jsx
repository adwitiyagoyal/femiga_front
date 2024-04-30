import React from 'react'
import './Additional_charge.css'
import { IoMdClose } from "react-icons/io";
function Additional_charge({open,toggler}) {
  console.log(open);
  return (
    
    <div className={open ?'main_additional_charge collapse' :'main_additional_charge' }>
      
        <div className="additional_charge_box">

          <button onClick={toggler} className='additional_charge_close'><IoMdClose /></button>

          
            <div className="additional_charge_headings">
              <h1>Add Aditional Charges</h1>
            </div>
            <div className="additional_charge_type">
              <span>Charge type : </span>
              <input type="text" placeholder="Enter charge type" name="" id="" />
            </div>
            <div className="additional_charge_amount">
              <span>Charge Amount : </span>
              <input type="number" name="" id="" />
            </div>

            <button className='submit_additional_charge'>Add charge</button>
          
        </div>
    </div>
  )
}

export default Additional_charge
