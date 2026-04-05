namespace AKFERP.Application.Abstractions.Authentication;

public interface IJwtTokenGenerator
{
    string CreateToken(string userId, string email, IReadOnlyCollection<string> roles);
}
