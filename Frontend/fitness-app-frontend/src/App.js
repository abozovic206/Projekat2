// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Dodaj Routes i Route iz React Router-a
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Home from './Home'; // Importuj Home komponentu
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
    <Routes>
      <Route path='/' element={
            <div className="app">
            <div className="navbar">
              <div className="logo-container">
                <div className="logo-circle">A</div>
                <span className="logo-text">FitnessAppAndreja</span>
              </div>
              <div className="nav-buttons">
                <button className="RButton LRButton" onClick={handleRegisterClick}>Register</button>
                <button className="LButton LRButton" onClick={handleLoginClick}>Login</button>
              </div>
            </div>
            <div className="containter"></div>
      
            {/* Prikazuje RegisterForm kao je stanje true */}
            {showRegisterForm && <RegisterForm onCancel={() => setShowRegisterForm(false)} />}
      
            {/* Prikazuje LoginForm ako je stanje true */}
            {showLoginForm && <LoginForm onCancel={() => setShowLoginForm(false)} />}
      
            {/* Definiši rute */}
            <Routes>
              <Route path="/home" element={<Home />} /> {/* Ruta za Home stranicu */}
            </Routes>
          </div>

      }/>
      <Route path='/Home' element={<Home/>}></Route>
      

    </Routes>
  );
};

export default App;
