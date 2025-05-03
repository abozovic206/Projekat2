using System;
using FitnessAppBackend2_.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FitnessAppBackend2_.Services.Information;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using FitnessAppBackend2_.Models;
using System.IdentityModel.Tokens.Jwt;
using FitnessAppBackend2_.Services;

namespace FitnessAppBackend2_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize] // Samo prijavljeni korisnici mogu koristiti ovu rutu
    public class UserProfileController : ControllerBase
    {
        private readonly IUInformationService _userInfoService;
        private readonly UserManager<User> _userManager;

        private readonly TokenService _tokenService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        // Konstruktor OBAVEZAN
        public UserProfileController(IUInformationService userInfoService, UserManager<User> userManager, TokenService tokenService, IHttpContextAccessor httpContextAccessor)
        {
            _userInfoService = userInfoService;
            _userManager = userManager;
            _tokenService=tokenService;
            _httpContextAccessor=httpContextAccessor;
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




        [HttpGet("weightrecords")]
        public async Task<ActionResult<List<WeightRecordDTO>>>GetWeightRecords(){

            var token = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");//cuva string token

            var userId = _tokenService.GetUserIdFromToken(token); //userId cita id user-a iz tokena
            if(string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new{message="User not authenticated."});
            }

            //Poziv servisa da se dobiju svi zapisi
            var weightRecords=await _userInfoService.GetAllWeightRecordsAsync(userId);

            if(weightRecords==null || weightRecords.Count==0)
            {
                return NotFound(new {message="No weights records found for user."});
            }

            return Ok(weightRecords);
        }

       
    }
}
