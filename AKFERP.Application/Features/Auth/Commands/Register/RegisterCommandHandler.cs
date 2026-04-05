using AKFERP.Application.Abstractions.Authentication;
using AKFERP.Application.Features.Auth.Common;
using MediatR;

namespace AKFERP.Application.Features.Auth.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponseDto>
{
    private readonly IAuthService _authService;

    public RegisterCommandHandler(IAuthService authService) =>
        _authService = authService;

    public Task<AuthResponseDto> Handle(RegisterCommand request, CancellationToken cancellationToken) =>
        _authService.RegisterAsync(request, cancellationToken);
}
