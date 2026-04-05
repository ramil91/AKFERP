using AKFERP.Application.Features.Auth.Common;
using MediatR;

namespace AKFERP.Application.Features.Auth.Commands.Register;

public record RegisterCommand(
    string Email,
    string Password,
    string? FirstName,
    string? LastName) : IRequest<AuthResponseDto>;
