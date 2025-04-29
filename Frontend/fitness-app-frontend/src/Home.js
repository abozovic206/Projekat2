import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './redux/authSlice';
import './styles/HomeInterface.css'; // Uveri se da imaš odgovarajući CSS
import FemaleDashboard from './gender/FemaleDashboard.js';
import ManDashboard from './gender/ManDashboard.js';
import TrainingHomePage from './training/TrainingHomePage.js';
import MyProfile from './button/MyProfile.js';



/* FontAwesome ikone */
import 'font-awesome/css/font-awesome.min.css'; // Dodajemo FontAwesome ikone

const Home = () => {
  const userName = useSelector((state) => state.auth.userName);
  const firstName=useSelector((state)=>state.auth.firstName);
  const lastName=useSelector((state)=>state.auth.lastName);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //LISTA SAVJETA ZA ISHRANU
  const nutritionTips=[
    "Pijte najmanje 8 čaša vode dnevno.",
    "Uključite voće uz svaki doručak.",
    "Izbjegavajte gazirana pića - izaberite prirodne sokove",
    "Jedine balansirano, unosite voće i povrće",
    "Ne preskačite doručak, to je najvažniji obrok!",
    "Izbjegavajte užine kasno u veče",
    "Jedite pomalo i izbalansirano u toku dana."
  ]

  //Stanje za prikaz nasumičnih savjeta
  const[randomTip, setRandomTip]=useState("");

  //Funkcija za nasumicni odabir
  const generateRandomTip=()=>{
    const randomIndex=Math.floor(Math.random()*nutritionTips.length);
    setRandomTip(nutritionTips[randomIndex]);
  }


  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="app">
      <div className="navbar-home">
        <div className="logo-container">
          <div className="logo-circle">A</div>
          <span className="logo-text">FitnessAppAndreja</span>
        </div>
        <div className='option-container'>
          <button className='profile-button' onClick={() => navigate('/home')}><i className='fa fa-home'></i></button>
          <button className='training-button' onClick={() => navigate('/training/TrainingHomePage')}><i className='fas fa-dumbbell'></i></button>
          <button className='motivation-button'><i className='fa fa-apple-alt icon'></i></button>
        </div>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="LRButton RButton">Logout</button>
        </div>
      </div>

      {/* Welcome poruka */}
      <h1 className="welcome-text">Welcome {firstName} {lastName}!</h1>

      {/* Novi sadržaj ispod */}
      <div className="home-content">
        <div className="card-container">
          {/* Moj profil */}
          <div className="home-card profile-card" onClick={()=>navigate('/button/MyProfile')}>
            <i className="fa fa-user icon"></i> {/* Ikonica za BMI */}
            <h2>My Profile</h2>
            </div>

          {/* BMI Calculator */}
          <div className="home-card bmi-card" onClick={() => navigate('/bmi')}>
            <i className="fa fa-weight icon"></i> {/* Ikonica za BMI */}
            <h2>BMI Calculator</h2>
          </div>

          {/* Workout Tracker */}
          <div className="home-card workout-card" onClick={() => navigate('/training/TrainingHomePage')}>
            <i className="fa fa-dumbbell icon"></i> {/* Ikonica za Workout */}
            <h2>Workout Tracker</h2>
          </div>

          {/* Nutrition Tips */}
          <div className="home-card nutrition-card" onClick={generateRandomTip}>
            <i className="fa fa-apple-alt icon"></i> {/* Ikonica za Nutrition Tips */}
            <h2>Nutrition Tips</h2>
            <ul>
              <p>{randomTip || "Click to get a nutrition tip"}</p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
