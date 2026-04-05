# AKFERP.Database

SQL Server **database-first** assets: tables aligned with ASP.NET Core Identity and the `Products` domain table, plus sample **functions** and **stored procedures**.

## Deploy order

Run scripts in `Scripts` in numeric order against your SQL Server instance (for example `(localdb)\mssqllocaldb` or Docker SQL Server).

| Order | File | Purpose |
|------:|------|---------|
| 1 | `010_CreateDatabase.sql` | Creates `AKFERP` database (optional if DB exists) |
| 2 | `020_AspNetIdentity.sql` | Identity tables + extended user columns |
| 3 | `030_Products.sql` | `Products` table |
| 4 | `040_Functions.sql` | Example scalar function |
| 5 | `050_Procedures.sql` | Example stored procedure |
| 6 | `060_SeedData.sql` | Roles, admin user, sample product |

## Default admin (after seed)

- **Email / username:** `admin@akferp.local`
- **Password:** `Admin@123`

Change the password in production. The seeded password hash matches ASP.NET Core Identity’s `PasswordHasher` format.

If a user with that email **already existed** before running `060_SeedData.sql`, the seed step is skipped and the old password remains. Either delete that user, register a different account, or update `PasswordHash` using a tool that emits Identity-compatible hashes.

When running ad hoc `sqlcmd` updates against tables with **filtered indexes**, enable `SET QUOTED_IDENTIFIER ON;` (this script does so in `060_SeedData.sql`).

## Visual Studio SSDT

You can import these scripts into a SQL Server Database Project (`.sqlproj`) if your team uses SSDT; this repository ships scripts as plain `.sql` files for portability and CI.
