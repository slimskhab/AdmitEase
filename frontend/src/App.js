import './App.css';

import HomePage from './view/pages/homepage/HomePage';
import { Route,Routes } from 'react-router-dom';
import Signup from './view/pages/signup/Signup';
import Login from './view/pages/login/Login';
import DashBoard from './view/pages/dashboard/DashBoard';
import Applications from './view/pages/applications/Applications';
import Profile from './view/pages/profile/Profile';
function App() {
  return (
    <div className="App">
   
<Routes >
  <Route path= "/" element ={<HomePage/>}  />
  <Route path= "/signup" element ={<Signup/>}  />
  <Route path= "/login" element ={<Login/>}  />
  <Route path= "/dashboard" element ={<DashBoard/>}  />
  <Route path= "/profile" element ={<Profile/>}  />
  <Route path= "/applications" element ={<Applications/>}  />


</Routes>
    
    </div>
  );
}

export default App;
