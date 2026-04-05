using AKFERP.Application.Abstractions.Authentication;
using AKFERP.Application.Features.Auth.Common;
using MediatR;

namespace AKFERP.Application.Features.Auth.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, AuthResponseDto>
{
    private readonly IAuthService _authService;

    public LoginCommandHandler(IAuthService authService) =>
        _authService = authService;

    public Task<AuthResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken) =>
        _authService.LoginAsync(request, cancellationToken);
}
