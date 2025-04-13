import React, { useState } from 'react';
import '../styles/LoginFormInterface.css';
// Odavde pocinjem REDUX
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = ({ onCancel }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // REDUX
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Ispravno pozivanje useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let formValid = true;

    if (!userName) {
      setUserNameError(true);
      formValid = false;
    } else {
      setUserNameError(false);
    }

    if (!password) {
      setPasswordError(true);
      formValid = false;
    } else {
      setPasswordError(false);
    }

    if (!formValid) {
      setError('All fields are required!');
      return;
    }

    const data = { userName, password };

    // Use fetch for login
    try {
      const response = await fetch('http://localhost:5063/api/User/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // Pretvara podatke u JSON format
      });

      console.log('Login successful', response);
      setUserName('');
      setPassword('');

      if (response.ok) {
        const dataToken = await response.json();
        console.log("Odgovor sa servera:", dataToken);
        dispatch(loginSuccess({
          token: dataToken.token,
          userName: dataToken.userName,
        })); // Cuva token u reduxu

        const from = location.state?.from || "/home"; // Ispravno preusmeravanje
        navigate(from, { replace: true }); // Preusmjeri korisnika na originalnu stranicu
        onCancel(); // Zatvori formu nakon uspešne prijave
      } else {
        alert('Pogrešan login');
      }
    } catch (error) {
      setError('There was an error with login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="overlay-login" onClick={onCancel}>
      <div className="form-containter-login" onClick={(e) => e.stopPropagation()}>
        <h2 className="title-login">Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form-login">
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={userNameError ? 'input-error-login' : 'input-login'}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? 'input-error-login' : 'input-login'}
          />
          <button type="submit" className="submit-login">
            Login
          </button>
          <button type="button" className="cancel-login" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
