import React from 'react'
import './Hero.css'
import { useState } from 'react';

function Hero({toggleCharge,toggleBill}) {

    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        number: ''
      });
      const [errors, setErrors] = useState({
        name: false,
        email: false,
        number: false
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value
        });
      };
    
      const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          validateInputs();
        }
      };
    
      const validateInputs = () => {
        let formValid = true;
        const newErrors = {};
    
        for (const key in inputs) {
          if (!inputs[key]) {
            newErrors[key] = true;
            formValid = false;
          }
        }
    
        setErrors(newErrors);
    
        if (!formValid) {
          alert('Please fill in all fields.');
        }
      }

  return (
    <div className='main_hero'>

        {/* BILL NUMBER AND CASHIER DETAILS */}
        <div className="cashier">
            <div className="details_cashier">
                <div className="bill_no">
                    BILL NUMBER : 
                </div>
                <div className="cashier_name">
                    
                    <span>CASHIER NAME :</span>
                    <select onfocus='this.size=10;' onblur='this.size=0;' onchange='this.size=1; this.blur();'>
                        <option value="" disabled selected hidden>SELECT</option>
                        <option value="name1">SRIRAM</option>
                        <option value="name2">OVIYA</option>
                        <option value="name3">ARUNA</option>
                        <option value="name4">HARSHITA</option>
                        <option value="name4">AYISHA</option>
                    </select>
                </div>
            </div>
        </div>
        {/* --------------------- */}

        {/* CUSTOMER DETAILS */}
        <div className="customer_details">
            <div className="heading_customer_details">
                <span>CUSTOMER DETAILS</span>
            </div>
            <div className="customer_details_main">
                <div className="customer_details_box">       
                    <span>NUMBER :</span>
                    <input
                    type="number"
                    name="number"
                    value={inputs.number}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    style={{ backgroundColor: errors.number ? 'red' : '' }}
                    />
                </div>
                <div className="customer_details_box">       
                    <span>NAME :</span>
                    <input
                    type="text"
                    name="name"
                    value={inputs.name}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    style={{ backgroundColor: errors.name ? 'red' : '' }}
                    />
                </div>
                <div className="customer_details_box">       
                    <span>MAIL :</span>
                        <input
                        type="email"
                        name="email"
                        value={inputs.email}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        style={{ backgroundColor: errors.email ? 'red' : '' }}
                        />
                </div>
                <div className="customer_details_box">       
                    <span>CREDITS POINTS : </span>
                    <input type="text" />
                </div>
            </div>
        </div>

        {/* --------------------- */}

        {/* BILLING DETAILS */}

        <div className="billing_details">
            <div className="billing_details_heading">
                <span>BILLING DETAILS</span>
            </div>
            <div className="billing_details_main">
                <div className="billing_details_main_header">
                    <div className="serial_num billing_details_entry">
                        S.no
                    </div>
                    <div className="product_name billing_details_entry"> Product name</div>
                    <div className="qty billing_details_entry">Qty</div>
                    <div className="price billing_details_entry">Price</div>
                    <div className="gst billing_details_entry">GST</div>
                    <div className="disc billing_details_entry">Disc%</div>
                    <div className="amount billing_details_entry">Amount</div>
                    <div className="remove billing_details_entry">Remove</div>
                </div>
            </div>
        </div>

        {/* --------------------- */}

        {/* ITEM DETAILS */}
        <div className="item_details">
            <select className='item_no'>
                <option value="" disabled selected hidden>ITEM NO.</option>
                <option value="item1">1</option>
                <option value="item2">2</option>
                <option value="item3">3</option>
            </select>

            <select className='product_details'>
                <option value="" disabled selected hidden>Product Name</option>
                <option value="item1">Product 1</option>
                <option value="item2">Product 2</option>
                <option value="item3">Product 3</option>
            </select>

            <input type="text" placeholder='Price' />
            <input type="text" placeholder='Qty' />
            <input type="text" placeholder='Disc%' />
            <input type="text" placeholder='Amount' />
        </div>

        {/* --------------------- */}
        
        {/* EXTRAS */}

        <div className="extras">
            <div className="final_count">
                <div className="items_count">
                    <span>ITEMS : 2</span>
                </div>
                <div className="total_amount">
                    <h1>TOTAL : 1422</h1>
                </div>
            </div>

            <div className="additionals">
                <button onClick={toggleCharge}>Add Additonal charge</button>
                <button onClick={toggleBill}>Print Bill & Generate Invoice</button>
            </div>
        </div>

    </div>
      

  )
}

export default Hero
