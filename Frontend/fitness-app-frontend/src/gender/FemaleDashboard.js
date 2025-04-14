import React from 'react';
import { useDispatch, useSelector, useState } from 'react-redux';//PREBITNO
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice'; //OVO JE OBAVEZNO jer ne mogu drugaciji pristupiti
import '../styles/FemaleDashboardInterface.css';


const FemaleDashboard=()=>
{
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleLogout=()=>{

        dispatch(logout());//brise se iz state-a
        navigate('/'); //vraca se na pocetak

    }

    return(
        <div className="app">
            <div className="navbar">
              <div className="logo-container">
                <div className="logo-circle">A</div>
                <span className="logo-text">FitnessAppAndreja</span>
              </div>  {/*OVDE JE STAJALO WELCOME+USERNAME */}
              <div className="nav-buttons">
                <button onClick={handleLogout} className="RButton LRButton">Logout</button>
              </div>
            </div>
            <div className="femaleDashboard-container" >
           {/*OVDE SE IMPLEMENTIRA OSTALO STO HOCUUUU!! */}
            </div>
            </div>
    );
}

export default FemaleDashboard;