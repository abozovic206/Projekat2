using System;

namespace FitnessAppBackend2_.DTO;

public class LoginDTO
{
    public required string UserName { get; set; }
    public required string Password { get; set; }
    public string? FirstName{get; set;}
    public string? LastName{get; set;}

}
