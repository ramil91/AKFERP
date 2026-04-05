namespace AKFERP.Application.Features.Users.Queries.GetUsers;

public class UserListItemDto
{
    public string Id { get; init; } = string.Empty;
    public string? UserName { get; init; }
    public string? Email { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public IReadOnlyList<string> Roles { get; init; } = Array.Empty<string>();
}
