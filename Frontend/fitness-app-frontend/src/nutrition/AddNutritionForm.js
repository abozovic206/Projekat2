import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NutritionForm.css';

const AddNutritionForm = ({ onClose, onAdd, nutrition }) => {
  const [mealType, setMealType] = useState(nutrition ? nutrition.mealType : '');
  const [description, setDescription] = useState(nutrition ? nutrition.description : '');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (nutrition) {
      setMealType(nutrition.mealType);
      setDescription(nutrition.description);
    }
  }, [nutrition]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('mealType', mealType);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (nutrition) {
        await axios.put(`http://localhost:5063/api/nutrition/${nutrition.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Obrok uspešno izmenjen!');
      } else {
        const response = await axios.post('http://localhost:5063/api/nutrition', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Obrok uspešno dodat!');
        if (onAdd) {
          onAdd(response.data); // pošalji novi obrok roditeljskoj komponenti
        }
      }
      onClose();
    } catch (error) {
      console.error('Greška pri dodavanju ili izmeni:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-form">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{nutrition ? 'Izmeni Obrok' : 'Dodaj Novi Obrok'}</h2>
        <form onSubmit={handleSubmit} className="nutrition-form">
          <label>Tip obroka:</label>
          <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
            <option value="">Izaberi</option>
            <option value="dorucak">Dorucak</option>
            <option value="rucak">Rucak</option>
            <option value="vecera">Vecera</option>
          </select>

          <label>Opis:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

          <label>Slika:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button type="submit" className="submit-button">{nutrition ? 'Izmjeni Obrok' : 'Dodaj Obrok'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddNutritionForm;
