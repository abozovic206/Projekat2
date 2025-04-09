import React, { useState } from 'react';
import RegisterForm from './Components/RegisterForm'; // Importuj formu za registraciju
import LoginForm from './Components/LoginForm'; // Importuj formu za login
import './styles/FitApp.css'; // Stilizuj aplikaciju

const App = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false); // Stanje za login formu

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false); // Sakrij login formu ako je registracija izabrana
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false); // Sakrij registraciju ako je login izabran
  };

  return (
    <div className="app">
      {/* Top navigation bar */}
      <div className="navbar">
        <div className="app-name">FitnessAppAndreja</div>
        <div className="nav-buttons">
          <button onClick={handleRegisterClick}>Register</button>
          <button onClick={handleLoginClick}>Login</button> {/* Dugme za login */}
        </div>
      </div>

      {/* Prikazuje RegisterForm ako je stanje true */}
      {showRegisterForm && <RegisterForm onCancel={()=>setShowRegisterForm(false)}/>}

      {/* Prikazuje LoginForm ako je stanje true */}
      {showLoginForm && <LoginForm onCancel={()=>setShowLoginForm(false)} />}

      {/* Ostali sadržaj aplikacije */}
    </div>
  );
};

export default App;
