using System;
using FitnessAppBackend2_.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FitnessAppBackend2_.Services.Information;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using FitnessAppBackend2_.Models;

namespace FitnessAppBackend2_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] // Samo prijavljeni korisnici mogu koristiti ovu rutu
    public class UserProfileController : ControllerBase
    {
        private readonly IUInformationService _userInfoService;
        private readonly UserManager<User> _userManager;

        // Konstruktor OBAVEZAN
        public UserProfileController(IUInformationService userInfoService, UserManager<User> userManager)
        {
            _userInfoService = userInfoService;
            _userManager = userManager;
        }

        // Endpoint za ažuriranje informacija o korisniku
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUserInformation([FromForm] UserParameterDTO userParameterDTO)
        {
            if (userParameterDTO == null)
            {
                return BadRequest("User data is missing.");
            }

            try
            {
                // Pozivamo servis da ažuriramo informacije o korisniku
                var updatedUser = await _userInfoService.PutInformationAsync(userParameterDTO);//vraca bool
                
                //zato moze ovako
                if(updatedUser)
                {
                    Console.WriteLine("User information update successfully!");
                     return Ok(new { message = "User information updated successfully!" });
                }
                
                // Vraćamo uspešan odgovor sa ažuriranim podacima
               else
               {
                Console.WriteLine("Failed to update user information!");
                 return BadRequest(new { message = "Failed to update user information." });
               }
            }
            catch (Exception ex)
            {
                // Ako je došlo do greške, vraćamo 500 sa detaljima greške
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

       
    }
}
