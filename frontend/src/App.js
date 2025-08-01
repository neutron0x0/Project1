import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Employee from './components/EmployeePage';
import Customer from './components/CustomerPage';
import Register from './components/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/CustomerPage';


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/customerlogin' element={<Customer />} />
        <Route path='/employeelogin' element={<Employee />} />

      </Routes>
    </Router>
  );
}

export default App;
