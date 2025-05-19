import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NutritionForm.css';

const NutritionEdit = ({ nutritionId, onClose, onSaved }) => {
  const [mealType, setMealType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [id, setId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchNutrition = async () => {
      try {
        const response = await axios.get(`http://localhost:5063/api/Nutrition/${nutritionId}`);
        const data = response.data;
        console.log(response);
        setMealType(data.mealType);
        setDescription(data.description);
        setExistingImageUrl(data.imageUrl); 
        setId(data.id);// Pod pretpostavkom da backend vraća imageUrl
        console.log(id);
      } catch (error) {
        console.error("Greška pri dohvatanju podataka:", error);
        setMessage("❌ Greška pri učitavanju obroka.");
      }
    };

    if (nutritionId) {
      fetchNutrition();
    }
  }, [nutritionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('mealType', mealType);
    formData.append('description', description);
    formData.append('id', id);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`http://localhost:5063/api/Nutrition/${nutritionId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage("✅ Uspešno izmenjen obrok.");
        setTimeout(() => {
          setMessage('');
          onSaved();
          if (onClose) onClose();
        }, 1500);
      } else {
        setMessage("❌ Desila se greška (nije 200).");
      }
    } catch (error) {
      console.error("Greška:", error);
      setMessage("❌ Došlo je do greške prilikom izmene.");
    }
  };

  return (
    <div className="modal-overlay-U">
      <div className="modal-contentt-U">
        <button className="close-button-U" onClick={onClose}>×</button>
        <h2>Izmijeni obrok</h2>
        <form onSubmit={handleSubmit} className="form-layout-U">
          <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
            <option value="dorucak">Doručak</option>
            <option value="rucak">Ručak</option>
            <option value="vecera">Večera</option>
          </select>
          <textarea
            placeholder="Opis"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          
          <button type="submit" className="submit-button-U">Sačuvaj izmjene</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default NutritionEdit;
