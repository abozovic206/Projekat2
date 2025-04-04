using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FitnessAppBackend2_.Data;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.Services;

var builder = WebApplication.CreateBuilder(args);

// Registruj DbContext (za povezivanje sa bazom)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registruj Identity (za rad sa korisnicima i autentifikaciju)
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Dodaj autorizaciju
builder.Services.AddAuthorization();

// Dodaj servis za kontrolere
builder.Services.AddControllers();

// Dodaj OpenAPI/Swagger podršku (ako koristiš za dokumentaciju)
builder.Services.AddEndpointsApiExplorer(); // Za OpenAPI/Swagger podršku
builder.Services.AddSwaggerGen(); // Dodaj SwaggerGen za generisanje dokumentacije

// Registruj UserService
builder.Services.AddScoped<IUserService, UserService>(); // Registrovanje UserService servisa

// AutoMapper
// Registruj AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Dodaj CORS podršku
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin() // Dozvoljava bilo koji izvor
              .AllowAnyMethod() // Dozvoljava bilo koji HTTP metod (GET, POST, PUT, DELETE...)
              .AllowAnyHeader(); // Dozvoljava bilo koji HTTP header
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Omogućava OpenAPI (Swagger) u razvojnom okruženju
    app.UseSwagger(); // Omogućava Swagger
    app.UseSwaggerUI(); // Omogućava interfejs za korišćenje Swagger-a
}

app.UseHttpsRedirection();

// Omogućava CORS pre autorizacije
app.UseCors("AllowAll"); // Dodaj CORS politiku

// Omogućava autorizaciju
app.UseAuthorization();

// Mapira kontrolere
app.MapControllers();

app.Run();
