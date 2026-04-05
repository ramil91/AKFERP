# AKFERP.Database

SQL Server **database-first** assets: one script per table under `Scripts/Tables`, plus **functions**, **stored procedures**, **seed** data, and optional database creation.

## Folder layout

| Folder | Purpose |
|--------|---------|
| `Scripts/Database` | Create `AKFERP` database (optional if it already exists) |
| `Scripts/Tables` | One `.sql` file per table (numeric prefix = dependency order) |
| `Scripts/Functions` | T-SQL functions |
| `Scripts/Procedures` | Stored procedures |
| `Scripts/Seed` | Reference data (roles, admin user, sample rows) |

## Deploy order

Run scripts in **ascending numeric order** within each folder, in this sequence:

1. **`Database`** — `010_CreateDatabase.sql`
2. **`Tables`** — `010_` … `090_` (Identity tables first, then domain tables)
3. **`Functions`** — e.g. `010_fn_ProductCount.sql`
4. **`Procedures`** — e.g. `010_sp_GetProductById.sql`
5. **`Seed`** — `010_SeedData.sql` (last)

When adding a new table, create `Scripts/Tables/NNN_YourTable.sql` with the next number after the highest existing table script, and respect foreign-key order (referenced tables first).

## .NET project

`AKFERP.Database.csproj` includes all `Scripts/**/*.sql` and copies them to the build output under `Scripts\` for CI or tooling.

## Default admin (after seed)

- **Email / username:** `admin@akferp.local`
- **Password:** `Admin@123`

Change the password in production. The seeded password hash matches ASP.NET Core Identity’s `PasswordHasher` format.

If a user with that email **already existed** before running seed, the seed step is skipped and the old password remains. Either delete that user, register a different account, or update `PasswordHash` using a tool that emits Identity-compatible hashes.

When running ad hoc `sqlcmd` updates against tables with **filtered indexes**, enable `SET QUOTED_IDENTIFIER ON;` (seed and Identity table scripts do so where needed).

## Visual Studio SSDT

You can import these scripts into a SQL Server Database Project (`.sqlproj`) if your team uses SSDT; this repository ships scripts as plain `.sql` files for portability and CI.
