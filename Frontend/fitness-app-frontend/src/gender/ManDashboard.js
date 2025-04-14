import React from 'react';
import { useDispatch, useSelector, useState } from 'react-redux';//PREBITNO
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice'; //OVO JE OBAVEZNO jer ne mogu drugaciji pristupiti
import '../styles/ManDashboardInterface.css';
import '../styles/HomeInterface.css';


const ManDashboard=()=>
{
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleLogout=()=>{

        dispatch(logout());//brise se iz state-a
        navigate('/'); //vraca se na pocetak

    }

    return(
      <div className="app">
      <div className="navbar-home">
        <div className="logo-container">
          <div className="logo-circle">A</div>
          <span className="logo-text">FitnessAppAndreja</span>
        </div>  {/*OVDE JE STAJALO WELCOME+USERNAME */}
        <div className='option-container'>
          <button className='profile-button' onClick={()=>navigate('/home')}>P</button>
          <button className='training-button' onClick={()=>navigate('/training/TrainingHomePage')}>T</button>
          <button className='motivation-button'>M</button>
        </div>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="LRButton RButton">Logout</button>
        </div>
      </div>
     
      </div>
    );
}

export default ManDashboard;