using System;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.Services.Nutrition;
using Microsoft.AspNetCore.Mvc;

namespace FitnessAppBackend2_.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NutritionController:ControllerBase
{
    private readonly NutritionService _nutritionService;

    public NutritionController(NutritionService nutritionService)
    {
        _nutritionService=nutritionService;
    }

[HttpPost]
public async Task<IActionResult> Add([FromForm] NutritionDTO dto)
{
    Console.WriteLine($"🟢 POST zahtev primljen. MealType: {dto.MealType}, Opis: {dto.Description}, Slika: {dto.Image?.FileName}");

    var item = await _nutritionService.AddNutritionItemAsync(dto);
    if (item == null)
    {
        Console.WriteLine("🔴 Dodavanje obroka nije uspelo.");
        return BadRequest("Greška prilikom dodavanja obroka.");
    }

    Console.WriteLine("✅ Obrok dodat uspešno.");
    return Ok(item);
}


    

    [HttpGet]
    public async Task<ActionResult<List<NutritionItem>>> Get()
    {
        try
        {
            var nutritionItems=await _nutritionService.GetAllNutritionItemsAsync();
            if(nutritionItems==null || nutritionItems.Count==0)
            {
                return NotFound("No nutrition items found.");
            }

            return Ok(nutritionItems);
        }

        catch(Exception ex)
        {
            return StatusCode(500, "An error occurred while retrieving the data:"+ex.Message);
        }
    }


    [HttpGet("by-meal-type")]
    public async Task<ActionResult<List<NutritionItem>>>GetByMealType([FromQuery]string mealType)
    {
        var items=await _nutritionService.GetByMealTypeAsync(mealType);

        return Ok(items);
    }


    [HttpPut("{id}")]
    public async Task<ActionResult<NutritionItem>>UpdateNutritionItem(int id, [FromForm]NutritionDTO nutritionDTO)
    {
        try
        {
            var updateItem=await _nutritionService.UpdateNutritionItemAsync(id, nutritionDTO);
            return Ok(updateItem);
        }

        catch(Exception ex)
        {
            return NotFound(ex.Message);
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult>DeleteNutritionItem(int id)
    {
        try
        {
            var result=await _nutritionService.DeleteNutritionItemAsync(id);
            if(result)
            {
                return Ok(new{message="Nutrition item deleted successfully"});
            }
            return NotFound();
        }

        catch(Exception ex)
        {
            return BadRequest(new{message=ex.Message});
        }
    }
}


}

