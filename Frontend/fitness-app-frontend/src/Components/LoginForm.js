import React, { useState } from 'react';
import axios from 'axios';

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

    const data = {
      userName,
      password: password,   //ZNACI OVDE OBAVEZNO PASSWORD UMJESTO PASSWORDHASH
    };

    try {
      const response = await axios.post('http://localhost:5063/api/User/login', data);
      console.log('Login successful', response);

      // Resetovanje polja nakon uspešnog logovanja
      setUserName('');
      setPassword('');
    } catch (error) {
      setError('There was an error with login');
      console.error('There was an error!', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={userNameError ? styles.inputError : styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={passwordError ? styles.inputError : styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f2f2f2',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
    width: '100%',
    maxWidth: '350px',
  },
  inputError: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid red',
    fontSize: '14px',
    width: '100%',
    maxWidth: '350px',
  },
  button: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#5a67d8',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    width: '100%',
    maxWidth: '350px',
  },
  cancelButton: {
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    width: '100%',
    maxWidth: '350px',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  }
};

export default LoginForm;
