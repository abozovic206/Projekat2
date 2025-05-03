using AutoMapper;
using FitnessAppBackend2_.DTO;
using FitnessAppBackend2_.Models;

namespace FitnessAppBackend.AutoMapper;

public class MappingProfile:Profile
{
    public MappingProfile()
    {
        CreateMap<RegisterDTO, User>();
        CreateMap<User, AuthResult>();
        CreateMap<User, UserParameterDTO>();
        CreateMap<WeightRecord,WeightRecordDTO>();

    }
}
