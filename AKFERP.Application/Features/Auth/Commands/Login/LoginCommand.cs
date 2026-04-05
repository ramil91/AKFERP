using AKFERP.Application.Features.Auth.Common;
using MediatR;

namespace AKFERP.Application.Features.Auth.Commands.Login;

public record LoginCommand(string Email, string Password) : IRequest<AuthResponseDto>;
