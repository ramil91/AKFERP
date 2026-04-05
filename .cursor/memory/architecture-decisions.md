# Architecture decisions (AKFERP)

- **Clean Architecture** with strict dependency direction: API → Application/Infrastructure; Application → Domain/Shared; Persistence → Domain.
- **Database-first**: SQL scripts in `AKFERP.Database/Scripts` are the source of truth; **no EF Core migrations** for schema in this template.
- **CQRS** via **MediatR**; validation via **FluentValidation** pipeline behavior.
- **Identity** stored in SQL with standard ASP.NET Core Identity tables; extended user columns: `FirstName`, `LastName`.
- **JWT** for API authentication; roles carried as claims; Swagger configured with bearer security.
- **Repository + Unit of Work** for `Product` aggregate access; Identity operations use `UserManager` / `RoleManager` through application-facing services where appropriate.
