using AKFERP.Application.Features.Employees.Common;
using MediatR;

namespace AKFERP.Application.Features.Employees.Commands.Create;

public sealed class CreateEmployeeCommand : IRequest<EmployeeDto>
{
    public int? ProjectId { get; set; }
    public int? UserId { get; set; }
    public string EmployeeCode { get; set; } = string.Empty;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? CNIC { get; set; }
    public DateOnly? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public string? MaritalStatus { get; set; }
    public string? BloodGroup { get; set; }
    public string? PersonalEmail { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? Department { get; set; }
    public string? Designation { get; set; }
    public string? EmploymentType { get; set; }
    public DateOnly? HireDate { get; set; }
    public DateOnly? ConfirmationDate { get; set; }
    public Guid? ReportingManagerId { get; set; }
    public string? Status { get; set; }
    public decimal? BasicSalary { get; set; }
    public decimal? Allowances { get; set; }
    public decimal? Deductions { get; set; }
    public string? BankName { get; set; }
    public string? BankAccountNo { get; set; }
    public string? SalaryPaymentMethod { get; set; }
    public Guid? CreatedBy { get; set; }
    public string? IPAddress { get; set; }
}
