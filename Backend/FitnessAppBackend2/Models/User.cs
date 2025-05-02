using Microsoft.AspNetCore.Identity;

namespace FitnessAppBackend2_.Models;

//Model User nasljedjuje propertije iz biblioteke Identity
public class User:IdentityUser
{

    //Poslije svakog dodatog polja treba izvrsiti migraciju!!!!
    
    public required  string FirstName { get; set; }
    public required  string LastName { get; set; }

    //UserParameters
    public float? Weight { get; set; }
    public float? Height{get; set;}

    public int? Age { get; set; }=0;
    public string? Gender { get; set; }
    public double? BodyFatPercentage { get; set; }
    public double? Waist { get; set; }
    public double? Hips { get; set; }
    public string?  Goal{get; set;}

    public string? ProfilePicture {get; set;} //Cuva putanju do slike i to je string 

    
    
}

//Dodala sam polja u tabelu User samo cu trebati staviti da su required i onda to implementirati
