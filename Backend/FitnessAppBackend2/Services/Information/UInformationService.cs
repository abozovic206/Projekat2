using System;
using System.Security.Claims;
using AutoMapper;
using FitnessAppBackend2_.Data;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.Services.Auth;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using Microsoft.EntityFrameworkCore;


namespace FitnessAppBackend2_.Services.Information
{
  public class UInformationService : IUInformationService
  {
    private readonly UserManager<User> _userManager;
    private readonly AppDbContext _context;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IAuthService _authService;
    private readonly IMapper _mapper;

    public UInformationService(UserManager<User> userManager, AppDbContext context, IHttpContextAccessor httpContextAccessor,
 IAuthService authService, IMapper mapper)
    {
      _userManager = userManager;
      _context = context;
      _httpContextAccessor = httpContextAccessor;
      _authService = authService;
      _mapper = mapper;
    }




    public async Task<bool> PutInformationAsync(UserParameterDTO userParameterDTO)
    {
      var user = await _authService.GetCurrentUser();
      Console.WriteLine("korisnikkk: " + user.UserName);

      if (user == null)
      {
        Console.WriteLine(">>>>>>>User not found<<<<<<<");
        throw new Exception("User not found");
      }

      //Ako je korisnik poslao novu tezinu i ona se razlikuje od prethodne
      if(userParameterDTO.Weight.HasValue && user.Weight!=userParameterDTO.Weight)
      {
        var weightRecord=new WeightRecord
        {
          UserId=user.Id,
          Weight=userParameterDTO.Weight.Value,
          Date=DateTime.Now
        };

        _context.WeightRecords.Add(weightRecord);
      }

      // Ručno ažuriraj samo ono što treba iz DTO-a
      if(userParameterDTO.Weight.HasValue)
      user.Weight = userParameterDTO.Weight;
      if(userParameterDTO.Height.HasValue)
      user.Height = userParameterDTO.Height;
      if(userParameterDTO.Age.HasValue)
      user.Age = userParameterDTO.Age;
      if(!string.IsNullOrEmpty(userParameterDTO.Gender))
      user.Gender = userParameterDTO.Gender;
      if(userParameterDTO.BodyFatPercentage.HasValue)
      user.BodyFatPercentage = userParameterDTO.BodyFatPercentage;
      if(userParameterDTO.Waist.HasValue)
      user.Waist = userParameterDTO.Waist;
      if(userParameterDTO.Hips.HasValue)
      user.Hips = userParameterDTO.Hips;
      if(!string.IsNullOrEmpty(userParameterDTO.Goal))
      user.Goal = userParameterDTO.Goal;
      

      //Ako je korisnik poslao novu sliku, sacuvaj je
      if(userParameterDTO.ProfilePicture!=null)
      {
        var uploadsFolder=Path.Combine(Directory.GetCurrentDirectory(),"wwwroot/images");

        //provjerava da li folder postoji, ako ne napravi ga
        if(!Directory.Exists(uploadsFolder))
        {
          Directory.CreateDirectory(uploadsFolder);
        }

        //provjerava ekstenziju fajla
        var allowedExtensions=new[]{".jpg",".jpeg",".png",".gif"};
        var fileExtension=Path.GetExtension(userParameterDTO.ProfilePicture.FileName);//uzima ekstenziju sa slike

        if(!allowedExtensions.Contains(fileExtension))//provjerava da li pripada nekom od elemenata niza 
        {
          throw new Exception("Unsupported file format.");
        }

        var uniqueFileName=Guid.NewGuid().ToString()+Path.GetExtension(userParameterDTO.ProfilePicture.FileName);
        var filePath=Path.Combine(uploadsFolder, uniqueFileName);

        //snima sliku na server
        using(var fileStream=new FileStream(filePath, FileMode.Create))
        {
          await userParameterDTO.ProfilePicture.CopyToAsync(fileStream);
        }

        //Azurira putanju u bazi
        user.ProfilePicture=$"images/{uniqueFileName}";

      }



      var result = await _userManager.UpdateAsync(user);//azuriranje korisnika

      if (!result.Succeeded)//bool da li je result uspjesno izvrsen 
      {
        Console.WriteLine("Update failed: " + string.Join(", ", result.Errors.Select(e => e.Description)));
        return false;
      }

      return true;
    }


    //GET ZA DOHVACANJE IZ WEIGHTRECORD
    public async Task<List<WeightRecordDTO>> GetAllWeightRecordsAsync(string userId)
{
    // Dohvatamo sve zapise težine za određenog korisnika (filtriramo po UserId)
    var weightRecords = await _context.WeightRecords
                                       .Where(w => w.UserId == userId)  // Filtriramo zapise po userId
                                       .ToListAsync();  // Dohvatamo sve rezultate

    // Mapiramo dobijene zapise u DTO (Data Transfer Object) format
    var weightRecordDTOs = _mapper.Map<List<WeightRecordDTO>>(weightRecords);

    // Vraćamo mapirane DTO podatke
    return weightRecordDTOs;
}

   









  }

}

