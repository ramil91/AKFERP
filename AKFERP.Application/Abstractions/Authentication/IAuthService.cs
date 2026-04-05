using AKFERP.Application.Features.Auth.Commands.Login;
using AKFERP.Application.Features.Auth.Commands.Register;
using AKFERP.Application.Features.Auth.Common;

namespace AKFERP.Application.Abstractions.Authentication;

public interface IAuthService
{
    Task<AuthResponseDto> RegisterAsync(RegisterCommand command, CancellationToken cancellationToken = default);
    Task<AuthResponseDto> LoginAsync(LoginCommand command, CancellationToken cancellationToken = default);
}
