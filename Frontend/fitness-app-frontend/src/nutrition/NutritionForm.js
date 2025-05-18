import React, { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import AddNutritionForm from './AddNutritionForm';
import EditNutrition from './EditNutrition';
import '../styles/NutritionForm.css';



const NutritionForm = ({ nutritionId, onClose, onSaved }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [nutritions, setNutritions] = useState([]);
  const [filteredNutritions, setFilteredNutritions] = useState([]);
  const [mealType, setMealType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [nutritionToEdit, setNutritionToEdit] = useState(null);

  useEffect(() => {
    fetchNutritions();
  }, []);

  const fetchNutritions = () => {
    axios.get('http://localhost:5063/api/nutrition')
      .then(response => {
        setNutritions(response.data);
        setFilteredNutritions(response.data);
      })
      .catch(error => {
        console.error("Greška prilikom dohvacanja podataka:", error);
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

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
      .then(() => {
        const updatedNutritions = nutritions.filter(nutrition => nutrition.id !== id);
        setNutritions(updatedNutritions);
        setFilteredNutritions(updatedNutritions);
      })
      .catch(error => {
        console.error("Greška prilikom brisanja:", error);
      });
  };

  const handleOpenModal = (nutrition) => {
    setNutritionToEdit(nutrition.id);
    setShowModal(true);
  };

  const handleAddNewMeal = () => {
    setNutritionToEdit(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setNutritionToEdit(null);
    setShowModal(false);
  };

  const handleNutritionSaved = () => {
    axios.get('http://localhost:5063/api/nutrition')
      .then(response => {
        setNutritions(response.data);
        if (mealType === 'all' || mealType === '') {
          setFilteredNutritions(response.data);
        } else {
          setFilteredNutritions(response.data.filter(nutrition => 
            nutrition.mealType.toLowerCase() === mealType.toLowerCase()
          ));
        }
        handleCloseModal();
      })
      .catch(error => {
        console.error("Greška prilikom osvežavanja nakon dodavanja:", error);
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
            onClick={handleAddNewMeal}
          >
            Dodaj Novi Obrok
          </Button>
        </div>

        <div className="nutrition-grid">
          {filteredNutritions.length > 0 ? (
            filteredNutritions.map(nutrition => (
              <div key={nutrition.id} className="nutrition-item">
                <p className="meal-type">{nutrition.mealType}</p>
                <img src={`http://localhost:5063/${nutrition.imageUrl}`} alt="haha" className="nutrition-image" 
                  style={{ width: "100%", height: "160px", objectFit: "cover" }}
                />
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
                    onClick={() => handleOpenModal(nutrition)}
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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
         
            <button className="modal-close" onClick={handleCloseModal}>×</button>
            {nutritionToEdit ? (
            <EditNutrition 
              onClose={handleCloseModal} 
              onSaved={handleNutritionSaved}
              nutritionId={nutritionToEdit}
            />
          ) : (
            <AddNutritionForm 
              onClose={handleCloseModal} 
              onSaved={handleNutritionSaved}
            />
          )}


          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionForm;
