using AKFERP.Application.Features.Products.Common;
using MediatR;

namespace AKFERP.Application.Features.Products.Commands.Update;

public record UpdateProductCommand(
    Guid Id,
    string Name,
    string? Description,
    decimal Price,
    string? Sku) : IRequest<ProductDto?>;
