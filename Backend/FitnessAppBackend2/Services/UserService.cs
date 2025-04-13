using System.Threading.Tasks;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models; // Ovo je tvoj User model
using AutoMapper;
using FitnessAppBackend2_.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;  // Ovo je potrebno za asinhrone EF metode kao što je AnyAsync
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace FitnessAppBackend2_.Services
{
    public interface IUserService
    {
        Task<User> RegisterAsync(RegisterDTO registerDto); //MetodA RegisterAsync prima RegisterDTO i vraca jednog korisnika
        Task SeedRolesAsync();//Metoda koja omogucava dodavanje role
        Task<string> LoginAsync(LoginDTO loginDTO);
    }

    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<User> _userManager;

        public UserService(IMapper mapper, AppDbContext context, RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            _mapper = mapper;
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

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

            var adminUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == "admin");
            if (adminUser == null)
            {
                adminUser = new User
                {
                    UserName = "admin",
                    Email = "admin@example.com",
                };

                await _userManager.CreateAsync(adminUser, "admin123"); // Hasirajte lozinku
                await _userManager.AddToRoleAsync(adminUser, "Admin");
            }

            var memberUser = await _context.Users.FirstOrDefaultAsync(u => u.UserName == "member");
            if (memberUser == null)
            {
                memberUser = new User
                {
                    UserName = "member",
                    Email = "member@example.com",
                };

                await _userManager.CreateAsync(memberUser, "member123"); // Hasirajte lozinku
                await _userManager.AddToRoleAsync(memberUser, "Member");
            }
        }

        public async Task<User> RegisterAsync(RegisterDTO registerDto)
        {
            // Mapiranje registerDTO u User
            var user = _mapper.Map<User>(registerDto);

            // Normalizacija korisničkog imena
            user.NormalizedUserName = user.UserName.ToUpper();

            // Provera da li korisničko ime već postoji u bazi
            var existingUser = await _userManager.FindByNameAsync(user.UserName);
            if (existingUser != null)
            {
                throw new Exception("Username is already taken.");
            }

            // Hasiranje lozinke i kreiranje korisnika
            var result = await _userManager.CreateAsync(user, registerDto.PasswordHash);
            if (!result.Succeeded)
            {
                throw new Exception("User creation failed.");
            }

            return user;
        }

        public async Task<string> LoginAsync(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.UserName); //cuva podatke o korisniku na osnovu korisnickog imena

             //Debug ispis
             Console.WriteLine($"User found: {user?.UserName}"); //<===OVO RADI

            if (user == null)
            {
                Console.WriteLine("User not found!");
                throw new UnauthorizedAccessException("Invalid username or password.");
            }

            //PROVJERA
             Console.WriteLine($"User Name: {user.UserName}"); // Ovo će ispisati korisničko ime u konzolu

            var isPasswordCorrect = await _userManager.CheckPasswordAsync(user, loginDTO.Password);
            if (!isPasswordCorrect)
            {
                Console.WriteLine("Incorrect password");
                throw new UnauthorizedAccessException("Invalid username or password.");
            }

            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles);

            return token;
        }

        private string GenerateJwtToken(User user, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),//ovo bi trebalo da je dobro
                new Claim(ClaimTypes.NameIdentifier, user.Id)
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
