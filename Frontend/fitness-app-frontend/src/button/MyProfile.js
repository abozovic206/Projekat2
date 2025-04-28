import React, { useState, useRef } from 'react'; // Dodaj useRef
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import "../styles/MyProfileInterface.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { updateProfilePicture } from '../redux/authSlice';
import { FaSave } from 'react-icons/fa';  // Ovdje importujete ikonu
import '../styles/HomeInterface.css'; // Uveri se da imaš odgovarajući CSS


const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const profilePicture = useSelector((state) => state.auth.profilePicture);
    const weight=useSelector((state)=>state.auth.weight);
    const height=useSelector((state)=>state.auth.height);
    const age=useSelector((state)=>state.auth.age);
    const gender=useSelector((state)=>state.auth.gender);
    const username=useSelector((state)=>state.auth.username);

    const [profileData, setProfileData] = useState({
        profilePicture: null
    });

    // useRef za referencu na file input
    const fileInputRef = useRef(null);

    // Funkcija za promjenu podataka u formi
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setProfileData({
            ...profileData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    // Funkcija za logout
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/');
    };

    // Funkcija koja otvara file input kad korisnik klikne na sliku
    const handleClickProfilePicture = () => {
        fileInputRef.current.click();
    };

    // Funkcija za submit forme
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        //Kreiranje FormData objekta za slanje svih podataka
        const formData = new FormData();
        formData.append('profilePicture', profileData.profilePicture);

        //Ako je korisnik izabrao novu sliku dodaj je u FormData
        if (profileData.profilePicture) {
            formData.append('profilePicture', profileData.profilePicture);
        }

        // Ispisivanje sadržaja FormData u konzolu
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);  // Prikazuje ključ i vrednost u konzoli
        }

        try {
            const response = await axios.put('http://localhost:5063/api/userprofile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', //salje podatke koji podrzava slanje fajlova
                    'Authorization': `Bearer ${localStorage.getItem('token')}`  // za provjeru identiteta korisnika
                }
            });

            //Ako je uspjesno azuriraj profilnu sliku u stanjima
            setProfileData({
                ...profileData,
                profilePicture: response.data.profilePicture //url koji je vratio backend
            });

            //Ako je uspjesno azurirana slika, azurira se redux
            if (response.data.profilePicture) {
                dispatch(updateProfilePicture(response.data.profilePicture));
            }

        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <div className="app">
            <div className="navbar-home">
                <div className="logo-container">
                    <div className="logo-circle">A</div>
                    <span className="logo-text">FitnessAppAndreja</span>
                </div>
                <div className='option-container'>
          <button className='profile-button' onClick={() => navigate('/home')}><i className='fa fa-home'></i></button>
          <button className='training-button' onClick={() => navigate('/training/TrainingHomePage')}><i className='fas fa-dumbbell'></i></button>
          <button className='motivation-button'><i className='fa fa-apple-alt icon'></i></button>
        </div>
                <div className="nav-buttons">
                    <button onClick={handleLogout} className="LRButton RButton">Logout</button>
                </div>
            </div>

            <div className="profile-page-scroll"> {/* Dodajem scroll ovde */}
                {/* Profilna slika */}
                <div className="profile-picture-preview" onClick={handleClickProfilePicture}>
                    {profileData.profilePicture ? (
                        <img
                            src={URL.createObjectURL(profileData.profilePicture)} // Ovdje koristimo ObjectURL za prikazivanje slike odmah kad je ono ponovo izaberem
                            alt="Profile"
                            className="profile-picture"
                        />
                    ) : profilePicture ? (
                        <img
                            src={`http://localhost:5063/${profilePicture}`} 
                            alt="Profile"
                            className="profile-picture"
                        />
                    ) : (
                        <div className="profile-picture-placeholder">Profile Picture</div>
                    )}
                    <input
                        type="file"
                        name="profilePicture"
                        ref={fileInputRef}
                        onChange={handleChange}
                        style={{ display: 'none' }} 
                    />
                </div>

                {/* Profilna slika + dugme pored */}
                <div className="profile-picture-container">
                    <button onClick={handleSubmit} className="submit-button">
                        <FaSave size={24} /> {/* Ikona sa veličinom 24 */}
                    </button>
                </div>
                <h3 className='naslov'>Tvoji podaci {username}</h3>
            </div>

          <div className='home-content'>
            <div className='card-content-profile'>
                 {/* Moj profil */}
          <div className="home-card profile-card" >
          <i className="fa fa-balance-scale icon"></i> {/* Ikonica za balans vagu */}
          <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>{weight}(kg)</h2>
            <h2>Tezina</h2>
            </div>
            <div className="home-card profile-card" >
            <i className="fa fa-ruler-vertical icon"></i> {/* Ikonica za visinu */}
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>{height}(cm)</h2>
            <h2>Visina</h2>
            </div>
            <div className="home-card profile-card">
            <i className="fa fa-calendar icon"></i> {/* Ikonica za godine */}
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>{age}</h2>
            <h2>Godine</h2>
            </div>
            <div className="home-card profile-card">
            <i className="fa fa-venus-mars icon"></i> {/* Ikonica za pol */}
            <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>{gender}</h2>
            <h2>Pol</h2>
            </div>

            </div>

          </div>


        </div>
    );
};

export default MyProfile;