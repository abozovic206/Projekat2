import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AddTrainingInterface.css';

const EditNutrition = ({ nutrition, onClose, onNutritionUpdated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (nutrition) {
      setName(nutrition.name);
      setDescription(nutrition.description);
    }
  }, [nutrition]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Id', nutrition.id); // ako ti backend traži id
    formData.append('Name', name);
    formData.append('Description', description);
    if (imageFile) {
      formData.append('Image', imageFile);
    }

    try {
      const response = await axios.put(`http://localhost:5063/api/Nutrition/${nutrition.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('✅ Obrok je uspješno izmijenjen.');
        onNutritionUpdated(); // obavještava parent da osvježi listu
        setTimeout(() => {
          setMessage('');
          onClose();
        }, 1500);
      } else {
        setMessage('❌ Neuspješna izmjena obroka.');
      }
    } catch (error) {
      console.error('Greška:', error);
      setMessage('❌ Došlo je do greške prilikom izmjene.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Izmijeni obrok</h2>
        <form onSubmit={handleSubmit} className="form-layout">
          <input type="text" placeholder="Naziv" value={name} onChange={e => setName(e.target.value)} required />
          <textarea placeholder="Opis" value={description} onChange={e => setDescription(e.target.value)} required />
          <input type="file" onChange={e => setImageFile(e.target.files[0])} accept="image/*" />
          <button type="submit" className="submit-button">Sačuvaj izmjene</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default EditNutrition;
