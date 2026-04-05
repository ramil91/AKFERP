using AKFERP.Application.Abstractions.Data;
using AKFERP.Application.Features.Employees.Common;
using AutoMapper;
using MediatR;

namespace AKFERP.Application.Features.Employees.Queries.List;

public sealed class GetEmployeesQueryHandler : IRequestHandler<GetEmployeesQuery, IReadOnlyList<EmployeeDto>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetEmployeesQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<EmployeeDto>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
    {
        var items = await _unitOfWork.Employees.ListAsync(cancellationToken);
        var ordered = items.OrderBy(e => e.EmployeeCode).ToList();
        return _mapper.Map<IReadOnlyList<EmployeeDto>>(ordered);
    }
}
