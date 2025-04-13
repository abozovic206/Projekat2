import React from 'react';
import { useDispatch, useSelector, useState } from 'react-redux';//PREBITNO
import { useNavigate } from 'react-router-dom';
import { logout } from './redux/authSlice'; //OVO JE OBAVEZNO jer ne mogu drugaciji pristupiti


const Home=()=>{

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
            <div className="navbar">
              <div className="logo-container">
                <div className="logo-circle">A</div>
                <span className="logo-text">FitnessAppAndreja</span>
              </div>
              <h1>Welcome {userName}</h1>
              <div className="nav-buttons">
                <button onClick={handleLogout} className="RButton LRButton">Logout</button>
              </div>
            </div>
            <div className="containter"></div>
            </div>
    );
};


export default Home;