using Microsoft.EntityFrameworkCore;
using FitnessAppBackend2_.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;



namespace FitnessAppBackend2_.Data
{
    public class AppDbContext : IdentityDbContext<User> //Nasljedjuje IdentityDbContext sa User tipom
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        //dodati dbSet za druge modele ako su potrebni
        //prop za to
        public DbSet<WeightRecord> WeightRecords { get; set; }

        public DbSet<NutritionItem> NutritionItems { get; set; }

        public DbSet<TrainingVideo> Trainings { get; set; }


        //Role seed-ujem preko OnModelCreating metode ali ja necu tako 

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                    new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
                );

        }
    }

}

