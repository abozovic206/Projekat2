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
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button>
        </div>
      </div>
      <div className="containter">
        <div className="title">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dumbbell-icon">
        <path d="M4 12h16M12 4l4 4-4 4M12 16l-4-4 4-4"/>
        </svg>
          Welcome to FitnessAppAndreja
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dumbbell-icon">
            <path d="M4 12h16M12 4l4 4-4 4M12 16l-4-4 4-4"/>
          </svg>
        </div>
      </div>

      {/* Prikazuje RegisterForm ako je stanje true */}
      {showRegisterForm && <RegisterForm onCancel={() => setShowRegisterForm(false)} />}

      {/* Prikazuje LoginForm ako je stanje true */}
      {showLoginForm && <LoginForm onCancel={() => setShowLoginForm(false)} />}
    </div>
  );
};

export default App;
