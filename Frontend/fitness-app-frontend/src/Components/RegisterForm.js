import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterFormInterface.css';

const RegisterForm = ({ onCancel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(''); //Brise prethodnu gresku tjst postavlja Error na praznu vrijednost
    let formValid = true;

    if (!firstName) {
      setFirstNameError(true);
      formValid = false;
    } else {
      setFirstNameError(false);
    }

    if (!lastName) {
      setLastNameError(true);
      formValid = false;
    } else {
      setLastNameError(false);
    }

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

    if (!email) {
      setEmailError(true);
      formValid = false;
    } else {
      setEmailError(false);
    }

    if (!formValid) {
      setError('All fields are required!');
      return;
    }

    const data = {
      firstName,
      lastName,
      userName,
      passwordHash: password,
      email,
    };

    try {
      const response = await axios.post('http://localhost:5063/api/User/register', data);
      console.log('Registration successful', response);

      // Resetovanje polja nakon uspešne registracije
      setFirstName('');
      setLastName('');
      setUserName('');
      setPassword('');
      setEmail('');
    } catch (error) {
      setError('There was an error with registration');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="form-container" onClick={(e)=>e.stopPropagation()}>
        <h2 className="titleRegister">Regiser</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className='form'>
          <input
          type="text"
          placeholder="First name"
          value={firstName}
     //ovde
         onChange={(e) => setFirstName(e.target.value)}
            className={firstNameError? 'input-error':'input'}
          />
          <input
          type="text"
          placeholder='Last name'
          value={lastName}
          onChange={(e)=>setLastName(e.target.value)}
          className={lastNameError?'input-error':'input'}
          />
          <input
          type="text"
          placeholder='Username'
          value={userName}
          onChange={(e)=>setUserName(e.target.value)}
          className={userNameError?'input-error':'input'}
          />
          <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className={passwordError?'input-error':'input'}
          />
          <input
          type="text"
          placeholder='Email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className={emailError?'input-error':'input'}
          />

        <button type="submit" className="buttonRegister">Regiser</button>
        <button type="button"  onClick={onCancel} className="ButtonCancelRegister">Cancel</button>
        </form>
        

      </div>

    </div>

  );
};    
   
  




export default RegisterForm;
