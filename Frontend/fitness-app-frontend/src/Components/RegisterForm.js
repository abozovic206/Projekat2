import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterFormInterface.css';

const RegisterForm = ({ onCancel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


  //MORACU PARSIRATI
  const[weight, setWeight]=useState('');
  const[height,setHeight]=useState('');
  const[age, setAge]=useState('');
  const[gender, setGender]=useState('');

  const [error, setError] = useState('');

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const[weightError, setWeightError]=useState(false);
  const[heightError, setHeightError]=useState(false);
  const[ageError,setAgeError]=useState(false);
  const[genderError, setGenderError]=useState(false);

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

    if(!weight || isNaN(parseFloat(weight)) || parseFloat(weight)<=0){
      setWeightError(true);
      formValid=false;
    }else{
      setWeightError(false);
    }

    if(!height || isNaN(parseFloat(height)) || parseFloat(height)<=0){
      setHeightError(true);
      formValid=false;
    }else{
      setHeightError(false);
    }

    if(!age || isNaN(parseInt(age)) || parseInt(age)<=0){
      setAgeError(true);
      formValid=false;
    }else{
      setAgeError(false);
    }

    if (!gender) {
      setGenderError(true);
      formValid = false;
    } else {
      setGenderError(false);
    }





    if (!formValid) {
      setError('All fields are required!');
      return;
    }

    const data = {
      firstName,
      lastName,
      userName,
      password,
      email,
      weight,
      height,
      age,
      gender
    };

    try {
      const response = await axios.post('http://localhost:5063/api/Auth/register', data);
      console.log('Registration successful', response);

      // Resetovanje polja nakon uspešne registracije
      setFirstName('');
      setLastName('');
      setUserName('');
      setPassword('');
      setEmail('');
      setWeight('');
      setHeight('');
      setAge('');
      setGender('');
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
           <input
          type="number"
          placeholder='Weight'
          step="any"
          value={weight}
          onChange={(e)=>setWeight(e.target.value)}
          className={weightError?'input-error':'input'}
          />
           <input
          type="number"
          step="any"
          placeholder='Height'
          value={height}
          onChange={(e)=>setHeight(e.target.value)}
          className={heightError?'input-error':'input'}
          />
           <input
          type="number"
          placeholder='Age'
          value={age}
          onChange={(e)=>setAge(e.target.value)}
          className={ageError?'input-error':'input'}
          />
           <select 
          value={gender}
          onChange={(e)=>setGender(e.target.value)}
          className={genderError?'input-error':'input'}
          >
            <option value="">Select gender</option>
            <option value="M">M</option>
            <option value="Z">Ž</option>
          </select>

        <button type="submit" className="buttonRegister">Regiser</button>
        <button type="button"  onClick={onCancel} className="ButtonCancelRegister">Cancel</button>
        </form>
        

      </div>

    </div>

  );
};    
   
  




export default RegisterForm;
