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
using FitnessAppBackend2_.Controllers;
using FitnessAppBackend2_.Services.Information;
using FitnessAppBackend2_.Services.Nutrition;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Registracija DbContext-a i Identity
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registracija Identity


// JWT autentifikacija
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"]!)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });


// Dodavanje drugih servisa
builder.Services.AddScoped<TokenService>();

//Dodavanje nutrition servisa
builder.Services.AddScoped<INutritionService, NutritionService>();

builder.Services.AddScoped<NutritionService>();


// Registrovanje AuthService direktno

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddScoped<IUInformationService, UInformationService>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();


builder.Services.AddAutoMapper(typeof(MappingProfile));

// Swagger konfiguracija
builder.Services.AddSwaggerGen(c =>
{
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };
    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
         jwtSecurityScheme,Array.Empty<string>()
        }
    });
});
// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Dodavanje kontrolera
builder.Services.AddControllers();

var app = builder.Build();

// Pokretanje seeding-a uloga
using (var scope = app.Services.CreateScope())
{
    var userService = scope.ServiceProvider.GetRequiredService<IAuthService>();
    await userService.SeedRolesAsync();
}

// HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseStaticFiles();  // Ova linija omogućava pristup statičkim fajlovima u wwwroot direktorijumu


app.Run();
