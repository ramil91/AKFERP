# CQRS with MediatR

**CQRS** (Command Query Responsibility Segregation) separates operations that change state (**commands**) from operations that read state (**queries**).

## Implementation

- **MediatR** dispatches requests to a single handler per request type.
- **Commands** live under `AKFERP.Application/Features/.../Commands/...` and implement `IRequest<TResponse>` (or `IRequest` for fire-and-forget cases).
- **Queries** live under `.../Queries/...` and also implement `IRequest<TResponse>`.
- **Handlers** implement `IRequestHandler<TRequest, TResponse>` and contain the use-case logic.
- **FluentValidation** validators are registered with `AddValidatorsFromAssembly`; **`ValidationBehavior<TRequest, TResponse>`** runs them before the handler executes.

## Examples in this solution

| Area | Type | Request |
|------|------|---------|
| Auth | Command | `RegisterCommand`, `LoginCommand` |
| Products | Command | `CreateProductCommand`, `UpdateProductCommand`, `DeleteProductCommand` |
| Products | Query | `GetProductsQuery`, `GetProductByIdQuery` |
| Users | Query | `GetUsersQuery` |

## API layer

Controllers stay thin: they call `ISender.Send(...)` and map results to HTTP responses. This keeps HTTP concerns out of application logic.
