using System;

namespace FitnessAppBackend2_.Models;

public class WeightRecord
{
    public int Id { get; set; }
    public float Weight { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;
    public string UserId { get; set; }
    public User User { get; set; }
}
