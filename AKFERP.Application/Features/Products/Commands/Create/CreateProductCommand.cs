using AKFERP.Application.Features.Products.Common;
using MediatR;

namespace AKFERP.Application.Features.Products.Commands.Create;

public record CreateProductCommand(
    string Name,
    string? Description,
    decimal Price,
    string? Sku) : IRequest<ProductDto>;
