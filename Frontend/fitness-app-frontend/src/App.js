import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Home from './Home';
import FemaleDashboard from './gender/FemaleDashboard';
import ManDashboard from './gender/ManDashboard'; //OVE DVIJE RUTE OBAVEZNE!
import './styles/FitApp.css';
import ProtectedRoute from './protected/ProtectedRoute';


const App = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

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
            <div className="containter"></div>

            {/* Prikazivanje formi za registraciju ili login ako su aktivna */}
            {showRegisterForm && <RegisterForm onCancel={() => setShowRegisterForm(false)} />}
            {showLoginForm && <LoginForm onCancel={() => setShowLoginForm(false)} />}
          </div>
        }
      />
      
      {/* Zašticene rute*/}
      <Route path="/home" element={<ProtectedRoute><Home /> </ProtectedRoute>}/>
      <Route path="/gender/FemaleDashboard" element={<ProtectedRoute><FemaleDashboard /></ProtectedRoute>} />
      <Route path="/gender/ManDashboard" element={<ProtectedRoute><ManDashboard /></ProtectedRoute>} />
    </Routes>
  );
};

export default App;
