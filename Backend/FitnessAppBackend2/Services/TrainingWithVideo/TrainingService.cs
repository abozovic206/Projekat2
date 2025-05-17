using System;
using FitnessAppBackend2_.Data;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;


namespace FitnessAppBackend2_.Services.TrainingWithVideo;

public class TrainingService : ITrainingService
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _enviroment;

    public TrainingService(AppDbContext context, IWebHostEnvironment enviroment)
    {
        _context = context;
        _enviroment = enviroment;
    }

    //POST
    public async Task AddTrainingAsync(TrainingCreateDTO dto)
    {
        // Snimi fajl (video) u wwwroot/videos
        var videosPath = Path.Combine(_enviroment.WebRootPath, "videos");

        if (!Directory.Exists(videosPath))
            Directory.CreateDirectory(videosPath);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Video.FileName);
        var fullPath = Path.Combine(videosPath, fileName);

        using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await dto.Video.CopyToAsync(stream);
        }

        var training = new TrainingVideo
        {
            Name = dto.Name,
            Description = dto.Description,
            DayOfWeek = dto.DayOfWeek,
            VideoUrl = $"/videos/{fileName}"
        };

        _context.Trainings.Add(training);
        await _context.SaveChangesAsync();
    }

    //GET
    // Services/TrainingWithVideo/TrainingService.cs
    public async Task<List<TrainingReadDTO>> GetAllTrainingsAsync()
    {
        return await _context.Trainings
            .Select(t => new TrainingReadDTO
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                DayOfWeek = t.DayOfWeek,
                VideoUrl = t.VideoUrl
            })
            .ToListAsync();
    }


    //UPDATE
    public async Task UpdateTrainingAsync(TraininUpdateDTO dto)
    {
        var training = await _context.Trainings.FindAsync(dto.Id);
        if (training == null)
            throw new Exception("Training not found");

        training.Name = dto.Name;
        training.Description = dto.Description;
        training.DayOfWeek = dto.DayOfWeek;

        if (dto.Video != null)
        {
            var videosPath = Path.Combine(_enviroment.WebRootPath, "videos");
            if (!Directory.Exists(videosPath))
                Directory.CreateDirectory(videosPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Video.FileName);
            var fullPath = Path.Combine(videosPath, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await dto.Video.CopyToAsync(stream);
            }

            training.VideoUrl = $"/videos/{fileName}";
        }

        await _context.SaveChangesAsync();
    }


    public async Task DeleteTrainingAsync(int id)
{
    var training = await _context.Trainings.FindAsync(id);
    if (training == null)
        throw new Exception("Training not found");

    // Obrisi video fajl ako postoji
    var videoPath = Path.Combine(_enviroment.WebRootPath, training.VideoUrl.TrimStart('/'));
    if (System.IO.File.Exists(videoPath))
        System.IO.File.Delete(videoPath);

    _context.Trainings.Remove(training);
    await _context.SaveChangesAsync();
}




}
