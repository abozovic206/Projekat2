import React from 'react';
import { useDispatch, useSelector, useState } from 'react-redux';//PREBITNO
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice'; //OVO JE OBAVEZNO jer ne mogu drugaciji pristupiti
import '../styles/FemaleDashboardInterface.css';
import '../styles/HomeInterface.css';
import '../styles/Exercises.css';


const FemaleDashboard=()=>
{
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleLogout=()=>{

        dispatch(logout());//brise se iz state-a
        navigate('/'); //vraca se na pocetak
        //MORAM POGLEDATI DA NAPRAVIM DA MI SE NE IZLOGUJE SVAKI PUT KAD REFRESUJEM STRANICU NEGO DA SE TOKEN OBRISEM KAD IDEM NA LOGOUT

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
      {/*Ovde dodajem button-e na koje kad se klikne on mi otvori formu u kojoj su slike vjezbi plus objasnjenja */}
     <div className='female-dashboard-wrapper'>
     <div className='exercises-button'>
        <button className='day1-button woman' onClick={() => navigate('/training/TrainingForWomanDay1')}><span>DAY1</span></button>
        <button className='day2-button woman'><span>DAY2</span></button>
        <button className='day3-button woman'><span>DAY3</span></button>
        <button className='day4-button woman'><span>DAY4</span></button>
        <button className='day5-button woman'><span>DAY5</span></button>
        <button className='day6-button woman'><span>DAY6</span></button>
        <button className='day7-button woman'><span>DAY7</span></button>
      </div>
     </div>
     
      </div>
    );
}

export default FemaleDashboard;