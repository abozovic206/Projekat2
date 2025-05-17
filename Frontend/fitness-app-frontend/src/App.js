import React, { useState, useEffect } from 'react';  // Dodajte useEffect
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Home from './Home';
import FemaleDashboard from './gender/FemaleDashboard';
import ManDashboard from './gender/ManDashboard';
import './styles/FitApp.css';
import ProtectedRoute from './protected/ProtectedRoute';
import TrainingHomePage from './training/TrainingHomePage';
import MyProfile from './button/MyProfile';
import NutritionForm from './nutrition/NutritionForm';
import AddNutritionForm from './nutrition/AddNutritionForm';

import Day1Training from './training/TrainingForWomanDay1';



import SlideShow from './slide/SlideShow';//DODALA SAM OVO

import { useDispatch } from 'react-redux';  // Treba da importujete useDispatch
import { loginSuccess } from './redux/authSlice';  // Treba da importujete loginSuccess

/* FontAwesome ikone */
import 'font-awesome/css/font-awesome.min.css'; // Dodajemo FontAwesome ikone


const App = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const dispatch = useDispatch();  // Definišite dispatch

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  // DODAJEMO OVO NOVO
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    
    if (storedToken && storedUserName) {
      // Ako postoji token u localStorage, postavi ga u Redux
      dispatch(loginSuccess({ token: storedToken, userName: storedUserName }));
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="app">
            <div className="navbar">
              <div className="logo-container">
                <div className="logo-circle">A</div>
                <span className="logo-text">FitnessAppAndreja</span>
              </div>
              <div className="nav-buttons">
                <button className="RButton LRButton" onClick={handleRegisterClick}>
                  Register
                </button>
                <button className="LButton LRButton" onClick={handleLoginClick}>
                  Login
                </button>
              </div>
            </div>
            <SlideShow/>
            <div className="containter"></div>

            {/* Prikazivanje formi za registraciju ili login ako su aktivna */}
            {showRegisterForm && <RegisterForm onCancel={() => setShowRegisterForm(false)} />}
            {showLoginForm && <LoginForm onCancel={() => setShowLoginForm(false)} />}
          </div>
        }
      />
      
      {/* Zašticene rute */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/training/TrainingHomePage" element={<ProtectedRoute><TrainingHomePage /></ProtectedRoute>} />
      <Route path="/gender/FemaleDashboard" element={<ProtectedRoute><FemaleDashboard /></ProtectedRoute>} />
      <Route path="/gender/ManDashboard" element={<ProtectedRoute><ManDashboard /></ProtectedRoute>} />
      <Route path="button/MyProfile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
      <Route path="/nutrition/NutritionForm" element={<ProtectedRoute><NutritionForm /></ProtectedRoute>}/>
      <Route path="/nutrition/add" element={<AddNutritionForm />} />
       <Route path="/training/TrainingForWomanDay1" element={<Day1Training />} />


      
    </Routes>
  );
};

export default App;
