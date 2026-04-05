using AKFERP.Application.Abstractions.Data;
using AKFERP.Domain.Common;
using AKFERP.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace AKFERP.Infrastructure.Data;

public class Repository<TEntity, TId> : IRepository<TEntity, TId>
    where TEntity : class, IEntity<TId>
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<TEntity> _set;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
        _set = context.Set<TEntity>();
    }

    public async Task<TEntity?> GetByIdAsync(TId id, CancellationToken cancellationToken = default) =>
        await _set.FindAsync(new object[] { id! }, cancellationToken);

    public async Task<IReadOnlyList<TEntity>> ListAsync(CancellationToken cancellationToken = default) =>
        await _set.AsNoTracking().ToListAsync(cancellationToken);

    public IQueryable<TEntity> Query() =>
        _set.AsQueryable();

    public void Add(TEntity entity) =>
        _set.Add(entity);

    public void Update(TEntity entity) =>
        _set.Update(entity);

    public void Remove(TEntity entity) =>
        _set.Remove(entity);
}
