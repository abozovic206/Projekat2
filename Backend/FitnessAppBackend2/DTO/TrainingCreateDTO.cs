using System;

namespace FitnessAppBackend2_.DTO;

public class TrainingCreateDTO
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int DayOfWeek { get; set; }
    public IFormFile Video { get; set; }

}
