import React from 'react';
import { useSelector, useState } from 'react-redux';//PREBITNO

const Home=()=>{
    const userName=useSelector((state)=>state.auth.userName);
    return(
        <div>
            <h1>Dobrodosao!</h1>
            <p>Uspjesno si ulogovan!,{userName}</p>
        </div>
    );
};


export default Home;