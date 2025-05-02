using System;
using System.ComponentModel.DataAnnotations;

namespace FitnessAppBackend2_.DTO;

public class RegisterDTO
{
  [Required]
  public required string FirstName { get; set; }
  [Required]
  public required string LastName { get; set; }
  [Required]
  public required string UserName { get; set; }
  [Required]
  public required string Password { get; set; }
  [Required]
  public required string Email { get; set; }

  //Stavicu sva polja kao obaveznaa
  public required float Weight { get; set; }

  public required float Height { get; set; }
  public required int Age { get; set; }
  public required string Gender { get; set; }

}
