import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import AddNutritionForm from './AddNutritionForm'; // Ovaj import ostaje
import '../styles/NutritionForm.css';

const NutritionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const [nutritions, setNutritions] = useState([]);
  const [filteredNutritions, setFilteredNutritions] = useState([]);
  const [mealType, setMealType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nutritionToEdit, setNutritionToEdit] = useState(null); // Za izmenu obroka

  const handleOpenModal = (nutrition) => {
    setNutritionToEdit(nutrition); // Popunjava podatke za izmenu
    setShowModal(true); // Otvara modal
  };

  const handleCloseModal = () => {
    setNutritionToEdit(null); // Resetuje podatke
    setShowModal(false); // Zatvara modal
  };

  const handleAddNewMeal = () => {
    setNutritionToEdit(null); // Za dodavanje novog obroka, postavljamo stanje na null
    setShowModal(true); // Otvori modal za dodavanje novog obroka
  };

  useEffect(() => {
    axios.get('http://localhost:5063/api/nutrition')
      .then(response => {
        setNutritions(response.data);
        setFilteredNutritions(response.data);
      })
      .catch(error => {
        console.error("Greška prilikom dohvacanja podataka:", error);
      });
  }, []);

  const handleFilter = (mealType) => {
    setMealType(mealType);
    if (mealType === 'all') {
      setFilteredNutritions(nutritions);
    } else {
      setFilteredNutritions(nutritions.filter(nutrition => nutrition.mealType.toLowerCase() === mealType.toLowerCase()));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5063/api/nutrition/${id}`)
      .then(response => {
        setNutritions(nutritions.filter(nutrition => nutrition.id !== id));
        setFilteredNutritions(filteredNutritions.filter(nutrition => nutrition.id !== id));
      })
      .catch(error => {
        console.error("Greška prilikom brisanja:", error);
      });
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

        <div style={{ marginBottom: '20px' }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddNewMeal} // Otvorimo formu za dodavanje novog obroka
          >
            Dodaj Novi Obrok
          </Button>
        </div>

        <div className="nutrition-grid">
          {filteredNutritions.length > 0 ? (
            filteredNutritions.map(nutrition => (
              <div key={nutrition.id} className="nutrition-item">
                <p className="meal-type">{nutrition.mealType}</p>
                <img src={`http://localhost:5063/${nutrition.imageUrl}`} alt={nutrition.name} className="nutrition-image" />
                <p className="nutrition-description">{nutrition.description}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <Button 
                    className='button-delete'
                    variant="outlined" 
                    color="error" 
                    onClick={() => handleDelete(nutrition.id)}
                  >
                    Obriši
                  </Button>

                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => handleOpenModal(nutrition)} // Otvorimo modal za izmenu
                  >
                    Izmjeni Obrok
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>No meals available</p>
          )}
        </div>
      </div>

      {/* Modal za dodavanje ili izmenu obroka */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            <AddNutritionForm 
              onClose={handleCloseModal} 
              nutrition={nutritionToEdit} // Prosleđujemo podatke za izmenu ili prazna polja za novi obrok
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionForm;
