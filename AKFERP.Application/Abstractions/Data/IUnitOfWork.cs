using AKFERP.Domain.Entities;

namespace AKFERP.Application.Abstractions.Data;

public interface IUnitOfWork
{
    IRepository<Product, Guid> Products { get; }
    IRepository<Employee, Guid> Employees { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
