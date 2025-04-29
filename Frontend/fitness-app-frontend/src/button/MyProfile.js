import React, { useState, useRef } from 'react'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, updateWeight, updateProfilePicture, updateHeight} from '../redux/authSlice';
import "../styles/MyProfileInterface.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
//import { updateProfilePicture } from '../redux/authSlice';
import { FaSave } from 'react-icons/fa';  
import '../styles/HomeInterface.css';

const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profilePicture = useSelector((state) => state.auth.profilePicture);
    const weight = useSelector((state) => state.auth.weight);
    const height = useSelector((state) => state.auth.height);
    const age = useSelector((state) => state.auth.age);
    const gender = useSelector((state) => state.auth.gender);
    const username = useSelector((state) => state.auth.username);


    const formData = new FormData();

    const [profileData, setProfileData] = useState({
        profilePicture: null,
        weight:null
    });

    //Weight
    const [isWeightInputVisible, setIsWeightInputVisible] = useState(false); // State za prikazivanje inputa
    const [newWeight, setNewWeight] = useState(weight); // Držimo staru tezinu dok je unosimo

    //Height
    const [isHeightInputVisible, setIsHeightInputVisible]=useState(false);
    const[newHeight, setNewHeight]=useState(height); //pocetni state je tezina iz baze koju dobijemo preko redux-a

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setProfileData({
            ...profileData,
            [name]: type === 'file' ? files[0] : value
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/');
    };

    const handleClickProfilePicture = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.append('profilePicture', profileData.profilePicture);
        

       

        try {
            const response = await axios.put('http://localhost:5063/api/userprofile/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });


            if (response.data.profilePicture) {
                dispatch(updateProfilePicture(response.data.profilePicture));
                window.alert("Profilna slika je uspešno ažurirana!"); // Dodan alert
            }

        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    //WEIGHT
    const handleBlur = () => {
        handleSaveWeight();
        setIsWeightInputVisible(false);
    };

    //HEIGHT
    const handleBlurHeight=()=>{
        handleSaveHeight();
        setIsHeightInputVisible(false); //znaci kad pritisne sa strane da se sacuva tezina i da se ukloni vidljivost input-a

    }


    // Funkcija koja menja stanje inputa za težinu
    const handleWeightClick = () => {
        setNewWeight(weight); // Prikazuje trenutnu težinu u inputu
        setIsWeightInputVisible(true);
    };

    //Funkcija koja mijenja stanje inputa za visinu
    const handleHeightClick=()=>{
        setNewHeight(height);//PRIKAZUJE TRENUTNU VISINU INPUTA
        setIsHeightInputVisible(true); //omogucava vidljivost input-a
    }

    // Funkcija za unos nove težine
    const handleWeightChange = (e) => {
        setNewWeight(e.target.value);
    };

    //Funkcija za unos nove visine
    const handleHeightChange=(e)=>{
        setNewHeight(e.target.value);
    }

    // Funkcija za potvrdu unosa nove težine
    const handleSaveWeight = async () => {
    try {
        const weightAsFloat = parseFloat(newWeight);

        formData.append('weight', weightAsFloat);

        const response = await axios.put(
            'http://localhost:5063/api/userprofile/update',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        if (response.data.success) {
            dispatch(updateWeight(response.data.weight));
            setIsWeightInputVisible(false);
        }
    } catch (error) {
        console.error("Greška prilikom ažuriranja težine:", error);
    }
};


//funkcija za potvrdu nove visine
const handleSaveHeight = async (e) => {
    try {

        e.preventDefault();
        const heightAsFloat = parseFloat(newHeight);

        formData.append('height', heightAsFloat);

        const response = await axios.put(
            'http://localhost:5063/api/userprofile/update',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        if (response.data.success) {
            dispatch(updateHeight(response.data.height)); ///OVO BI TREBALO BITI ODGOVORNO ZA AUTOMATSKO AZURIRANJE
            setIsHeightInputVisible(false);
        }
    } catch (error) {
        console.error("Greška prilikom ažuriranja težine:", error);
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

            <div className="profile-page-scroll">
                <div className="profile-picture-preview" onClick={handleClickProfilePicture}>
                    {profileData.profilePicture ? (
                        <img
                            src={URL.createObjectURL(profileData.profilePicture)}
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

                <div className="profile-picture-container">
                    <button onClick={handleSubmit} className="submit-button">
                        <FaSave size={24} />
                    </button>
                </div>
            </div>

            <div className='home-content'>
                <div className='card-content-profile'>
                    <div className="home-card profile-card">
                        <i className="fa fa-balance-scale icon"></i>
                        <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>
                            {isWeightInputVisible ? (
                                <input
                                    type="number"
                                    value={newWeight}
                                    onChange={handleWeightChange}
                                    onBlur={handleBlur} // Spremi i sakrij kada korisnik klikne van inputa
                                    autoFocus
                                />
                            ) : (
                                <span onClick={handleWeightClick}>{weight}(kg)</span>
                            )}
                        </h2>
                        <h2>Tezina</h2>
                    </div>

                    <div className="home-card profile-card">
                        <i className="fa fa-ruler-vertical icon"></i>
                        <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>
                        {isHeightInputVisible ? (
                                <input
                                    type="number"
                                    value={newHeight}
                                    onChange={handleHeightChange}
                                    onBlur={handleBlurHeight} // Spremi i sakrij kada korisnik klikne van inputa
                                    autoFocus
                                />
                            ) : (
                                <span onClick={handleHeightClick}>{height}(kg)</span>
                            )}
                        </h2>
                        
                        <h2>Visina</h2>
                    </div>
                    <div className="home-card profile-card">
                        <i className="fa fa-calendar icon"></i>
                        <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>{age}</h2>
                        <h2>Godine</h2>
                    </div>
                    <div className="home-card profile-card">
                        <i className="fa fa-venus-mars icon"></i>
                        <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>{gender}</h2>
                        <h2>Pol</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
