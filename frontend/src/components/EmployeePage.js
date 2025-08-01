import React, {useState} from 'react';
import '../assets/Employee.css'
import '../assets/TaskTable.css'
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';
const EmployeePage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [password, setPassword] = useState('');
  const [tasks, setTasks] = useState([]);
  const [department, setDepartment] = useState('');
  const [office, setOffice] = useState('');
  const [progress, setProgress] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(false)

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

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/loginemployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setEmail(data.email);
      setAge(data.age);
      setSalary(data.salary);
      setOffice(data.office);
      setDepartment(data.department);

      setisLoggedIn(true)
    } catch (error) {
      console.error('Login failed', error);
      setUsername('')
      setPassword('')
      alert('Invalid Credentials. Please Try again')
    }
  };


  const fetchTasks = () => {
    const query = new URLSearchParams();
    if (department) query.append('department', department);
    if (office) query.append('office', office);
    console.log(query.toString());
    fetch(`http://localhost:4000/getTasks/search?${query.toString()}`)
    
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching items by department and office:', error));
  };

  const handleEditClick = (itemId, currentProgress) => {
    setEditingItemId(itemId);
    setProgress(currentProgress);
  };

  const handleSaveClick = () => {
    fetch(`http://localhost:4000/setTasks/${editingItemId}/progress`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ progress })
    })
      .then(response => response.json())
      .then(updatedItem => {
        setTasks(tasks.map(item => (item._id === updatedItem._id ? updatedItem : item)));
        setEditingItemId(null);
        setProgress('');
      })
      .catch(error => console.error('Error updating progress:', error));
  };

  return (
    <>
    {!isLoggedIn ? (
      /* <>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </> */

    <div className="loginbody">
    
          <div className="emp-home-icon-div" onClick={()=>navigate('/')}>
          <IoHomeOutline size='23px' /> Home
          </div>
          <div className="logincontainer">
            <div className="sign-in-container">
              <form className="loginform">
                <h1 className="login-title">Employee Login</h1>
                <input
                  className="login-username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  
                />
                <input
                  className="login-password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button className="emp-login-button" onClick={login}>Sign In</button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                  <h1 className="welcome-text"  style={{fontSize: '38px'}}>Welcome Back</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
    ) : (
      <>
        <div className='employee-details'>
        <div>          
        <h1>Hello {username}!</h1>
        <h5>Email: {email}</h5>
        <h5>Age: {age}</h5>
        <h5>Salary: {salary}</h5>
        <h5>Department: {department}</h5>
        <h5>Office: {office}</h5>
        
      <button className='employee-fetch-btn' onClick={fetchTasks}>Fetch Tasks</button>
      </div>
      <div>
            <button className="emp-logout-btn" onClick={()=> {setisLoggedIn(false)
              setUsername('')
              setPassword('')
            }}>Logout</button>
        </div>
      </div>
      <div className="tasks">      
      <h1>Tasks</h1>
      {tasks.length > 0 ? (
        <table className='task-table' align="center" border={1}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Ph No</th>
              <th>Area</th>
              <th>Problem Type</th>
              <th>Description</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task._id} >
                <td>{new Date(task.date).toLocaleDateString()}</td>
                <td>{task.name}</td>
                <td>{task.email}</td>
                <td>{task.phno}</td>
                <td>{task.area}</td>
                <td>{task.problemtype}</td>
                <td>{task.description}</td>
                <td className={getRowClass(task.progress)}>
                {editingItemId === task._id ? (
                  
                  /* <input 
                    type="text"
                    value={progress}
                    onChange={e => setProgress(e.target.value)}
                  /> */
                  <select
                id="problemoptions"
                value={progress}
                onChange={(e) => {
                  setProgress(e.target.value);
                }}
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
                ) : (
                  task.progress
                )}
              </td>
              <td>
                {editingItemId === task._id ? (
                  <button className='edit-delete-button' onClick={handleSaveClick}>Save</button>
                ) : (
                  <button className='edit-delete-button' onClick={() => handleEditClick(task._id, task.progress)}>Edit</button>
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
    </>
  );
};

export default EmployeePage;
