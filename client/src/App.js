import logo from './logo.svg';
import './App.css';
import './index.css';
import { BrowserRouter, Link, Routes, Route,Outlet  } from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <nav>
       <ul>
          <li>
              <Link to="/" >Home</Link>
          </li>
          <li>
              <Link to="/signup">Signup</Link>
          </li>
          <li>
              <Link to="/login">Login</Link>
          </li>
          <li>
              <Link to="/forget">Forget Password</Link>
          </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPassword />} />

          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
