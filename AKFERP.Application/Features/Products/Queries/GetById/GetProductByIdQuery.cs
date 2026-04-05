using AKFERP.Application.Features.Products.Common;
using MediatR;

namespace AKFERP.Application.Features.Products.Queries.GetById;

public record GetProductByIdQuery(Guid Id) : IRequest<ProductDto?>;
