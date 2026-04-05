# AKFERP

Enterprise-style **ASP.NET Core 8 Web API** solution demonstrating **Clean Architecture**, **CQRS (MediatR)**, **Entity Framework Core** (database-first, **no EF migrations**), **ASP.NET Core Identity**, **JWT** authentication, **FluentValidation**, **AutoMapper**, **Serilog**, and **Swagger** with bearer auth.

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- SQL Server — **LocalDB** (Windows), full SQL Server, or Docker (see optional compose file below)

## Quick start

1. **Clone** the repository and open a terminal in the solution root (`AKFERP`).

2. **Create the database** by executing scripts in order (see `AKFERP.Database/README.md`):

   - `AKFERP.Database/Scripts/010_CreateDatabase.sql`
   - `020_AspNetIdentity.sql`
   - `030_Products.sql`
   - `040_Functions.sql`
   - `050_Procedures.sql`
   - `060_SeedData.sql`

   You can run them with **SQL Server Management Studio**, **Azure Data Studio**, or `sqlcmd`.

3. **Configure** `AKFERP.API/appsettings.json`:

   - `ConnectionStrings:DefaultConnection` — point at your SQL instance and `AKFERP` database.
   - `Jwt:Key` — replace with a long, random secret (minimum ~32 characters for HMAC-SHA256).

4. **Run** the API:

   ```bash
   dotnet run --project AKFERP.API
   ```

5. In **Development**, Swagger UI is served at the site root (`https://localhost:7192/` or the URL shown in the console). Use **Authorize** and paste `Bearer <token>` after logging in.

## Default seeded admin

After running `060_SeedData.sql`:

| Field | Value |
|-------|--------|
| Email / username | `admin@akferp.local` |
| Password | `Admin@123` |

This account has the **Admin** role and can call `GET /api/users`.

## Example endpoints

| Method | Route | Notes |
|--------|--------|--------|
| POST | `/api/auth/register` | Creates user (default **User** role) |
| POST | `/api/auth/login` | Returns JWT |
| GET | `/api/users` | **Admin** only |
| GET | `/api/products` | Authenticated |
| GET | `/api/products/{id}` | Authenticated |
| POST | `/api/products` | Authenticated |
| PUT | `/api/products/{id}` | Authenticated |
| DELETE | `/api/products/{id}` | Authenticated |

## Database-first and migrations

Schema changes are applied with **SQL scripts** under `AKFERP.Database/Scripts`. This template **does not** use `dotnet ef migrations` for schema ownership. After you change the database, update EF entity configuration in `AKFERP.Persistence` to stay in sync.

## Optional: SQL Server in Docker

Example `docker-compose.yml` at the solution root (adjust password and connection string):

```yaml
services:
  sql:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "Your_password123"
    ports:
      - "1433:1433"
```

Connection string example:

`Server=localhost,1433;Database=AKFERP;User Id=sa;Password=Your_password123;TrustServerCertificate=True;MultipleActiveResultSets=true`

## Documentation

- [`docs/architecture.md`](docs/architecture.md) — layer responsibilities  
- [`docs/cqrs-pattern.md`](docs/cqrs-pattern.md) — MediatR CQRS  
- [`docs/authentication-flow.md`](docs/authentication-flow.md) — Identity + JWT  
- [`docs/project-structure.md`](docs/project-structure.md) — folder map  
- [`docs/development-guide.md`](docs/development-guide.md) — adding features  

## Security notes

- Rotate **JWT** secrets and SQL credentials for production.
- **AutoMapper** 12.x may report a NuGet advisory; plan a tested upgrade path when policy allows (see NuGet `NU1903` output during restore).

## License

Use and modify freely for your organization.
