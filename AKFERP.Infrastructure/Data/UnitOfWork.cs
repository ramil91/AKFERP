using AKFERP.Application.Abstractions.Data;
using AKFERP.Domain.Entities;
using AKFERP.Persistence.Context;

namespace AKFERP.Infrastructure.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly ApplicationDbContext _context;
    private IRepository<Product, Guid>? _products;
    private IRepository<Employee, Guid>? _employees;

    public UnitOfWork(ApplicationDbContext context) =>
        _context = context;

    public IRepository<Product, Guid> Products =>
        _products ??= new Repository<Product, Guid>(_context);

    public IRepository<Employee, Guid> Employees =>
        _employees ??= new Repository<Employee, Guid>(_context);

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default) =>
        _context.SaveChangesAsync(cancellationToken);
}
