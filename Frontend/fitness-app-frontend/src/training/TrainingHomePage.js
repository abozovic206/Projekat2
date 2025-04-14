import React from 'react';
import { useDispatch, useSelector, useState } from 'react-redux';//PREBITNO
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice'; //OVO JE OBAVEZNO jer ne mogu drugaciji pristupiti
import '../styles/HomeInterface.css';
import FemaleDashboard from '../gender/FemaleDashboard.js'; //OVAKO SE IMPORTUE NE PRAVI VISE GRESKU
import ManDashboard from '../gender/ManDashboard.js';


const TrainingHomePage=()=>{

  //ova varijabla cuva ulogovanog korisnika
    const userName=useSelector((state)=>state.auth.userName);

    //REDUX
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout=()=>{
      dispatch(logout()); //brise se iz state-a
      navigate('/'); //vraca na pocetnu
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
            <div className="home-container" >
            <button className='gender-button female' onClick={()=>navigate('/gender/FemaleDashboard')}>
              <span>Žene</span>
            </button>
            <button className='gender-button man' onClick={()=>navigate('/gender/ManDashboard')}>
              <span>Muškarci</span>

            </button>
            </div>
            </div>
    );
};


export default TrainingHomePage;