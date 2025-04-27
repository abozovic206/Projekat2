using FitnessAppBackend2_.DTO;//koristice LoginDTO i RegisterDTO
using FitnessAppBackend2_.Models;
using System;

namespace FitnessAppBackend2_.Services.Auth
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(RegisterDTO registerDTO);
        Task SeedRolesAsync();//Metoda koja omogucava dodavanje rola
        Task<AuthResult> LoginAsync(LoginDTO loginDTO);
        Task<User> GetCurrentUser();


    }
}
/*Bilo koja klasa koja implementira ovaj interfejs mora imati ove metode*/

