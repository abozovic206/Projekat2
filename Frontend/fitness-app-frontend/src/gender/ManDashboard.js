import React from 'react';
import { useDispatch, useSelector, useState } from 'react-redux';//PREBITNO
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice'; //OVO JE OBAVEZNO jer ne mogu drugaciji pristupiti
import '../styles/ManDashboardInterface.css';
import '../styles/HomeInterface.css';
import '../styles/Exercises.css';


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
        <button className='profile-button' onClick={() => navigate('/home')}><i className='fa fa-home'></i></button>
          <button className='training-button' onClick={() => navigate('/training/TrainingHomePage')}><i className='fas fa-dumbbell'></i></button>
          <button className='motivation-button'><i className='fa fa-apple-alt icon'></i></button>
        </div>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="LRButton RButton">Logout</button>
        </div>
      </div>
      <div className='man-dashboard-wraper'>
      <div className='exercises-button'>
      <button className='day1-button man'><span>DAY1</span></button>
        <button className='day2-button man'><span>DAY2</span></button>
        <button className='day3-button man'><span>DAY3</span></button>
        <button className='day4-button man'><span>DAY4</span></button>
        <button className='day5-button man'><span>DAY5</span></button>
        <button className='day6-button man'><span>DAY6</span></button>
        <button className='day7-button man'><span>DAY7</span></button>
        </div>
      </div>
      </div>
    );
}

export default ManDashboard;