# Clean Architecture (AKFERP)

AKFERP follows **Clean Architecture** so that business rules stay independent of frameworks, databases, and UI.

## Layers

| Project | Responsibility |
|---------|----------------|
| **AKFERP.Domain** | Entities (`Product`), shared domain contracts (`IEntity<TId>`). No infrastructure references. |
| **AKFERP.Application** | Use cases: CQRS commands/queries, validators, AutoMapper profiles, abstractions (`IUnitOfWork`, `IAuthService`). Depends on Domain and Shared. |
| **AKFERP.Persistence** | EF Core `ApplicationDbContext`, Identity user/role types, entity configuration. Depends on Domain. |
| **AKFERP.Infrastructure** | Technical implementations: JWT, repositories, unit of work, Identity services, EF registrations. Implements Application abstractions. |
| **AKFERP.API** | HTTP surface: controllers, middleware, Swagger, Serilog bootstrap, authentication pipeline. |
| **AKFERP.Shared** | Cross-cutting primitives: API envelopes, role name constants. |
| **AKFERP.Database** | Database-first SQL scripts (tables, functions, procedures, seed). Not compiled into the .NET solution. |

## Dependency rule

Dependencies point **inward**: outer layers depend on inner abstractions, not the reverse. The Application layer defines interfaces; Infrastructure and Persistence supply implementations.

## Database-first

The schema is owned by **SQL scripts** under `AKFERP.Database/Scripts`. EF Core maps to the existing database; **EF migrations are not used** for schema evolution in this template.
