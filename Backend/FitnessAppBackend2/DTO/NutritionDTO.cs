using System;

namespace FitnessAppBackend2_.DTO;

public class NutritionDTO
{
    public string  MealType { get; set; }
    public IFormFile Image { get; set; }
    public string Description { get; set; }
}
