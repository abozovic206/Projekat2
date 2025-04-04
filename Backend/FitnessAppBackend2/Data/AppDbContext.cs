using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FitnessAppBackend2_.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace FitnessAppBackend2_.Data
{
    public class AppDbContext:IdentityDbContext<User> //Nasljedjuje IdentityDbContext sa User tipom
    {
        public AppDbContext(DbContextOptions<AppDbContext>options):base(options)
        {

        }
        //dodati dbSet za druge modele ako su potrebni
        //prop za to

    }

}


