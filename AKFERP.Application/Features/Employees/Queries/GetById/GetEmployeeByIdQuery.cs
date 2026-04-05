using AKFERP.Application.Features.Employees.Common;
using MediatR;

namespace AKFERP.Application.Features.Employees.Queries.GetById;

public sealed record GetEmployeeByIdQuery(Guid Id) : IRequest<EmployeeDto?>;
