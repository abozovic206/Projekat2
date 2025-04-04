using System.Threading.Tasks;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models; // Ovo je tvoj User model
using AutoMapper;
using FitnessAppBackend2_.Data;
using Microsoft.EntityFrameworkCore;  // Ovo je potrebno za asinhrone EF metode kao što je AnyAsync


namespace FitnessAppBackend2_.Services
{
    public interface IUserService
    {
        Task<User> RegisterAsync(RegisterDTO registerDto);
    }

    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;

        public UserService(IMapper mapper, AppDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<User> RegisterAsync(RegisterDTO registerDto)
        {
            // Mapiraj RegisterDTO u User
            var user = _mapper.Map<User>(registerDto);

            // Provera da li korisničko ime već postoji u bazi
            if (await _context.Users.AnyAsync(u => u.UserName == user.UserName))
            {
                throw new Exception("Username is already taken.");
            }

            // Ako je sve u redu, dodaj korisnika u bazu
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }
    }
}
