using AKFERP.Application.Features.Employees.Common;
using AKFERP.Application.Features.Products.Common;
using AKFERP.Domain.Entities;
using AutoMapper;

namespace AKFERP.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<Employee, EmployeeDto>();
    }
}
