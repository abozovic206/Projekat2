import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NutritionForm.css';

const AddNutritionForm = ({ onClose,onSaved, onNutritionAdded }) => {
  const [mealType, setMealType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage('❌ Molimo dodajte sliku.');
      return;
    }

    const formData = new FormData();
   formData.append('mealType', mealType);
formData.append('description', description);
formData.append('image', image);

try {
  const response = await axios.post("http://localhost:5063/api/Nutrition", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  console.log("✅ Response:", response); // Dodaj ovo

  if (response.status === 200) {
    setMessage("✅ Uspešno dodat obrok.");
    
     setTimeout(() => {
    setMessage('');
    onSaved();
    if (onClose) onClose();
  }, 1500); // forma se zatvara nakon 1.5 sekundi

    
  } else {
    setMessage("❌ Desila se greška (nije 200).");
  }
} catch (error) {
  console.error("Greška:", error);
  if (error.response) {
    console.log("Response status:", error.response.status);
    console.log("Response data:", error.response.data);
  }
  setMessage("❌ Došlo je do greške prilikom slanja.");
}

  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Dodaj novi obrok</h2>
        <form onSubmit={handleSubmit} className="form-layout">
          <select value={mealType} onChange={(e) => setMealType(e.target.value)} required>
            <option value="">Izaberi tip obroka</option>
            <option value="dorucak">Doručak</option>
            <option value="rucak">Ručak</option>
            <option value="vecera">Večera</option>
          </select>
          <textarea placeholder="Opis" value={description} onChange={e => setDescription(e.target.value)} required />
          <input type="file" onChange={e => setImage(e.target.files[0])} accept="image/*" required />
          <button type="submit" className="submit-button">Dodaj obrok</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default AddNutritionForm;
