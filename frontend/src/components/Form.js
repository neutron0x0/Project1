import React, { useState } from "react";
import "../assets/Form.css";
import { MdOutlineEmail, MdOutlineDescription } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";

function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [area, setArea] = useState("");
  const [problemtype, setProblemtype] = useState("");
  const [description, setDescription] = useState("");
  //   const [selectedOption, setSelectedOption] = useState('');

  const collectData = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:4000/", {
      method: "post",
      body: JSON.stringify({
        name,
        email,
        phno,
        area,
        problemtype,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json;
    localStorage.setItem("complaints", JSON.stringify(result));
  };

  return (
    
      <div className="form-container">
        <form className="form-form" onSubmit={collectData}>
          <h2 className="comp-reg-title">Complaint Registration</h2>

          <div className="">
            <label className="formlabel">Name:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="">
            <label className="formlabel">
              <MdOutlineEmail size="22px" /> E-Mail:{" "}
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="">
            <label className="formlabel">
              <IoCallOutline size="22px" /> Phone Number:
            </label>
            <input
              type="number"
              className="form-control"
              value={phno}
              placeholder="Enter your phone number"
              onChange={(e) => setPhno(e.target.value)}
            />
          </div>
          <div className="">
            <label className="formlabel">
              <CiLocationOn size="22px" /> Area:
            </label>
            <input
              type="text"
              className="form-control"
              value={area}
              placeholder="Enter the area"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className="problemtype-div">
            <label className="formlabel">Problem Type:</label>
            <select
              id="problemoptions"
              value={problemtype}
              onChange={(e) => {
                setProblemtype(e.target.value);
              }}
            >
              <option value="">Type of problem</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Road">Road</option>
            </select>
          </div>
          <div className="">
            <label className="formlabel">
              <MdOutlineDescription size="22px" /> Description:
            </label>
            <textarea
              className="descriptionbox"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="descibe the problem..."
              rows="4"
              cols="70"
            />
          </div>

          <button type="submit" className="register-comp-btn">
            <FaCheck size="20px" /> Submit
          </button>
        </form>
      </div>
    );
}

export default Form;
