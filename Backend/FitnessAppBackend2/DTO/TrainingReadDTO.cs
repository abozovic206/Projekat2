// DTO/TrainingReadDTO.cs
namespace FitnessAppBackend2_.DTO;

public class TrainingReadDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int DayOfWeek { get; set; }
    public string VideoUrl { get; set; }
}
