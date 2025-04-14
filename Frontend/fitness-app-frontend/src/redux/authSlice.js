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
            //spremanje tokena u localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userName', action.payload.userName);
        },

        //Za odjavljivanje
        logout:(state)=>
            {
                state.token=null;
                state.userName=null;
            }
    },
});

export const {loginSuccess, logout}=authSlice.actions;
export default authSlice.reducer;