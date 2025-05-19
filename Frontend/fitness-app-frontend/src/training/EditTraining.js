import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddTrainingInterface.css';

const EditTraining = ({ training, onClose, onTrainingUpdated }) => {
  const [name, setName] = useState(training.name || '');
  const [description, setDescription] = useState(training.description || '');
  const [dayOfWeek, setDayOfWeek] = useState(training.dayOfWeek || 1);
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setName(training.name || '');
    setDescription(training.description || '');
    setDayOfWeek(training.dayOfWeek || 1);
  }, [training]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('DayOfWeek', dayOfWeek);
    if (videoFile) {
      formData.append('Video', videoFile);
    }

    try {
      const response = await axios.put(`http://localhost:5063/api/Training/${training.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('✅ Trening je uspješno ažuriran.');
        onTrainingUpdated();
        setTimeout(() => {
          setMessage('');
          if (onClose) onClose();
        }, 1500);
      } else {
        setMessage('❌ Neuspješno ažuriranje treninga.');
      }
    } catch (error) {
      console.error('Greška:', error);
      setMessage('❌ Došlo je do greške prilikom slanja.');
    }
  };

  return (
    <div className="modal-overlay-T">
      <div className="modal-content-T">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Izmeni trening</h2>
        <form onSubmit={handleSubmit} className="form-layout">
          <input type="text" placeholder="Naziv" value={name} onChange={e => setName(e.target.value)} required />
          <textarea placeholder="Opis" value={description} onChange={e => setDescription(e.target.value)} required />
          <input type="number" placeholder="Dan u nedelji (1-7)" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} min="1" max="7" required />
          <button type="submit" className="submit-button-T">Sačuvaj izmjene</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default EditTraining;
