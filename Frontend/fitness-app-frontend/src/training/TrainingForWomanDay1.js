import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import '../styles/TrainingInterface.css';
import AddTraining from './AddTraining';

const TrainingDay1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [trainings, setTrainings] = useState([]);
  const [showForm, setShowForm] = useState(false); // Za prikaz forme

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
        setTrainings(response.data);
      })
      .catch(error => {
        console.error("Greška prilikom dohvatanja podataka:", error);
      });
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
        </div>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="LRButton RButton">Logout</button>
        </div>
      </div>

      <div className="add-training-button-container">
        <button className="add-training-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Zatvori formu' : 'Dodaj trening'}
        </button>
      </div>

      {showForm && <AddTraining onTrainingAdded={fetchTrainings} />}

      <div className="training-section">
        {trainings.map(training => (
          <div key={training.id} className="training-card">
            <h2 className="training-title">{training.name}</h2>
            <p className="training-description">{training.description}</p>
            <video controls className="training-video">
              <source src={`http://localhost:5063${training.videoUrl}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingDay1;
