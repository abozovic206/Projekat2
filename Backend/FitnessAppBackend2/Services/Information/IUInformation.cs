using System;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.DTO;

namespace FitnessAppBackend2_.Services.Information
{
    
    public interface IUInformationService
{
    Task<User>PostInformationAsync(UserParameterDTO userParameterDTO);
    /*Ono sto je deklarisano u interfejsu mora biti implementirano u klasi koja ga nasljedjuje*/
}

    

}

