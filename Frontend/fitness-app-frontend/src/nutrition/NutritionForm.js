import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import '../styles/NutritionForm.css'; // Dodajemo import za CSS fajl

const NutritionForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  }

  const [nutritions, setNutritions] = useState([]);
  const [filteredNutritions, setFilteredNutritions] = useState([]);
  const [mealType, setMealType] = useState(''); // Dodajemo stanje za tip obroka (dorucak, rucak, vecera)

  useEffect(() => {
    axios.get('http://localhost:5063/api/nutrition')
      .then(response => {
        setNutritions(response.data);
        setFilteredNutritions(response.data); // Podesimo inicijalne filtrirane podatke
      })
      .catch(error => {
        console.error("Greska prilikom dohvacanja podataka:", error);
      });
  }, []);

  const handleFilter = (mealType) => {
    setMealType(mealType); // Postavljanje izabranog tipa obroka
    if (mealType === 'all') {
      setFilteredNutritions(nutritions); // Ako je "sve" odabrano, prikazujemo sve
    } else {
      setFilteredNutritions(nutritions.filter(nutrition => nutrition.mealType.toLowerCase() === mealType.toLowerCase()));
    }
  };

  return (
    <div className="appNutrition">
      <div className="navbar-home">
        <div className="logo-container">
          <div className="logo-circle">A</div>
          <span className="logo-text">FitnessAppAndreja</span>
        </div>
        <div className="option-container">
          <button className="profile-button" onClick={() => navigate('/home')}><i className="fa fa-home"></i></button>
          <button className="training-button" onClick={() => navigate('/training/TrainingHomePage')}><i className="fas fa-dumbbell"></i></button>
          <button className="motivation-button" onClick={() => navigate('/nutrition/NutritionForm')}><i className="fa fa-apple-alt icon"></i></button>
        </div>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="LRButton RButton">Logout</button>
        </div>
      </div>

      <div className="nutrition-filter">
        <Button variant="outlined" onClick={() => handleFilter('all')} style={{ margin: '0 10px' }}>Sve</Button>
        <Button variant="outlined" onClick={() => handleFilter('dorucak')} style={{ margin: '0 10px' }}>Dorucak</Button>
        <Button variant="outlined" onClick={() => handleFilter('rucak')} style={{ margin: '0 10px' }}>Rucak</Button>
        <Button variant="outlined" onClick={() => handleFilter('vecera')} style={{ margin: '0 10px' }}>Vecera</Button>
      </div>

      <div className="nutrition-container">
        <h2 className='preporucena-ishrana'>Preporučena Ishrana</h2>
        <div className="nutrition-grid">
          {filteredNutritions.length > 0 ? (
            filteredNutritions.map(nutrition => (
              <div key={nutrition.id} className="nutrition-item">
                <p className="meal-type">{nutrition.mealType}</p>
                <img src={`http://localhost:5063/${nutrition.imageUrl}`} alt={nutrition.name} className="nutrition-image" />
                <p className="nutrition-description">{nutrition.description}</p>
              </div>
            ))
          ) : (
            <p>No meals available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NutritionForm;
