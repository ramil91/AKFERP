# Development guide — adding a feature with CQRS

## 1. Domain

Add or update entities in `AKFERP.Domain` if the feature introduces new business data.

## 2. Database (database-first)

1. Add or change tables, functions, or procedures using scripts in `AKFERP.Database/Scripts` (new numbered script or alter script).
2. Apply scripts to your SQL Server instance.
3. Update `ApplicationDbContext` and entity configuration in `AKFERP.Persistence` so EF models match the database.

## 3. Application layer

1. Create a folder under `AKFERP.Application/Features/<FeatureName>/`.
2. Add a **command** or **query** record implementing `IRequest<TResponse>`.
3. Add a **handler** implementing `IRequestHandler<TRequest, TResponse>`.
4. Add a **FluentValidation** `AbstractValidator<T>` in the same feature folder (validated automatically by `ValidationBehavior`).
5. Add **AutoMapper** maps in `Mappings/MappingProfile.cs` when mapping entities to DTOs.
6. If persistence goes through EF, extend **`IUnitOfWork`** / **`IRepository<TEntity,TId>`** or add a dedicated repository interface in Application and implement it in Infrastructure.

## 4. Infrastructure

- Register new services in `Infrastructure/DependencyInjection.cs`.
- Implement interfaces defined in Application.

## 5. API

- Add a controller action (or minimal API) that calls `ISender.Send(...)`.
- Apply `[Authorize]` / role attributes as needed.

## 6. Swagger and tests

- Document new endpoints with XML comments or Swashbuckle attributes if desired.
- Smoke-test with Swagger: obtain a JWT via `/api/auth/login`, then call secured routes.
