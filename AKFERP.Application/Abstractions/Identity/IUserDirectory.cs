using AKFERP.Application.Features.Users.Queries.GetUsers;

namespace AKFERP.Application.Abstractions.Identity;

public interface IUserDirectory
{
    Task<IReadOnlyList<UserListItemDto>> GetAllAsync(CancellationToken cancellationToken = default);
}
