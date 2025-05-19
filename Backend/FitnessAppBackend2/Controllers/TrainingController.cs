using System;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models;
using FitnessAppBackend2_.Services.TrainingWithVideo;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Consumes("multipart/form-data")]
[RequestSizeLimit(100_000_000)]
public class TrainingController : ControllerBase
{
    private readonly ITrainingService _trainingService;

    public TrainingController(ITrainingService trainingService)
    {
        _trainingService = trainingService;
    }

    [HttpPost]
    public async Task<IActionResult> AddTraining([FromForm] TrainingCreateDTO dto)
    {
        await _trainingService.AddTrainingAsync(dto);
        return Ok(new { message = "Training added successfully" });
    }

    [HttpGet]
    public async Task<ActionResult<List<TrainingReadDTO>>> GetTrainings()
    {
        var trainings = await _trainingService.GetAllTrainingsAsync();
        return Ok(trainings);
    }


    [HttpPut("{id}")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UpdateTraining(int id, [FromForm] TraininUpdateDTO dto)
    {
        try
        {
            await _trainingService.UpdateTrainingAsync(id, dto);
            return Ok(new { message = "Training updated successfully" });
        }
        catch (Exception ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }


    [HttpDelete("{id}")]
public async Task<IActionResult> DeleteTraining(int id)
{
    await _trainingService.DeleteTrainingAsync(id);
    return Ok(new { message = "Training deleted successfully" });
}



}
