using System;
using System.Security.Claims;
using AutoMapper;
using FitnessAppBackend2_.Data;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.Services.Auth;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace FitnessAppBackend2_.Services.Nutrition;

public class NutritionService : INutritionService
{
    private readonly AppDbContext _context; //baza
    private readonly IWebHostEnvironment _enviroment;

    public NutritionService(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _enviroment = environment;
    }


    //POST

    public async Task<NutritionItem> AddNutritionItemAsync(NutritionDTO dto)
    {
        try
        {
            if (dto.Image == null || dto.Image.Length == 0)
                throw new ArgumentException("Image is required");

            var imageName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Image.FileName);
            var imageFolder = Path.Combine(_enviroment.WebRootPath, "images", "nutrition");

            if (!Directory.Exists(imageFolder))
                Directory.CreateDirectory(imageFolder);

            var imagePath = Path.Combine(imageFolder, imageName);

            using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            var item = new NutritionItem
            {
                MealType = dto.MealType,
                Description = dto.Description,
                ImageUrl = "images/nutrition/" + imageName
            };

            _context.NutritionItems.Add(item);
            await _context.SaveChangesAsync();

            return item;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Greška u servisu:" + ex.Message);
            return null; // ← NE BACAJ DALJE
        }
    }


    //GET
    public async Task<List<NutritionItem>> GetAllNutritionItemsAsync()
    {
        return await _context.NutritionItems.ToListAsync();
    }



    //GetByMealType
    public async Task<List<NutritionItem>> GetByMealTypeAsync(string mealType)
    {
        return await _context.NutritionItems
                        .Where(n => n.MealType.ToLower() == mealType.ToLower())
                        .ToListAsync();
    }


    //UPDATE
    public async Task<NutritionItem> UpdateNutritionItemAsync(int id, UpdateNutritionDTO updateNutritionDTO)
    {
        var item = await _context.NutritionItems.FindAsync(id);
    if (item == null)
    {
        throw new Exception("Nutrition item not found");
    }

        // Ažuriranje samo teksta
        item.MealType = updateNutritionDTO.MealType;
        item.Description = updateNutritionDTO.Description;

    _context.NutritionItems.Update(item);
    await _context.SaveChangesAsync();

    return item;
    }


    //DELETE
    public async Task<bool> DeleteNutritionItemAsync(int id)
    {
        var item = await _context.NutritionItems.FindAsync(id);
        if (item == null)
        {
            throw new Exception("Nutrition item not found");
        }

        _context.NutritionItems.Remove(item);
        await _context.SaveChangesAsync();


        return true;
    }

    //GET ID
     public async Task<NutritionItem> GetNutritionByIdAsync(int id)
    {
        return await _context.NutritionItems.FindAsync(id);
    }


    

}
