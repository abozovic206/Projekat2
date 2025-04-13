using Microsoft.AspNetCore.Mvc;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Services;
using FitnessAppBackend2_.Models;
using System.Threading.Tasks;
using System.Security.Claims;

namespace FitnessAppBackend2_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // POST: api/user/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDto)
        {
            //Ako podaci koje je korisnik unio nisu validni onda API vraca BadRequest--->400
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                //Seed-ovanje role
                var newUser = new User
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                };



                // Pozivanje UserService za registraciju korisnika
                var user = await _userService.RegisterAsync(registerDto);

                // Vraćanje uspjeha sa novoregistrovanim korisnikom
                return Ok(user);
            }
            catch (System.Exception ex)
            {
                // Ako se desi greška, vraćamo 400 sa porukom greške
                return BadRequest(new { message = ex.Message });
            }
        }


        //Dodavanje role
        [HttpPost("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            await _userService.SeedRolesAsync();
            return Ok(new { message = "Roles seeded successfully!" });
        }


       [HttpPost("login")]
       public async Task<IActionResult>Login([FromBody]LoginDTO loginDTO)
       {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        { //OVDE SAM MIJENJALA
            var token=await _userService.LoginAsync(loginDTO);//RESULT

           
            Console.WriteLine($"Token: {token}");
            Console.WriteLine($"Returned UserName: {User.Identity.Name}");

           
             return Ok(new{
                token=token.Token,
                userName=token.UserName //Kljucevi koje vracam iz kontrolera
                //znaci vraca se token:... i userName:... na backendu
                
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

    }
}
