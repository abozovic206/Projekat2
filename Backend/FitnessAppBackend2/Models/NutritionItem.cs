using System;

namespace FitnessAppBackend2_.Models;

public class NutritionItem
{
    public int Id { get; set; }
    public required string  MealType { get; set; } //npr dorucak, rucak, vecera
    public required string  ImageUrl { get; set; }//putanja do slike
    public required string Description { get; set; }//opis ispod slike
}
