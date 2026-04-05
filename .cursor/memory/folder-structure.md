# Folder structure memory (AKFERP)

- `AKFERP.API` — `Controllers/`, `Middleware/`, `Program.cs`, `appsettings*.json`
- `AKFERP.Application` — `Abstractions/`, `Behaviors/`, `Features/`, `Mappings/`, `DependencyInjection.cs`
- `AKFERP.Domain` — `Entities/`, `Common/`
- `AKFERP.Persistence` — `Context/`, `Identity/`
- `AKFERP.Infrastructure` — `Authentication/`, `Data/`, `Identity/`, `Options/`, `DependencyInjection.cs`
- `AKFERP.Shared` — `Constants/`, `Responses/`
- `AKFERP.Database/Scripts` — ordered SQL for DDL, functions, procedures, seed
- `docs/` — human-facing documentation
- `.cursor/memory/` — structured notes for assistants
