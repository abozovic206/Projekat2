import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddTrainingInterface.css';

const AddTraining = ({ onClose, onTrainingAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setMessage('❌ Molimo dodajte video fajl.');
      return;
    }

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Description', description);
    formData.append('DayOfWeek', dayOfWeek);
    formData.append('Video', videoFile);

    try {
      const response = await axios.post('http://localhost:5063/api/Training', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('✅ Trening je uspješno dodat.');
        onTrainingAdded();
        setTimeout(() => {
          setMessage('');
          if (onClose) onClose();
        }, 1500);
      } else {
        setMessage('❌ Neuspješno dodavanje treninga.');
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
        <h2>Dodaj novi trening</h2>
        <form onSubmit={handleSubmit} className="form-layout">
          <input type="text" placeholder="Naziv" value={name} onChange={e => setName(e.target.value)} required />
          <textarea placeholder="Opis" value={description} onChange={e => setDescription(e.target.value)} required />
          <input type="number" placeholder="Dan u nedelji (1-7)" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} min="1" max="7" required />
          <input type="file" onChange={e => setVideoFile(e.target.files[0])} accept="video/*" required />
          <button type="submit" className="submit-button-T">Dodaj trening</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default AddTraining;
