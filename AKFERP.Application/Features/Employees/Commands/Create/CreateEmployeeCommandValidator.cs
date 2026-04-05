using FluentValidation;

namespace AKFERP.Application.Features.Employees.Commands.Create;

public sealed class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator()
    {
        RuleFor(x => x.EmployeeCode).NotEmpty().MaximumLength(50);
        RuleFor(x => x.FirstName).MaximumLength(100);
        RuleFor(x => x.LastName).MaximumLength(100);
        RuleFor(x => x.CNIC).MaximumLength(20);
        RuleFor(x => x.Gender).MaximumLength(10);
        RuleFor(x => x.MaritalStatus).MaximumLength(20);
        RuleFor(x => x.BloodGroup).MaximumLength(5);
        RuleFor(x => x.PersonalEmail).MaximumLength(255);
        RuleFor(x => x.PersonalEmail).EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.PersonalEmail));
        RuleFor(x => x.Phone).MaximumLength(50);
        RuleFor(x => x.Department).MaximumLength(100);
        RuleFor(x => x.Designation).MaximumLength(100);
        RuleFor(x => x.EmploymentType).MaximumLength(50);
        RuleFor(x => x.Status).MaximumLength(50);
        RuleFor(x => x.BasicSalary).GreaterThanOrEqualTo(0).When(x => x.BasicSalary.HasValue);
        RuleFor(x => x.Allowances).GreaterThanOrEqualTo(0).When(x => x.Allowances.HasValue);
        RuleFor(x => x.Deductions).GreaterThanOrEqualTo(0).When(x => x.Deductions.HasValue);
        RuleFor(x => x.BankName).MaximumLength(100);
        RuleFor(x => x.BankAccountNo).MaximumLength(50);
        RuleFor(x => x.SalaryPaymentMethod).MaximumLength(50);
        RuleFor(x => x.IPAddress).MaximumLength(45);
    }
}
