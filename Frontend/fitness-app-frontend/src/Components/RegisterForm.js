import React, { useState } from 'react';
import axios from 'axios';

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

    setError('');
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
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Register</h2> {/* Ovdje se naslov nalazi unutar forme */}
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={firstNameError ? styles.inputError : styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={lastNameError ? styles.inputError : styles.input}
          />
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
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={emailError ? styles.inputError : styles.input}
          />
          <button type="submit" style={styles.button}>Register</button>
          <button type="button" onClick={onCancel} style={styles.cancelButton}>Cancel</button>
        </form>
      </div>
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
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formContainer: {
    position: 'relative',
    paddingTop: '20px',  // Razmak između naslova i forme
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

export default RegisterForm;
