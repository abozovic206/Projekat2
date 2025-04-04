import React, { useState } from 'react';
import RegisterForm from './Components/RegisterForm'; // Importuj formu za registraciju
import './styles/FitApp.css'; // Stilizuj aplikaciju

const App = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
  };

  return (
    <div className="app">
      {/* Top navigation bar */}
      <div className="navbar">
        <div className="app-name">FitnessAppAndreja</div>
        <div className="nav-buttons">
          <button onClick={handleRegisterClick}>Register</button>
          <button>Login</button>
        </div>
      </div>

      

      {/* Display RegisterForm if showRegisterForm is true */}
      {showRegisterForm && <RegisterForm />}

      {/* Other content of the app */}
    </div>
  );
};

export default App;
