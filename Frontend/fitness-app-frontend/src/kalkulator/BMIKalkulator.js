import React from 'react';
import { useSelector } from 'react-redux';


const BMIKalkulator=()=>{
    const weight=useSelector((state)=>state.auth.weight);
    const height=useSelector((state)=>state.auth.height);

    if(!weight || !height)
        {
            return <p>Unesite podatke u svom profilu kako bi vidjeli BMI!</p>
        }

        const heightInMeters=height/100;//pretvara height u metre
        const bmi=(weight/(heightInMeters*heightInMeters)).toFixed(2);
        
        let message='';
        if(bmi<18.5) message="Preniska tezina";
        else if(bmi<25) message="Normalna tezina";
        else if(bmi<30)message="Prevelika tezina";
        else message='Obese';

        return(
            <div>
                <h2>Tvoj BMI</h2>
                <p>Tezina:{weight}kg</p>
                <p>Tvoj BMI je:<strong>{bmi}</strong></p>
                <p>Status:<strong>{message}</strong></p>
            </div>
        )
}


export default BMIKalkulator;