using AKFERP.Application.Abstractions.Data;
using AKFERP.Application.Features.Employees.Common;
using AutoMapper;
using MediatR;

namespace AKFERP.Application.Features.Employees.Queries.GetById;

public sealed class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, EmployeeDto?>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetEmployeeByIdQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<EmployeeDto?> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
    {
        var entity = await _unitOfWork.Employees.GetByIdAsync(request.Id, cancellationToken);
        return entity is null ? null : _mapper.Map<EmployeeDto>(entity);
    }
}
