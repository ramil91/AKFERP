using MediatR;

namespace AKFERP.Application.Features.Products.Commands.Delete;

public record DeleteProductCommand(Guid Id) : IRequest<bool>;
