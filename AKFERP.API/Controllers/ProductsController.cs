using AKFERP.Application.Features.Products.Commands.Create;
using AKFERP.Application.Features.Products.Commands.Delete;
using AKFERP.Application.Features.Products.Commands.Update;
using AKFERP.Application.Features.Products.Queries.GetById;
using AKFERP.Application.Features.Products.Queries.List;
using AKFERP.Shared.Responses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AKFERP.API.Controllers;

[ApiController]
[Route("api/products")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly ISender _sender;

    public ProductsController(ISender sender) =>
        _sender = sender;

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var items = await _sender.Send(new GetProductsQuery(), cancellationToken);
        return Ok(ApiResponse<object>.Ok(items));
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var item = await _sender.Send(new GetProductByIdQuery(id), cancellationToken);
        if (item is null)
            return NotFound(ApiResponse<object>.Fail("Product not found."));

        return Ok(ApiResponse<object>.Ok(item));
    }

    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status201Created)]
    public async Task<IActionResult> Create([FromBody] CreateProductCommand command, CancellationToken cancellationToken)
    {
        var created = await _sender.Send(command, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, ApiResponse<object>.Ok(created));
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductBody body, CancellationToken cancellationToken)
    {
        var updated = await _sender.Send(
            new UpdateProductCommand(id, body.Name, body.Description, body.Price, body.Sku),
            cancellationToken);

        if (updated is null)
            return NotFound(ApiResponse<object>.Fail("Product not found."));

        return Ok(ApiResponse<object>.Ok(updated));
    }

    [HttpDelete("{id:guid}")]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var deleted = await _sender.Send(new DeleteProductCommand(id), cancellationToken);
        if (!deleted)
            return NotFound(ApiResponse<object>.Fail("Product not found."));

        return Ok(ApiResponse<object>.Ok(new { id }, "Product deleted."));
    }
}

public record UpdateProductBody(string Name, string? Description, decimal Price, string? Sku);
