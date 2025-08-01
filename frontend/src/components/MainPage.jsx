import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/home.css'
import './addition.css'

function HomePage() {

    const navigate = useNavigate();    
    const [road,setRoad]=useState(false);
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
      const query = new URLSearchParams();
      query.append('department', 'Road');
      console.log(query.toString());
      fetch(`http://localhost:4000/getRoad/search`)
      
        .then(response => response.json())
        .then(data => setTasks(data))
        .catch(error => console.error('Error fetching items by department and office:', error));
    };

  return (
    <>
    <div className='homepage-body'>
      <nav >
      <div className="nav-title">Community Care</div>
      <div className='sidebar'>
        <button type="button" onClick={()=> setRoad(true)}>Road Problems</button>
        <button type="button" onClick={()=> {navigate('/register')}}>Register</button>
        <button type="button" onClick={()=>{navigate('customerlogin')}}>Customer Login</button>
        <button type="button" onClick={()=>{navigate('employeelogin')}}>Employee Login</button>
    </div>
      </nav>
      <div>
      <div className='text-body'>
        <h1>Welcome to Community Care</h1>
        <p className='text-body-p'>
        Welcome to Community Care, your go-to platform for efficient and effective Community service management. Our solution is designed to enhance your interactions with customers, streamline issue resolution, and ensure a seamless experience for all users.Our platform serves as a bridge between the community and the relevant government departments, enabling efficient communication and timely resolution of local problems.
        Join us in transforming customer service into a smooth, satisfying, and productive journey.
        </p>
      </div>

      <div className={`modal ${road ? "active" : ""} `}>
        <div className='problems'>
             <button className="showing" onClick={fetchTasks}>Show Road Problems</button>
             <table className='road-table' >
              {tasks.map(task => (
              <tr key={task._id} >
                <td>{task.area}</td>
                <td>{task.description}</td>
              </tr>))}
             </table>
             
             
        </div>
      </div>



      <div className='card-container'>
          <div className='card'>
            <h2>Citizen</h2>
            <p>Citizen can register as a customer and file complaints on issues in their localities. They are allowed to keep a track of the progess made towards the resolution of the complaint.</p>
          </div>
          <div className='card'>
            <h2>Employees</h2>
            <p>Employees belonging to a specific department carter to a specific type of issue. They are also allowed to update the progress on the issue they are working on. </p>
          </div>
          <div className='card'>
            <h2>Complaints</h2>
            <p>Customer registers a comlaint and the employee resolves the complaint. Complaint can be regarding water problems, electricity problems , road problems etc.</p>
          </div>
          <div className='card'>
            <h2>Departments</h2>
            <p>Each type of complaint is handled by a department, which assigns employees to resolve them. </p>
          </div>
        </div>

        </div>
        </div>
        <footer>
           &copy; 2024 Community Care. All rights reserved.
        </footer>
        </>
  );
}


export default HomePage;