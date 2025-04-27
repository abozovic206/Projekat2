namespace FitnessAppBackend2_.DTO;

public class UserParameterDTO
{

    public float Weight { get; set; }
    public float Height { get; set; }
    public int Age { get; set; }
    public string? Gender { get; set; }
    public double BodyFatPercentage { get; set; }
    public double Waist { get; set; }
    public double Hips { get; set; }
    public string? Goal { get; set; }
    public IFormFile? ProfilePicture { get; set; }
}
