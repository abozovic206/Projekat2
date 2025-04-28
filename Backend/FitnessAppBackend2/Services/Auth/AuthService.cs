using System.Security.Claims;
using AutoMapper;
using FitnessAppBackend2_.Data;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using FitnessAppBackend2_.Services;




namespace FitnessAppBackend2_.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly TokenService _tokenService;


        public AuthService(UserManager<User> userManager, AppDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, RoleManager<IdentityRole> roleManager,TokenService tokenService)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _roleManager = roleManager;
            _tokenService=tokenService;

        }


        //METODA ZA DODAVANJE ROLA KORISNICIMA
        public async Task SeedRolesAsync()
        {
            var roles = new[] { "Admin", "Member" };

            foreach (var role in roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            var adminUser = await _userManager.FindByNameAsync("admin");
            if (adminUser != null)
            {
                await _userManager.AddToRoleAsync(adminUser, "Admin");
            }

            var memberUser = await _userManager.FindByNameAsync("member");
            if (memberUser != null)
            {
                await _userManager.AddToRoleAsync(memberUser, "Member");
            }
        }



        //METODA ZA REGISTRACIJU KORISNIKA

        public async Task<User> RegisterAsync(RegisterDTO registerDTO)
        {

            //Mapiranje iz registerDTO u user
            var user = new User
            {
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                UserName = registerDTO.UserName,
                //sve osim password jer se valjda on nesto hashira ko ce  mu znati
                Email = registerDTO.Email



            };




            //Normalizacija korisnickog imena
            user.NormalizedUserName = user.UserName.ToUpper();

            //Provjera da li korisnicko ime vec postoji u bazi
            var existingUser = await _userManager.FindByNameAsync(user.UserName);
            if (existingUser != null)
            {
                throw new Exception("Username is already taken.");
            }

            //Hasiranje lozinke i kreiranje korisnika
            //succeeded boolean pokazuje da li je operacija bila uspjesna
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (!result.Succeeded)
            {
                throw new Exception("User creation failed.");
            }

            return user;

        }

        //Metoda za logovanje korisnika
        public async Task<AuthResult> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.UserName); //Cuva podatke o korisniku na osnovu userName
            //npr andreja206

            //Debug ispis
            Console.WriteLine($"User found:{user?.UserName}");

            if (user == null)
            {
                Console.WriteLine("User not found!");
                throw new UnauthorizedAccessException("Invalide username or password.");
            }

            //Provjera
            Console.WriteLine($"User Name:{user.UserName}");



            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!isPasswordCorrect)
            {
                Console.WriteLine("Incorrect password");
                throw new UnauthorizedAccessException("Invalide username or password");
            }



            //TESTIRAM JEL HVATA SLIKU IZ BAZE KAKO TREBA I HVATA STO JE NAJCRNJE

            Console.WriteLine($"PROFILEPICTURE:{user.ProfilePicture}");


            //ova varijabla cuva rolu ako je dodjeljena korisniku 
            var roles = await _userManager.GetRolesAsync(user);
            var Token = _tokenService.CreateToken(user, roles);


            return new AuthResult
            {
                Token = Token,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfilePicture=user.ProfilePicture
                
            };


        }


         public async Task<User> GetCurrentUser() //Vraca korisnika
        {
            
            var token = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");//cuva string token

            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Token is missing");//provjerava da li je string null
            }

            var userId = _tokenService.GetUserIdFromToken(token); //userId cita id user-a iz tokena

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedAccessException("Invalid token"); //provjerava da li je id null 
            }

            var user = await _userManager.FindByIdAsync(userId); //trazi objekat user na osnovu id user-a

            if (user == null)
            {
                throw new KeyNotFoundException("User not found"); //provjerava da li je takav korisnik nadjen
            }

            
            return user;
        }




    }


}
