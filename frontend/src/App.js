import './App.css';

import HomePage from './view/pages/homepage/HomePage';
import { Route,Routes } from 'react-router-dom';
import Signup from './view/pages/signup/Signup';
import Login from './view/pages/login/Login';
import DashBoard from './view/pages/dashboard/DashBoard';
import Applications from './view/pages/applications/Applications';
import Profile from './view/pages/profile/Profile';
import Universities from './view/pages/universities/Universities';
import Ebooks from './view/pages/ebooks/Ebooks';
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
  <Route path= "/universities" element ={<Universities/>}  />
  <Route path= "/ebooks" element ={<Ebooks/>}  />


</Routes>
    
    </div>
  );
}

export default App;
