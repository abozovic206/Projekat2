using System;

namespace FitnessAppBackend2_.Models;

public class TrainingVideosMan
{
      public int Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string VideoUrl { get; set; }
    public int DayOfWeek { get; set; }

}
