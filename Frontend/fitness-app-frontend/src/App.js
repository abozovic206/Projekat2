import React, { useState } from 'react';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import './styles/FitApp.css'; // Stilizuj aplikaciju


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
    <div className="app">
      <div className="navbar">
        <div className="logo-container">
          <div className="logo-circle">A</div>
          <span className="logo-text">FitnessAppAndreja</span>
        </div>
        <div className="nav-buttons">
          <button className="RButton LRButton"onClick={handleRegisterClick}>Register</button>
          <button className="LButton LRButton"  onClick={handleLoginClick}>Login</button>
        </div>
      </div>
      <div className="containter">
      </div>

      {/* Prikazuje RegisterForm ako je stanje true */}
      {showRegisterForm && <RegisterForm onCancel={() => setShowRegisterForm(false)} />}

      {/* Prikazuje LoginForm ako je stanje true */}
      {showLoginForm && <LoginForm onCancel={() => setShowLoginForm(false)} />}
    </div>
  );
};

export default App;
