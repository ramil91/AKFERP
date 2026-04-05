# Project structure

```
AKFERP/
├── AKFERP.API/                 # Web host, controllers, middleware, Swagger, Serilog
├── AKFERP.Application/         # CQRS features, validators, AutoMapper, abstractions
├── AKFERP.Domain/            # Domain entities and core contracts
├── AKFERP.Infrastructure/    # JWT, repositories, unit of work, Identity wiring
├── AKFERP.Persistence/       # DbContext, Identity types, EF configuration
├── AKFERP.Shared/            # Shared constants and API response types
├── AKFERP.Database/          # SQL scripts (database-first)
│   └── Scripts/
├── docs/                     # Architecture and developer documentation
└── .cursor/memory/           # Structured notes for AI assistants
```

## Feature folders (Application)

Each feature typically contains:

- `Commands/` — write operations + validators + handlers
- `Queries/` — read operations + handlers
- `Common/` — DTOs shared within the feature

## Endpoints (examples)

| Method | Route | Auth |
|--------|-------|------|
| POST | `/api/auth/register` | Anonymous |
| POST | `/api/auth/login` | Anonymous |
| GET | `/api/users` | Admin |
| GET/POST/PUT/DELETE | `/api/products` | Authenticated |
