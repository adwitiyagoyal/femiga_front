import React from 'react'
import './Print_bill.css'
import { IoMdClose } from "react-icons/io";
function Print_bill({open,toggler}) {
    return (
        
        <div className={open ?'main_print_bill collapse' :'main_print_bill' }>
            <div className="print_bill_box">
    
              <button onClick={toggler} className='print_bill_close'><IoMdClose /></button>
    
              
                <div className="print_bill_headings">
                  <h1>Total Amount : 1422</h1>
                </div>
                <div className="print_bill_type">
                  <span> Mode of Payment : </span>
                  <select  name="mode_of_payment" id="">
                        <option value="" disabled selected hidden>Mode of Payment</option>
                        <option value="name1">UPI</option>
                        <option value="name2">CASH</option>
                        <option value="name3">CARD</option>
                  </select>
                </div>
                <div className="print_bill_amount">
                  <span>Total : </span>
                  <input type="number" name="" id="" />
                </div>
    
                <button className='submit_print_bill'>Print Bill</button>
              
            </div>
        </div>
      )
}

export default Print_bill
