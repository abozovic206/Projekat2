//authSlice.js
/*REDUX sluzi da zapamti TOKEN u nekoj centralnoj memoriji koju svi
dijelovi aplikacije mogu da koriste (npr. da znamo da li je korisnik ulogovan) */

//createSlice pravi jedan dio REDUX stanja tjst uvodi redux toolkit biblioteke

//OVAJ FAJL JE NACIN NA KOJI SE CUVAJU PODACI
import { createSlice } from '@reduxjs/toolkit';
import { Weight } from 'lucide-react';


const authSlice=createSlice({
    name:'auth', //ime tog dijela state-a
    initialState:{
        token:null, //token je prazan na pocetku
        userName:null,//Cuva i userName korisnika
        firstName:null,
        lastName:null,

        //PARAMETRI I INFORMACIJE
        profilePicture:null,
        weight:null,
        height:null,
        age:null,
        gender:null

        //ZNACI INICIJALNA STANJA SU NA NULL NA POCETKU
    },
    reducers:{
        loginSuccess:(state, action)=>{
            state.token=action.payload.token; //cuvamo token 
            //state trenutna vrijednost
            //payload ono sto se salje u akciji
            state.userName=action.payload.userName; 
            state.firstName=action.payload.firstName;
            state.lastName=action.payload.lastName;

            state.profilePicture=action.payload.profilePicture;
            state.weight=action.payload.weight;
            state.height=action.payload.height;
            state.age=action.payload.age;
            state.gender=action.payload.gender

            //Dodjeljuju im se neke vrijednosti

            //spremanje tokena u localStorage
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userName', action.payload.userName);

            localStorage.setItem('profilePicture', action.payload.profilePicture);
            localStorage.setItem('weight',action.payload.weight);
            localStorage.setItem('height',action.payload.height);
            localStorage.setItem('age',action.payload.age);
            localStorage.setItem('gender',action.payload.gender);
        },

        //Za odjavljivanje
        logout:(state)=>
            {
                state.token=null;
                state.userName=null;
                state.firstName=null;
                state.lastName=null;
                //Prilikom logout-a se brisu te vrijednosti koje su dodjeljenje a prilikom logina se postavljaju logicno
            }
    },
});

export const {loginSuccess, logout}=authSlice.actions;
export default authSlice.reducer;
export const updateProfilePicture=(profilePicture)=>({
    type:'UPDATE-PROFILE-PICTURE',
    payload:profilePicture,
});