import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginFormInterface.css';

const LoginForm = ({ onCancel }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

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

    try {
      const response = await axios.post('http://localhost:5063/api/User/login', data);
      console.log('Login successful', response);
      setUserName('');
      setPassword('');
    } catch (error) {
      setError('There was an error with login');
      console.error('Login error:', error);
    }
  };

  return (
    <div className='overlay-login' onClick={onCancel}>
      <div className='form-containter-login' onClick={(e)=>e.stopPropagation()}>
        <h2 className='title-login'>Login</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit} className='form-login'>
          <input 
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={userNameError ? 'input-error-login': 'input-login'}
          />
          <input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError?'input-error-login':'input-login'}
          />
          <button type="submit" className='submit-login'>Login</button>
          <button type="button" className='cancel-login' onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

const styles = {

};

export default LoginForm;
