import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import Additional_charge from './Additional_charge';


function Hero({location}) {
  const [location_Login,setLocation] = useState(location);


  const [billNumber, setBillNumber] = useState('');

  useEffect(() => {
    const fetchBillCount = async () => {
      try {
        const response = await fetch('http://localhost:3000/bill/count/total');
        const data = await response.json();
        if (data.success) {
          const formattedBillNumber = `FMG-${data.billCount + 1001}`;
          setBillNumber(formattedBillNumber);
        } else {
          console.error('Failed to fetch bill count');
        }
      } catch (error) {
        console.error('Error fetching bill count:', error);
      }
    };

    fetchBillCount();
  }, );
  //----------------ADDITIONAL CHARGE AND PRINT BILL PART----------------------//
  const [openAdditional_charge,setopenAdditional_charge] = useState(false);
  
  const toggleAdditional_charge = () => {
    setopenAdditional_charge(!openAdditional_charge);
  }

  
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const handleAddCharge = (chargeAmount) => {
    setAdditionalCharges(prevCharges => prevCharges + chargeAmount);
    
  };

  //----------------------------------//

  //----------------FETCHING TODAYS DATE----------------------//

      // Function to get today's date in YYYY-MM-DD format
      const getTodayDate = () => {
        const today = new Date();
        
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    
      // Use useState to set the default date to today's date
      const [selectedDate, setSelectedDate] = useState(getTodayDate());
      
    
      // Handle the date change
      const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
      };


  
  //-----------------------------//

  //----------------CUSTOMER DETAILS----------------------//
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    number: '',
    points: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    number: false
  });

  const fetchCustomerData = async (number) => {
    try {
      const response = await fetch(`http://localhost:3000/customer/exist/${number}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching customer data:', error);
      return null;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });

    if (name === 'number' && value.length === 10) {
      const customerData = await fetchCustomerData(value);
      if (customerData && customerData.exist) {
        setInputs({
          ...inputs,
          name: customerData.data.customername,
          email: customerData.data.emailId,
          number: value,
          points: customerData.data.points.toString()
        });
      } else {
        setInputs({
          ...inputs,
          name: '',
          email: '',
          points: ''
        });
      }
    }
  };


  //----------------PRODUCT DETAILS----------------------//
  // State for amount calculation
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState(''); // Default quantity to 1
  const [disc, setDisc] = useState('');
  const [amount, setAmount] = useState('');

  // State for product details
  const [itemNos, setItemNos] = useState([]);
  const [isFocusItemNo, setIsFocusItemNo] = useState(false);
  const [inputItemNo, setInputItemNo] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [productParameters, setProductParameters] = useState({});
  const [filteredItemNos, setFilteredItemNos] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/product');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const products = await response.json();
        const uniqueItemNumbers = [...new Set(products.totProducts.map(product => product.itemNo))];
        setItemNos(uniqueItemNumbers);
      } catch (error) {
        console.error('Error fetching the products', error);
      }
    };
    fetchProducts();
  }, []);

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
  };



  const fetchProductDetails = async (itemNo) => {
    try {
      const response = await fetch(`http://localhost:3000/product`);
      const data = await response.json();
      const products = data.totProducts.filter(product => product.itemNo === itemNo);
      return products; // Return all products with the same item number
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  const [productVariants, setProductVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  
  const handleItemNoChange = async (itemNo) => {
  setInputItemNo(itemNo);
  const products = await fetchProductDetails(itemNo);
  if (products && products.length > 0) {
    setProductVariants(products);
    if (products.length === 1) {
      selectProductVariant(products[0]);
    }
  }
  // Filter and limit suggestions to 5
  const filtered = itemNos.filter(no => no.includes(itemNo)).slice(0, 5);
  setFilteredItemNos(filtered);
};
  
  const selectProductVariant = (product) => {
    setSelectedVariant(product);
    setProductDetails(product);
    setProductParameters(JSON.parse(product.parameter));
    setPrice(product.price.toString());
    setQty('1');
    setDisc('');
    setAmount(product.price.toString());
  };
  

  const calculateAmount = () => {
    if (price && qty) {
      let discount = 0;
      const totalPrice = parseFloat(price) * parseFloat(qty);
      if (disc.trim().endsWith('%')) {
        discount = totalPrice * parseFloat(disc) / 100;
      } else {
        discount = parseFloat(disc);
      }
      const discountedAmount = totalPrice - discount;
      if(disc)
      setAmount(discountedAmount.toFixed(2));
      else
      setAmount(totalPrice.toFixed(2))

    } else {
      setAmount(''); // Reset amount if price or qty is not set
    }
  };

  useEffect(() => {
    calculateAmount();
  }, [price, qty, disc]);
  //-----------------------------------------------------//


  //----------------BILLING DETAILS----------------------//
  const [billingDetails, setBillingDetails] = useState([]);

  const addProductToBillingDetails = () => {
    if (!inputItemNo || !productDetails.itemName || !price || !qty  || !amount) {
      alert('Please fill in all fields.');
      return;
    }
    
    const totalPrice = parseFloat(price) * parseFloat(qty);
    const gstAmount = totalPrice * 0.18;
     const newBillingDetail = {
    serialNo: billingDetails.length + 1,
    itemNo: inputItemNo, // Add this line
    productName: productDetails.itemName,
    qty,
    price,
    gst: gstAmount.toFixed(2), // Assuming a fixed GST of 18%
    disc: disc || '0',
    amount,
  };
    

    setBillingDetails([...billingDetails, newBillingDetail]);
    console.log(billingDetails);
    // Reset fields
    setInputItemNo('');
    setProductDetails({});
    setPrice('');
    setQty('1');
    setDisc('');
    setAmount('');
    setProductParameters({});
    setProductVariants([]);
    setSelectedVariant(null);
    setFilteredItemNos([]);
  };

  const removeBillingDetail = (serialNo) => {
    const updatedDetails = billingDetails
      .filter(detail => detail.serialNo !== serialNo)
      .map((detail, index) => ({ ...detail, serialNo: index + 1 }));
    setBillingDetails(updatedDetails);
  };

  const handleInputChange = (index, field, value) => {
    
    const updatedBillingDetails = billingDetails.map((detail, i) => {
      
      if (i === index) {
        detail[field] = value;
        if (field === 'price' || field === 'qty' || field === 'disc') {
          let discount = 0;
          const totalPrice = parseFloat(detail.price) * parseFloat(detail.qty);
          const gstAmount = totalPrice * 0.18; // 18% GST
          detail.gst = gstAmount.toFixed(2);
          if (detail.disc.trim().endsWith('%')) {
            discount = totalPrice * parseFloat(detail.disc) / 100;
          } else {
            discount = parseFloat(detail.disc);
          }
          detail.amount = (totalPrice - discount).toFixed(2);
        }
      }
      return detail;
    });
    setBillingDetails(updatedBillingDetails);
  };
  //-----------------------------------------------------//
  
  //------------------TOTAL-------------------//
  const calculateTotalAmount = () => {
    return (billingDetails.reduce((total, detail) => total + parseFloat(detail.amount), 0) + parseFloat(additionalCharges)).toFixed(2);
  };

  const totalAmount = calculateTotalAmount();

  //--------------------------------------------//
  const productParametersToString = (params) => {
    return Object.entries(params).map(([key, value]) => `${key}: ${value}`).join(', ');
  };
  const handlePrintBillAndGenerateInvoice = async () => {
    const cashierName = document.querySelector('.cashier_name select').value;
    const modeOfPayment = document.querySelector('.mode_of_payment select').value;
    const location = location_Login; // Assuming a fixed location
  
    const billData = {
      empID: cashierName,
      customerName: inputs.name,
      customerPhoneNo: parseInt(inputs.number),
      customerPoints: parseInt(inputs.points, 10),
      emailId: inputs.email,
      billNo: billNumber,
      billAmount: parseFloat(totalAmount),
      totGST: billingDetails.reduce((total, detail) => total + parseFloat(detail.gst), 0).toFixed(2),
      bill: billingDetails.map(detail => ({
        itemNo: detail.itemNo, // Assuming itemName corresponds to itemNo
        quantity: parseInt(detail.qty, 10)
      })),
      modeOfPay: modeOfPayment,
      location
    };
    console.log(billData);
  
    try {
      const response = await fetch(`http://localhost:3000/bill`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(billData),
      });
  
      const result = await response.json();
      if (response.ok && result.success) {
        alert('Billing data processed successfully');
        clearFormData(); // Clear the form data
      } else {
        console.error('Failed to process billing data:', result.message);
        alert('Failed to process billing data');
      }
    } catch (error) {
      console.error('Error processing billing data:', error);
      alert('Error processing billing data');
    }
  };

  const clearProduct = ()=>{
    setPrice('');
    setQty('');
    setDisc('');
    setAmount('');
    setProductParameters({});
    setProductDetails({});
  }
  
  const clearFormData = () => {
    setInputs({
      name: '',
      email: '',
      number: '',
      points: ''
    });
    setBillingDetails([]);
    setAdditionalCharges(0);
    setPrice('');
    setQty('');
    setDisc('');
    setAmount('');
    setInputItemNo('');
    setProductDetails({});
    setProductParameters({});
    
    setProductVariants([]);
    setSelectedVariant(null);
    setFilteredItemNos([]);
  };
  

  return (
    <div className='main_hero'>
       <Additional_charge open={openAdditional_charge} toggler={toggleAdditional_charge} onAddCharge={handleAddCharge}/>
      
      {/* BILL NUMBER AND CASHIER DETAILS */}
      <div className="cashier">
        <div className="details_cashier">
          <div className="bill_no">BILL NUMBER : {billNumber} </div>
          <div className="cashier_name">
            <span>CASHIER NAME :</span>
            <select name = "cashier_name" caonFocus='this.size=10;' onBlur='this.size=0;' onChange='this.size=1; this.blur();'>
              <option value="" disabled selected hidden>SELECT</option>
              <option value="SRIRAM">SRIRAM</option>
              <option value="SRIRAM">OVIYA</option>
              <option value="ARUNA">ARUNA</option>
              <option value="HARSHITA">HARSHITA</option>
              <option value="AYISHA">AYISHA</option>
            </select>
          </div>
          <div className="mode_of_payment">
            <span> Mode of Payment : </span>
            <select name="mode_of_payment" id="">
              <option value="CASH">CASH</option>
              <option value="UPI">UPI</option>
              <option value="CARD">CARD</option>
            </select>
          </div>
          <input
        className="hero_date"
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
      />
        </div>
      </div>
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
            <span>CREDIT POINTS : </span>
            <input
              type="text"
              name="points"
              value={inputs.points}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              readOnly
            />
          </div>
        </div>
      </div>
      {/* BILLING DETAILS */}
      <div className="billing_details">
        <div className="billing_details_heading">
          <span>BILLING DETAILS</span>
        </div>
        <div className="billing_details_main">
          <div className="billing_details_main_header">
            <div className="serial_num billing_details_entry">S.no</div>
            <div className="product_name billing_details_entry">Product name</div>
            <div className="qty billing_details_entry">Qty</div>
            <div className="price billing_details_entry">Price</div>
            <div className="gst billing_details_entry">GST</div>
            <div className="disc billing_details_entry">Disc%</div>
            <div className="amount billing_details_entry">Amount</div>
            <div className="remove billing_details_entry">Remove</div>
          </div>
          {billingDetails.map((detail, index) => (
            <div className="billing_details_main_header" key={index}>
              <div className="serial_num billing_details_entry">{index+1}</div>
              <div className="product_name billing_details_entry">{detail.productName}</div>
              <div className="qty billing_details_entry">
                <input
                  type="text"
                  value={detail.qty}
                  onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                />
              </div>
              <div className="price billing_details_entry">
                <input
                  type="text"
                  value={detail.price}
                  onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                />
              </div>
              <div className="gst billing_details_entry">{detail.gst}</div>
              <div className="disc billing_details_entry">
                <input
                  type="text"
                  value={detail.disc}
                  onChange={(e) => handleInputChange(index, 'disc', e.target.value)}
                  onBlur={calculateAmount}
                />
              </div>
              <div className="amount billing_details_entry">{detail.amount}</div>
              <div className="remove billing_details_entry">
                <button onClick={() => removeBillingDetail(detail.serialNo)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ITEM DETAILS */}
      <div className="item_details">
  <div className="choose_item_no">
    <input
      placeholder="Item No"
      type="text"
      className='item_no'
      onBlur={() => {
        if (!isHovered) setIsFocusItemNo(false);
      }}
      onFocus={() => setIsFocusItemNo(true)}
      value={inputItemNo}
      onChange={(e) => handleItemNoChange(e.target.value)}
    />
    {isFocusItemNo &&
      <div
        className="box_item_no"
        onMouseEnter={() => { setIsHovered(true) }}
        onMouseLeave={() => { setIsHovered(false) }}
      >
        {filteredItemNos.map((itemNo, index) => (
          <div key={index} className="options_item_no"
            onClick={() => {
              handleItemNoChange(itemNo);
              setIsFocusItemNo(false);
            }}>
            {itemNo}
          </div>
        ))}
      </div>
    }
  </div>
  
  {productVariants.length > 1 && <select
    className='product_variant_selector'
    disabled={!inputItemNo}
    onChange={(e) => selectProductVariant(productVariants[e.target.value])}
  >
    <option value="" disabled selected>Select Product Variant</option>
    {productVariants.map((product, index) => (
      <option key={index} value={index}>
        {product.itemName}
      </option>
    ))}
  </select>
}
{productVariants.length === 1 && (
  <input
    placeholder='Item name'
    className='product_details'
    value={productVariants[0].itemName || ''}
    readOnly
  />
)}
        <input
          type="text"
          className="price"
          placeholder='Price'
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            calculateAmount();
          }}
        />
        <input
          type="text"
          className="qty"
          placeholder='Qty'
          value={qty}
          onChange={(e) => {
            setQty(e.target.value);
            calculateAmount();
          }}
        />
        <input
          type="text"
          className="disc"
          placeholder='Disc%'
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
          onBlur={calculateAmount}
        />
        <input
          type="text  "
          className="amount"
          placeholder='Amount'
          value={amount || ''}
          readOnly
        />
{selectedVariant && (
  <div className="additional_parameters">
    {Object.keys(productParameters).map((key, index) => (
      <div key={index} className="parameter_container">
        <label className="parameter_label">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
        <select
          className="parameter"
          value={productParameters[key]}
          onChange={(e) => setProductParameters({ ...productParameters, [key]: e.target.value })}
        >
          <option value={productParameters[key]}>{productParameters[key]}</option>
          {/* Add more options if needed */}
        </select>
      </div>
    ))}
  </div>
)}

      </div>
      <div className="add_product">
        <button onClick={addProductToBillingDetails}>Add</button>
      </div>
      {/* EXTRAS */}
      <div className="extras">
        <div className="final_count">
          <div className="items_count">
            <span>ITEMS : {billingDetails.length}</span>
          </div>
          <div className="total_amount">
            <h1>TOTAL : {totalAmount}</h1>
          </div>
        </div>
        <div className="additionals">
          <button onClick={toggleAdditional_charge}>Add Additional charge</button>
          <button onClick={handlePrintBillAndGenerateInvoice}>Print Bill & Generate Invoice</button>

        </div>
      </div>
    </div>
  );
}

export default Hero;

