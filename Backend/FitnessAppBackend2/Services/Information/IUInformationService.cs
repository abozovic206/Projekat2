using System;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.DTO;
using System.Security.Claims;

namespace FitnessAppBackend2_.Services.Information
{
    
    public interface IUInformationService
{
     Task<bool>PutInformationAsync(UserParameterDTO userParameterDTO);
    

    /*Ono sto je deklarisano u interfejsu mora biti implementirano u klasi koja ga nasljedjuje*/

}

    

}

