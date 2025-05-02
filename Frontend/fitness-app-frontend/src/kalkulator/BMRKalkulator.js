//BMR-BAZALNA METABOLICKA BRZINA

import React, { useState } from "react";
import { useSelector } from "react-redux";

const BMRKalkulator=()=>{
    const height=useSelector((state)=>state.auth.height);
    const weight=useSelector((state)=>state.auth.weight);
    const age=useSelector((state)=>state.auth.age);
    const gender=useSelector((state)=>state.auth.gender);

    const calculateBMR=()=>{
        let calculatedBMR;

        if(gender==="Ž"){
            calculatedBMR=(655+(9.6*weight)+(1.8*height)-(4.7*age));
        } else if(gender==="M"){
                calculatedBMR=66+(13.7*weight)+(5*height)-(6.8*age);
            }else{
                return "Invalid gender"
            }

            return parseFloat(calculatedBMR.toFixed(2));

            
    };

    return(
        <div>
             <h2>Tvoj BMR</h2>
                <p>Tvoj BMR je:<strong>{calculateBMR()} kcal/dan</strong></p>
                
        </div>
    )
}


export default BMRKalkulator;