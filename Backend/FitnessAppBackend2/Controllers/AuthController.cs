using System;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace FitnessAppBackend2_.Controllers{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController:ControllerBase
{
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService=authService;
        }


        //Pozivanje metoda
        [HttpPost("register")]
        //Trazi podatke u tijelu Http zahtjeva i mapira ih u registerDTO koji se kasnije mapiraju u User 
        public async Task<IActionResult>Register([FromBody]RegisterDTO registerDTO)
        {
            //Ako podaci koje je korisnik unio nisu validni onda API vraca BadRequest
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                //Role cu kasnije dodati
                //Pozivanje AuthService za registraciju korisnika
                var user=await _authService.RegisterAsync(registerDTO);


                //Vraca okej kad je korisnik uspjesno registrovan
                return Ok(user);
            }

            catch(System.Exception ex)
            {
                //Ako se desi greska vraca se 400 sa porukom greske
                return BadRequest(new{message=ex.Message});
            }
        }

         //Dodavanje role
        [HttpPost("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            await _authService.SeedRolesAsync();
            return Ok(new { message = "Roles seeded successfully!" });
        }


        //LOGIN
            [HttpPost("login")]//ovo je samo naziv rute
       public async Task<IActionResult>Login([FromBody]LoginDTO loginDTO)
       {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        { //OVDE SAM MIJENJALA
            var token=await _authService.LoginAsync(loginDTO);//RESULT

             return Ok(new{
                token=token.Token,
                userName=token.UserName, //Kljucevi koje vracam iz kontrolera
                //znaci vraca se token:... i userName:... na backendu
                firstName=token.FirstName,
                lastName=token.LastName,
                profilePicture=token.ProfilePicture
                
             });
            
        }

        catch(UnauthorizedAccessException ex)
        {
            return Unauthorized(new {message=ex.Message});

        }

        catch(Exception ex)
        {
             return BadRequest(new { message = ex.Message });
        }


       }

       [HttpGet("getCurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var userDto = await _authService.GetCurrentUser();
                return Ok(userDto);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


       //Dodavanje podataka o tjelesnim parametrima



}


}

