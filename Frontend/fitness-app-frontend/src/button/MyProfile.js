import React, { useState, useRef } from 'react'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, updateWeight, updateProfilePicture, updateHeight, updateAge,updateGender} from '../redux/authSlice';
import "../styles/MyProfileInterface.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
//import { updateProfilePicture } from '../redux/authSlice';
import { FaSave } from 'react-icons/fa';  
import '../styles/HomeInterface.css';
import { useEffect } from 'react';
//mport {BMIKalkulator} from '../kalkulator/BMIKalkulator';
import { FaUserCircle } from 'react-icons/fa';



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
        weight:null, 
        height:null, 
        age:null
    });

    //Weight
    const [isWeightInputVisible, setIsWeightInputVisible] = useState(false); // State za prikazivanje inputa
    const [newWeight, setNewWeight] = useState(weight); // Držimo staru tezinu dok je unosimo

    //Height
    const [isHeightInputVisible, setIsHeightInputVisible]=useState(false);
    const[newHeight, setNewHeight]=useState(height); //pocetni state je tezina iz baze koju dobijemo preko redux-a


    //AGE
    const[isAgeInputVisible, setIsAgeInputVisible]=useState(false);
    const[newAge, setNewAge]=useState(age);

    //GENDER
    const[isGenderInputVisible, setIsGenderInputVisible]=useState(false);
    const[newGender, setNewGender]=useState(gender);





    
    useEffect(() => {
        setNewWeight(weight);
    }, [weight]);

    useEffect(() => {
        setNewHeight(height);
    }, [height]);

    useEffect(() => {
        setNewAge(age);
    }, [age]);


    useEffect(() => {
        setNewGender(gender);
    }, [gender]);
    
    
    

    const fileInputRef = useRef(null);

    //KREIRAM FUNKCIJU
    const createFormData = () => {
        const formData = new FormData();
        if (profileData.profilePicture) {
            formData.append("profilePicture", profileData.profilePicture);
        }
        if (newWeight !== "") {
            formData.append("weight", parseFloat(newWeight));
        }
        if (newHeight !== "") {
            formData.append("height", parseFloat(newHeight));
        }
        if(newAge!==""){
            formData.append("age",parseInt(newAge));
        }
        if (newGender !== "") {
            formData.append("gender", newGender);
        }
        
        return formData;
    };


  

    

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
        const formData=createFormData();

        console.log("STA SE SALJE KAD POZOVEM sliku:",formData);
        

       

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

    //AGE
    const handleBlurAge=()=>{
        handleSaveAge();
        setIsAgeInputVisible(false);
    }

    //GENDER
    const handleBlurGender=()=>{
        handleSaveGender();
        setIsGenderInputVisible(false);
    }


    // Funkcija koja menja stanje inputa za težinu
    const handleWeightClick = () => {
        setNewWeight(newWeight); // Prikazuje trenutnu težinu u inputu
        setIsWeightInputVisible(true);
    };

    //Funkcija koja mijenja stanje inputa za visinu
    const handleHeightClick = () => {
        setNewHeight(newHeight); // Prikazuje trenutnu težinu u inputu
        setIsHeightInputVisible(true);
    };

    //Funkcija koja mijenja input za godine
    const handleAgeClick=()=>{
        setNewAge(newAge);//setuje se ova vrijednost na vrijednost iz baze
        setIsAgeInputVisible(true);//omogucava vidljivost age input-a
    }


    //Funkcija koja mijenja input za pol
    const handleGenderClick=()=>{
        setNewGender(newGender);
        setIsGenderInputVisible(true);
    }

    // Funkcija za unos nove težine
    const handleWeightChange = (e) => {
        const newWeight=e.target.value;
        dispatch(updateWeight(newWeight)); // updateWeight je tvoja akcija
    };

    //Funkcija za unos nove visine
    const handleHeightChange = (e) => {
        const newHeight=e.target.value;
        dispatch(updateHeight(newHeight)); // updateHeight je tvoja akcija
    };

    //Funkcija za unos godina
    const handleAgeChange=(e)=>{
        const newAge=e.target.value;
        dispatch(updateAge(newAge));
    }

    //Funkcija za unos pola
    const handleGenderChange=(e)=>{
        const newGender=e.target.value;
        dispatch(updateGender(newGender));
    }

    // Funkcija za potvrdu unosa nove težine
    const handleSaveWeight = async () => {
    try {
        const formData=createFormData();

        console.log("Podaci koji se šalju za težinu:", formData);

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

        if (response.data.weight !== undefined) {
            dispatch(updateWeight(response.data.weight));
            setIsWeightInputVisible(false);
        }
        
    } catch (error) {
        console.error("Greška prilikom ažuriranja težine:", error);
    }
};


//funkcija za potvrdu nove visine
const handleSaveHeight = async () => {
    try {
        const formData=createFormData();

        console.log("Podaci koji se šalju za težinu:", formData);

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

        if (response.data.height !== undefined) {
            dispatch(updateHeight(response.data.height));
            setIsHeightInputVisible(false);
        }
        
    } catch (error) {
        console.error("Greška prilikom ažuriranja težine:", error);
    }
};


    // Funkcija za potvrdu unosa novih godina
    const handleSaveAge = async () => {
        try {
            const formData=createFormData();
    
            console.log("Podaci koji se šalju za težinu:", formData);
    
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
            if (response.data.age !== undefined) {
                dispatch(updateAge(response.data.age));
                setIsAgeInputVisible(false);
            }
        } catch (error) {
            console.error("Greška prilikom ažuriranja težine:", error);
        }
    };


        // Funkcija za potvrdu unos pola
        const handleSaveGender = async () => {
            try {
                const formData=createFormData();
        
                console.log("Podaci koji se šalju za težinu:", formData);
        
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
                    dispatch(updateGender(response.data.gender));
                    console.log("Podaci se uspjesno salju");
                    setIsWeightInputVisible(false);
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
    <div className="profile-picture-placeholder">
        <FaUserCircle size={100} />
    </div>
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
                                <span onClick={handleWeightClick}>{newWeight?newWeight:0}(kg)</span>
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
                                <span onClick={handleHeightClick}>{newHeight?newHeight:0}(cm)</span>
                            )}
                        </h2>
                        
                        <h2>Visina</h2>
                    </div>
                    <div className="home-card profile-card">
                        <i className="fa fa-calendar icon"></i>
                        <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>
                        {isAgeInputVisible ? (
                                <input
                                    type="number"
                                    value={newAge}
                                    onChange={handleAgeChange}
                                    onBlur={handleBlurAge} // Spremi i sakrij kada korisnik klikne van inputa
                                    autoFocus
                                />
                            ) : (
                                <span onClick={handleAgeClick}>{newAge?newAge:0}(god)</span>
                            )}
                        </h2>
                        <h2>Godine</h2>
                    </div>
                    <div className="home-card profile-card">
    <i className="fa fa-venus-mars icon"></i>
    <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>
        {isGenderInputVisible ? (
            <select
                value={newGender}
                onChange={handleGenderChange}
                onBlur={handleBlurGender} // Spremi i sakrij kada korisnik klikne van inputa
                autoFocus
            >
                <option value="Izaberi">Izaberi</option>
                <option value="Ž">Ž</option>
                <option value="M">M</option>
            </select>
        ) : (
            <span onClick={handleGenderClick}>{newGender?newGender:"Pol"}</span>
        )}
    </h2>
    <h2>Pol</h2>
</div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;