import react from "react";
import React, {useState} from 'react';

const Weight=({onClose, onSave})=>
    {
        const [weight, setWeight]=useState('');

        const handleInputChange=(e)=>{
            setWeight(e.target.value);//Ova funkcija azurira stanje state svaki put kad korisnik unese novi podatak
        };

        const handleSubmit=(e)=>{
            e.preventDefault();//Sprjecava reaload stranice 
            if(weight){
                onSave(weight);//Poziva funkciju onSave prosljednjenu kao prop
            }
        };

        return(
            <div className="model-overlay">
                <div className="modal-container">
                    <button className="close-button" onClick={onClose}>
                        X
                    </button>
                    <form onSubmit={handleSubmit} className="weight-form">
                        <h3>Unesite vasu tezinu</h3>
                        <input
                        type="number"
                        value={weight}
                        onChange={handleInputChange}
                        placeholder="Tezina u kg" 
                        />
                    <button type="submit" className="submit-button">Spremi</button>
                    </form>

                </div>

            </div>

        );
    };

    export default Weight;