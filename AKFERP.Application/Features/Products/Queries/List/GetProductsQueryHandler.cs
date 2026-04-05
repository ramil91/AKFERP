using AKFERP.Application.Abstractions.Data;
using AKFERP.Application.Features.Products.Common;
using AutoMapper;
using MediatR;

namespace AKFERP.Application.Features.Products.Queries.List;

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, IReadOnlyList<ProductDto>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetProductsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IReadOnlyList<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var items = await _unitOfWork.Products.ListAsync(cancellationToken);
        var ordered = items.OrderBy(p => p.Name).ToList();
        return _mapper.Map<IReadOnlyList<ProductDto>>(ordered);
    }
}
