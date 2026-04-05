using AKFERP.Application.Abstractions.Data;
using AKFERP.Application.Features.Employees.Common;
using AKFERP.Domain.Entities;
using AutoMapper;
using MediatR;

namespace AKFERP.Application.Features.Employees.Commands.Create;

public sealed class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, EmployeeDto>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CreateEmployeeCommandHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<EmployeeDto> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var entity = new Employee
        {
            Id = Guid.NewGuid(),
            ProjectId = request.ProjectId,
            UserId = request.UserId,
            EmployeeCode = request.EmployeeCode,
            FirstName = request.FirstName,
            LastName = request.LastName,
            CNIC = request.CNIC,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender,
            MaritalStatus = request.MaritalStatus,
            BloodGroup = request.BloodGroup,
            PersonalEmail = request.PersonalEmail,
            Phone = request.Phone,
            Address = request.Address,
            Department = request.Department,
            Designation = request.Designation,
            EmploymentType = request.EmploymentType,
            HireDate = request.HireDate,
            ConfirmationDate = request.ConfirmationDate,
            ReportingManagerId = request.ReportingManagerId,
            Status = request.Status,
            BasicSalary = request.BasicSalary,
            Allowances = request.Allowances,
            Deductions = request.Deductions,
            BankName = request.BankName,
            BankAccountNo = request.BankAccountNo,
            SalaryPaymentMethod = request.SalaryPaymentMethod,
            CreatedBy = request.CreatedBy,
            CreatedDate = now,
            IPAddress = request.IPAddress
        };

        _unitOfWork.Employees.Add(entity);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return _mapper.Map<EmployeeDto>(entity);
    }
}
