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
        gender:null,
        role: null

        //ZNACI INICIJALNA STANJA SU NA NULL NA POCETKU
    },
    reducers:{
        loginSuccess:(state, action)=>{
            state.token=action.payload.token; //cuvamo token 
            //state trenutna vrijednost
            //payload ono sto se salje u akciji
            //STATE predstavlja trenutno stanje REDUX-a
            //(STATE=MEMORIJA APLIKACIJE)
            state.userName=action.payload.userName; //action.payload sadrzi podatke koji dolaze iz dispatch loginSuccess JAKO BITNO*****
            state.firstName=action.payload.firstName;
            state.lastName=action.payload.lastName;

           state.profilePicture=action.payload.profilePicture; //NAZIV MORA BITI ISTI KAO ONAJ STO BACKEND SALJE U JSON FORMATU(CASE SENSITIVE)
            state.weight=action.payload.weight;
            state.height=action.payload.height;
            state.age=action.payload.age;
            state.gender=action.payload.gender;
            state.role = action.payload.role;

            //Dodjeljuju im se neke vrijednosti

            //spremanje tokena u localStorage
            //LOCALSTORAGE=DA PODACI OSTANU SACUVANI I KAD SE STRANICA OSVJEZI  
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('userName', action.payload.userName);

           localStorage.setItem('profilePicture', action.payload.profilePicture);
            localStorage.setItem('weight',action.payload.weight);
            localStorage.setItem('height',action.payload.height);
            localStorage.setItem('age',action.payload.age);
            localStorage.setItem('gender',action.payload.gender);
             localStorage.setItem('role',action.payload.role);
        },

        //Za odjavljivanje
        logout:(state)=>
            {
                state.token=null;
                state.userName=null;
                state.firstName=null;
                state.lastName=null;
                state.role=null;
                //Prilikom logout-a se brisu te vrijednosti koje su dodjeljenje a prilikom logina se postavljaju logicno
            },

            //Akcija za azuriranje tezine
            updateWeight:(state, action)=>{
                state.weight=action.payload;
                localStorage.setItem('weight', action.payload);//cuvamo tezinu
            },

            //Akcija za azuriranje slike
            updateProfilePicture:(state,action)=>{
                state.profilePicture=action.payload;
                localStorage.setItem('profilePicture', action.payload);
            },

            updateHeight:(state, action)=>{
                state.height=action.payload;
                localStorage.setItem('height', action.payload);
            },

            updateAge:(state, action)=>{
                state.age=action.payload;
                localStorage.setItem('age',action.payload);
            },

            updateGender:(state, action)=>{
                state.gender=action.payload;
                localStorage.setItem('gender', action.payload);
            }

            
    },
});

export const {loginSuccess, logout, updateWeight, updateProfilePicture, updateHeight,updateAge,updateGender}=authSlice.actions;
export default authSlice.reducer;
/*export const updateProfilePicture=(profilePicture)=>({
    type:'UPDATE-PROFILE-PICTURE',
    payload:profilePicture,
});*/