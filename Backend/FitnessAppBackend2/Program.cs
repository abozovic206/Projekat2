using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using FitnessAppBackend2_.Data;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.Services;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using FitnessAppBackend2_.Services.Auth;
using FitnessAppBackend.AutoMapper;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Učitavanje tajnog ključa za JWT iz appsettings.json
var secretKey = builder.Configuration["JwtSettings:SecretKey"];

// Registruj DbContext (za povezivanje sa bazom)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registruj Identity (za rad sa korisnicima i autentifikaciju)
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// Dodaj JWT autentifikaciju
/*builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidIssuer = "FitnessAppBackend", // Tvoj issuer
            ValidAudience = "FitnessAppUser", // Tvoja audience
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)) // Tajni ključ za potpisivanje tokena
        };
    });*/

// Dodaj autorizaciju
builder.Services.AddAuthorization();

// Dodaj servis za kontrolere
builder.Services.AddControllers();

// Dodaj OpenAPI/Swagger podršku (ako koristiš za dokumentaciju)
builder.Services.AddEndpointsApiExplorer(); // Za OpenAPI/Swagger podršku
builder.Services.AddSwaggerGen(); // Dodaj SwaggerGen za generisanje dokumentacije

// Registruj UserService
//builder.Services.AddScoped<IUserService, UserService>(); // Registrovanje UserService servisa
//Registrovanje AuthService-a
builder.Services.AddScoped<IAuthService, AuthService>();

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

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

//Ovde se dodaje rola
using (var scope = app.Services.CreateScope())
{
    var userService = scope.ServiceProvider.GetRequiredService<IAuthService>();
    await userService.SeedRolesAsync();  // Seeduje Admin i Member role
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Omogućava Swagger
    app.UseSwaggerUI(); // Omogućava interfejs za korišćenje Swagger-a
}


app.UseHttpsRedirection();

// Omogućava CORS pre autorizacije
app.UseCors("AllowAll"); // Dodaj CORS politiku

// Omogućava autentifikaciju
app.UseAuthentication(); // Omogućava autentifikaciju putem JWT-a

// Omogućava autorizaciju
app.UseAuthorization(); // Omogućava autorizaciju

// Mapira kontrolere
app.MapControllers();

app.Run();