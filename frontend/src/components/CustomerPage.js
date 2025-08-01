import React, { useState } from "react";
import "../assets/Customer.css";
import {  MdOutlineDescription } from "react-icons/md";
import { IoClose, IoHomeOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import '../assets/TaskTable.css'
import { useNavigate } from "react-router-dom";


const Login = () => {
  
  const getRowClass = (progress) => {
    switch (progress) {
        case 'Not Started':
            return 'not-started';
        case 'In Progress':
            return 'in-progress';
        case 'Completed':
            return 'completed';
        case 'Rejected':
            return 'rejected';
        default:
            return '';
    }
};

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [area, setArea] = useState("");
  const [problemtype, setProblemtype] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [complaints, setComplaints] = useState([]);

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlelogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/logincustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      console.log("logged in successfully!!!!");
      setisLoggedIn(true);
    } else {
      alert("Invalid login");
      setUsername('')
      setPassword('')
    }
    const customer = await response.json();
    setName(customer.name);
    setEmail(customer.email);
    setPhno(customer.phno);
    setAddress(customer.address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/registercomplaint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
        phno: phno,
        area: area,
        problemtype: problemtype,
        description: description,
      }),
    });

    if (response.ok) {
      alert("Complaint registered successfully");
      setShowModal(false);
      setArea("");
      setProblemtype("");
      setDescription("");
    } else {
      alert("Error registering complaint");
    }
  };

  const fetchComplaints = () => {
    const query = new URLSearchParams();
    if (username) query.append("username", username);
    console.log(query.toString());
    fetch(`http://localhost:4000/getComplaints/search?${query.toString()}`)
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error(error));
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:4000/deletecomplaints/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
    } else {
      alert("Error deleting complaint");
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <div class="loginbody">
        <div className="cust-home-icon-div" onClick={()=>navigate('/')}>
          <IoHomeOutline size='23px' /> Home
          </div>
          <div class="logincontainer">
            <div class="sign-in-container">
              <form class="loginform">
                <h1 class="login-title">Customer Login</h1>
                <input
                  class="login-username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  class="login-password"
                  type="password"
                  placeholder="Pasword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button class="login-button" onClick={handlelogin}>
                  Sign In
                </button>
                <button class="login-button" onClick={()=> navigate('/register')}>
                  Register
                </button>
              </form>
            </div>
            <div class="overlay-container">
              <div class="cust-overlay">
                <div class="overlay-panel overlay-right">
                  <h1 class="welcome-text" style={{fontSize: '33px'}}>Hello Friend!</h1>
                  <p class="welcome-p">
                    To stay connected with us please login with your personal
                    info
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
        <div className="customer-details">
          <div>
            <h1>Hello {name}!</h1>
            <h5>Email: {email}</h5>
            <h5>Phone Number: {phno}</h5>
            <h5>Address: {address}</h5>
            <div>
              <button
                className="customer-reg-fetch-btn"
                type="submit"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Register Complaint
              </button>
              <button
                className="customer-reg-fetch-btn"
                onClick={fetchComplaints}
              >
                Fetch Complaints
              </button>
            </div>
          </div>
          <div>
            <button className="logout-btn" onClick={()=> {setisLoggedIn(false)
              setUsername('')
              setPassword('')
            }}>Logout</button>
          </div>
          </div>
          <div className="tasks">
            <h1>Tasks</h1>
            {complaints.length > 0 ? (
              <table className="task-table" align="center" border={1}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Problem Type</th>
                    <th>Area</th>
                    <th>Description</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((task) => (
                    <tr key={task._id}>
                      <td>{task.name}</td>
                      <td>{new Date(task.date).toLocaleDateString()}</td>
                      <td>{task.problemtype}</td>
                      <td>{task.area}</td>
                      <td>{task.description}</td>
                      <td ><p className={getRowClass(task.progress)}>{task.progress}</p></td>
                      <td>
                        {task.progress === "Not Started" && (
                          <button className="edit-delete-button" onClick={() => handleDelete(task._id)}>
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </>
      )}
      <div className={`modal ${showModal ? "active" : ""} `}>
        <div className="form-container">
          <form className="form-form" onSubmit={handleSubmit}>
            <h2 className="comp-reg-title">Complaint Registration</h2>
            <div className="">
              <label className="formlabel">
                <CiLocationOn size="22px" /> Area:
              </label>
              {/* <input
                type="text"
                className="form-control"
                value={area}
                placeholder="Enter the area"
                onChange={(e) => setArea(e.target.value)}/> */}

                <select
                id="problemoptions"
                value={area}
                onChange={(e) => {
                  setArea(e.target.value);
                }}
              >
                
                <option value="">Select Area</option>
                <option value="Kumarswamy Layout">Kumarswamy Layout</option>
                <option value="Banashankari">Banashankari</option>
                <option value="Jayanagar">Jayanagar</option>
                <option value="JPNagar">JPNagar</option>
              </select>
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
                cols="58"
              />
            </div>

            <button type="submit" className="register-comp-btn">
              <FaCheck size="18px" /> Submit
            </button>
            <button
              className="register-comp-btn"
              type="button"
              onClick={() => {
                setShowModal(false);
              }}
            >
             <IoClose size='20px'/> Close
            </button>
          </form>
        </div>
      </div>

      {/* <div className="customer-details">
         <form onSubmit={handleSubmit}>
         <div>
           <label>Problem Type:</label>
           <input type="text" name="problemType" value={problemtype} onChange={(e) => setProblemtype(e.target.value)} required />
         </div>
         <div>
           <label>Area:</label>
           <input type="text" name="area" value={area} onChange={(e) => setArea(e.target.value)} required />
          </div>
          <div>
           <label>Description:</label>
          <textarea name="description" va lue={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
         </div>
         </form>
         </div> */}
    </>
  );
};

export default Login;
