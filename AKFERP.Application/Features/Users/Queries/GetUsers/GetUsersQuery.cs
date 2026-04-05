using MediatR;

namespace AKFERP.Application.Features.Users.Queries.GetUsers;

public record GetUsersQuery : IRequest<IReadOnlyList<UserListItemDto>>;
