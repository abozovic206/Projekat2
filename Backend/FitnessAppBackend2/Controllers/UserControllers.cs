using Microsoft.AspNetCore.Mvc;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Services;
using FitnessAppBackend2_.Models;
using System.Threading.Tasks;

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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Pozivanje UserService za registraciju korisnika
                var user = await _userService.RegisterAsync(registerDto);

                // Vraćanje uspeha sa novoregistrovanim korisnikom
                return Ok(user);
            }
            catch (System.Exception ex)
            {
                // Ako se desi greška, vraćamo 400 sa porukom greške
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
 