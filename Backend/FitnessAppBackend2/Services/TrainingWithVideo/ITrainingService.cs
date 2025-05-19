using System;
using FitnessAppBackend2_.DTO;

namespace FitnessAppBackend2_.Services.TrainingWithVideo
{
    public interface ITrainingService
    {
        Task AddTrainingAsync(TrainingCreateDTO dto);
        // ITrainingService.cs
        Task<List<TrainingReadDTO>> GetAllTrainingsAsync();
        Task UpdateTrainingAsync(int id,TraininUpdateDTO dto);
        Task DeleteTrainingAsync(int id);



    }

}

