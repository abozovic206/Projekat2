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




namespace FitnessAppBackend2_.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly RoleManager<IdentityRole> _roleManager;


        public AuthService(UserManager<User> userManager, AppDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
            _roleManager = roleManager;

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


            //ova varijabla cuva rolu ako je dodjeljena korisniku 
            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles);

            return new AuthResult
            {
                Token = token,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName
            };


        }

        private string GenerateJwtToken(User user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name,user.FirstName),
                new Claim(ClaimTypes.Name,user.LastName)
                //Claim cuva korisnicko ime i user id al dacu mu da cuva jos neke podatke
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_super_secret_very_secure_key12345"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "FitnessAppBackend",
                audience: "FitnessAppUser",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);


        }




    }


}
