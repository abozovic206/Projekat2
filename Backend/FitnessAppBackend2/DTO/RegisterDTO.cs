using System;
using System.ComponentModel.DataAnnotations;

namespace FitnessAppBackend2_.DTO;

public class RegisterDTO
{
  [Required]
  public string FirstName { get; set; }
  [Required]
  public string LastName { get; set; }
  [Required]
  public string UserName { get; set; }
  [Required]
  public string PasswordHash { get; set; }
  [Required]
  public string Email { get; set; }

}
