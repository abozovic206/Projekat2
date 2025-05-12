using System;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.DTO;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.TagHelpers;

namespace FitnessAppBackend2_.Services.Nutrition
{
    public interface INutritionService
{
    Task<NutritionItem> AddNutritionItemAsync(NutritionDTO dto);
    Task<List<NutritionItem>>GetAllNutritionItemsAsync();
    Task<List<NutritionItem>>GetByMealTypeAsync(string mealType);
   Task<NutritionItem> UpdateNutritionItemAsync(int id, NutritionDTO nutritionDTO);
   Task<bool>DeleteNutritionItemAsync(int id);

}

}