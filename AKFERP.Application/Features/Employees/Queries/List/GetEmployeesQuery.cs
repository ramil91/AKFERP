using AKFERP.Application.Features.Employees.Common;
using MediatR;

namespace AKFERP.Application.Features.Employees.Queries.List;

public sealed record GetEmployeesQuery : IRequest<IReadOnlyList<EmployeeDto>>;
