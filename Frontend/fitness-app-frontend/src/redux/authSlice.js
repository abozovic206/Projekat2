//authSlice.js
/*REDUX sluzi da zapamti TOKEN u nekoj centralnoj memoriji koju svi
dijelovi aplikacije mogu da koriste (npr. da znamo da li je korisnik ulogovan) */

//createSlice pravi jedan dio REDUX stanja tjst uvodi redux toolkit biblioteke

//OVAJ FAJL JE NACIN NA KOJI SE CUVAJU PODACI
import { createSlice } from '@reduxjs/toolkit';


const authSlice=createSlice({
    name:'auth', //ime tog dijela state-a
    initialState:{
        token:null, //token je prazan na pocetku
        userName:null,//Cuva i userName korisnika
    },
    reducers:{
        loginSuccess:(state, action)=>{
            state.token=action.payload.token; //cuvamo token 
            //state trenutna vrijednost
            //payload ono sto se salje u akciji
            state.userName=action.payload.userName; 
        },
    },
});

export const {loginSuccess}=authSlice.actions;
export default authSlice.reducer;