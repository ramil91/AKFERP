using AKFERP.Application.Features.Products.Common;
using MediatR;

namespace AKFERP.Application.Features.Products.Queries.List;

public record GetProductsQuery : IRequest<IReadOnlyList<ProductDto>>;
