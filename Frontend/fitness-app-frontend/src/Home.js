import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './redux/authSlice';
import './styles/HomeInterface.css'; // Uveri se da imaš odgovarajući CSS
import FemaleDashboard from './gender/FemaleDashboard.js';
import ManDashboard from './gender/ManDashboard.js';
import TrainingHomePage from './training/TrainingHomePage.js';
import MyProfile from './button/MyProfile.js';
import BMIKalkulator from './kalkulator/BMIKalkulator.js';
import BMRKalkulator from './kalkulator/BMRKalkulator.js';
import WeightChart from './kalkulator/WeightChart';

// FontAwesome ikone
import 'font-awesome/css/font-awesome.min.css'; // Dodajemo FontAwesome ikone

const Home = () => {
  const userName = useSelector((state) => state.auth.userName);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dodavanje BMI forme
  const [isBMICalculatorVisible, setIsBMICalculatorVisible] = useState(false);

  // Dodavanje BMR forme
  const [isBMRCalculatorVisible, setIsBMRCalculatorVisible] = useState(false);

  // LISTA SAVJETA ZA ISHRANU
  const nutritionTips = [
    "Pijte najmanje 8 čaša vode dnevno.",
    "Uključite voće uz svaki doručak.",
    "Izbjegavajte gazirana pića - izaberite prirodne sokove",
    "Jedite balansirano, unosite voće i povrće",
    "Ne preskačite doručak, to je najvažniji obrok!",
    "Izbjegavajte užine kasno uveče",
    "Jedite pomalo i izbalansirano u toku dana."
  ];

  // Stanje za prikaz nasumičnih saveta
  const [randomTip, setRandomTip] = useState("");
  const [randomTip2, setRandomTip2] = useState("");
  const [randomTip3, setRandomTip3] = useState("");
  // Funkcija za nasumični odabir
  const generateRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * nutritionTips.length);
    const randomIndex2 = Math.floor(Math.random() * nutritionTips.length);
    const randomIndex3 = Math.floor(Math.random() * nutritionTips.length);
    setRandomTip(nutritionTips[randomIndex]);
    setRandomTip2(nutritionTips[randomIndex2]);
    setRandomTip3(nutritionTips[randomIndex3]);
  };

  // ZA WEIGHT CHART
  const [showChart, setShowChart] = useState(false);
  

  // HANDLE ZA BMI
  const handleBMIClick = () => {
    setIsBMICalculatorVisible(!isBMICalculatorVisible);
  };

  // HANDLE ZA BMR
  const handleBMRClick = () => {
    setIsBMRCalculatorVisible(!isBMRCalculatorVisible); // Kad se klikne promeni se stanje
  };

  // HANDLE WEIGHT CHART
  const handleWeightChartClick = () => {
    setShowChart((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="appHome">
      <div className="navbar-home">
        <div className="logo-container">
          <div className="logo-circle">A</div>
          <span className="logo-text">FitnessAppAndreja</span>
        </div>
        <div className="option-container">
          <button className="profile-button" onClick={() => navigate('/home')}><i className="fa fa-home"></i></button>
          <button className="training-button" onClick={() => navigate('/training/TrainingHomePage')}><i className="fas fa-dumbbell"></i></button>
          <button className="motivation-button" onClick={()=>navigate('/nutrition/NutritionForm')}><i className="fa fa-apple-alt icon"></i></button>
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
          <div className="home-card profile-card" onClick={() => navigate('/button/MyProfile')}>
            <i className="fa fa-user icon"></i> {/* Ikonica za BMI */}
            <h2>My Profile</h2>
            <p style={{ fontSize: 20 }}><strong>Username:{userName}</strong></p>
          </div>

          {/* BMI Calculator */}
          <div className="home-card bmi-card">
            <i className="fa fa-weight icon"></i> {/* Ikonica za BMI */}
            <button name="btnBMI" onClick={handleBMIClick}>BMI Izračun</button>
            <h2>BMI Calculator</h2>
            {isBMICalculatorVisible && <BMIKalkulator />} {/* Prikazuje BMI kalkulator ako je true */}
          </div>

          {/* Workout Tracker */}
          <div className="home-card workout-card">
            <i className="fa fa-heartbeat icon"></i> {/* Ikonica za Workout */}
            <button name="btnBMR" onClick={handleBMRClick}>BMR Izračun</button>
            <h2>BMR Kalkulator</h2>
            {isBMRCalculatorVisible && <BMRKalkulator />}
          </div>

          {/* Nutrition Tips */}
          <div className="home-card nutrition-card" onClick={generateRandomTip}>
            <i className="fa fa-apple-alt icon"></i> {/* Ikonica za Nutrition Tips */}
            <h2>Nutrition Tips</h2>
            <ul>
              <p>{randomTip || "Click to get a nutrition tip"}</p>
              <p>{randomTip2 || "Click to get a nutrition tip"}</p>
            </ul>
          </div>

          {/* WeightChart */}
          <div className="home-card weightChart-card" onClick={handleWeightChartClick}>
            <i className="fas fa-weight-scale text-[#530018]"></i> {/* Ikonica za Weight Chart */}
            <h2>Praćenje kilaze</h2>
          </div>

          {/* Prikaz forme (WeightChart) ako je aktivna */}
{showChart && (
  <div className="mt-4">
    <WeightChart setShowChart={setShowChart} />  {/* Prosleđujemo setShowChart kao prop */}
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default Home;
