import React, { useState } from 'react';
import './Additional_charge.css';
import { IoMdClose } from "react-icons/io";

function Additional_charge({ open, toggler, onAddCharge }) {
  const [chargeType, setChargeType] = useState('');
  const [chargeAmount, setChargeAmount] = useState('');

  const handleAddCharge = () => {
    const amount = parseFloat(chargeAmount);
    if (!isNaN(amount) && chargeType.trim() !== '') {
      onAddCharge(amount); // Call the passed function
      setChargeType('');
      setChargeAmount('');
    }
  };

  return (
    <div className={open ? 'main_additional_charge collapse' : 'main_additional_charge'}>
      <div className="additional_charge_box">
        <button onClick={toggler} className='additional_charge_close'><IoMdClose /></button>
        <div className="additional_charge_headings">
          <h1>Add Additional Charges</h1>
        </div>
        <div className="additional_charge_type">
          <span>Charge type : </span>
          <input
            type="text"
            placeholder="Enter charge type"
            value={chargeType}
            onChange={(e) => setChargeType(e.target.value)}
          />
        </div>
        <div className="additional_charge_amount">
          <span>Charge Amount : </span>
          <input
            type="number"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
          />
        </div>
        <button className='submit_additional_charge' onClick={handleAddCharge}>
          Add charge
        </button>
      </div>
    </div>
  );
}

export default Additional_charge;
