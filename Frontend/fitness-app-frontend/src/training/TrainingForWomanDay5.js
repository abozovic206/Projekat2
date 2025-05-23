import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import '../styles/TrainingInterface.css';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';

const TrainingDay5 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const [trainings, setTrainings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    axios.get('http://localhost:5063/api/Training')
      .then(response => {
        const day5Trainings = response.data.filter(t => t.dayOfWeek === 5);
        setTrainings(day5Trainings);
      })
      .catch(error => {
        console.error("Greška prilikom dohvatanja podataka:", error);
      });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5063/api/Training/${id}`);
      fetchTrainings();
    } catch (error) {
      console.error("Greška prilikom brisanja:", error);
    }
  };

  return (
    <div className="appTraining">
      <div className="navbar-home">
        <div className="logo-container">
          <div className="logo-circle">A</div>
          <span className="logo-text">FitnessAppAndreja</span>
        </div>
        <div className="option-container">
          <button className="profile-button" onClick={() => navigate('/home')}><i className="fa fa-home"></i></button>
          <button className="training-button" onClick={() => navigate('/training/TrainingHomePage')}><i className="fas fa-dumbbell"></i></button>
          <button className="motivation-button" onClick={() => navigate('/nutrition/NutritionForm')}><i className="fa fa-apple-alt icon"></i></button>
           {role === 'Admin' && (
        <div className="add-training-button-container">
          <button className="add-training-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Zatvori formu' : 'ADD'}
          </button>
        </div>
      )}
        </div>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="LRButton RButton">Logout</button>
        </div>
      </div>

     

      {showForm && (
        <AddTraining
          onTrainingAdded={fetchTrainings}
          onClose={() => setShowForm(false)}
        />
      )}

      {editingTraining && (
        <EditTraining
          training={editingTraining}
          onClose={() => setEditingTraining(null)}
          onTrainingUpdated={fetchTrainings}
        />
      )}

      <div className="training-section">
        {trainings.map(training => (
          <div key={training.id} className="training-card">
            <h2 className="training-title">{training.name}</h2>
            <p className="training-description">{training.description}</p>
            <video controls className="training-video">
              <source src={`http://localhost:5063${training.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {role === "Admin" && (
              <div className="admin-buttons">
                <button className="delete-button" onClick={() => handleDelete(training.id)}>
                  Obriši
                </button>
                <button className="edit-button" onClick={() => setEditingTraining(training)}>
                  Izmjena 
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingDay5;
