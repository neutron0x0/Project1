import React, { useState } from "react";
import "../assets/Register.css";
import { IoCallOutline, IoKeyOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import Form from './Form'
import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const Register = () => {

  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phno: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        alert("Customer added successfully");
      } else {
        const errorData = await response.json();
        // alert("Error: " + JSON.stringify(errorData));
        alert("Username already exists. Try with a different Username")
      }
    } catch (error) {
      console.error("There was an error adding the customer!", error);
    }
  };

  return (
    <div className="register-body"> 
    <div className="reg-home-icon-div" onClick={()=>navigate('/')}>
    <IoHomeOutline size='23px' /> Home
    </div>     
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="comp-reg-title">Registration</h2>
          <div>
            <label className="formlabel">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              value={customer.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="formlabel">Username:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter the username"
              value={customer.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="formlabel">
              <IoKeyOutline /> Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter the password"
              value={customer.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="formlabel">
              <MdOutlineEmail /> Email:
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter the email"
              value={customer.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="formlabel">
              <IoCallOutline /> Phone Number:
            </label>
            <input
              type="text"
              name="phno"
              className="form-control"
              placeholder="Enter your phone number"
              value={customer.phno}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="formlabel">
              <CiLocationOn /> Address:
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter your Address"
              value={customer.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-comp-btn">
            <FaCheck size="22px" /> Register
          </button>
          <button className="register-comp-btn" onClick={()=>navigate('/customerlogin')}>
            Login
          </button>
        </form>
      </div>
      </div>
  );
};

export default Register;
