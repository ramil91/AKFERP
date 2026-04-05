using AKFERP.Application.Abstractions.Identity;
using MediatR;

namespace AKFERP.Application.Features.Users.Queries.GetUsers;

public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, IReadOnlyList<UserListItemDto>>
{
    private readonly IUserDirectory _userDirectory;

    public GetUsersQueryHandler(IUserDirectory userDirectory) =>
        _userDirectory = userDirectory;

    public Task<IReadOnlyList<UserListItemDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken) =>
        _userDirectory.GetAllAsync(cancellationToken);
}
