namespace AKFERP.Application.Features.Employees.Common;

public sealed class EmployeeDto
{
    public Guid Id { get; init; }
    public int? ProjectId { get; init; }
    public int? UserId { get; init; }
    public string EmployeeCode { get; init; } = string.Empty;
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? CNIC { get; init; }
    public DateOnly? DateOfBirth { get; init; }
    public string? Gender { get; init; }
    public string? MaritalStatus { get; init; }
    public string? BloodGroup { get; init; }
    public string? PersonalEmail { get; init; }
    public string? Phone { get; init; }
    public string? Address { get; init; }
    public string? Department { get; init; }
    public string? Designation { get; init; }
    public string? EmploymentType { get; init; }
    public DateOnly? HireDate { get; init; }
    public DateOnly? ConfirmationDate { get; init; }
    public Guid? ReportingManagerId { get; init; }
    public string? Status { get; init; }
    public decimal? BasicSalary { get; init; }
    public decimal? Allowances { get; init; }
    public decimal? Deductions { get; init; }
    public string? BankName { get; init; }
    public string? BankAccountNo { get; init; }
    public string? SalaryPaymentMethod { get; init; }
    public Guid? CreatedBy { get; init; }
    public DateTime CreatedDate { get; init; }
    public Guid? UpdatedBy { get; init; }
    public DateTime? UpdatedDate { get; init; }
    public string? IPAddress { get; init; }
}
