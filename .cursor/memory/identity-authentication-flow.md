# Identity and JWT flow memory (AKFERP)

- `ApplicationUser` / `ApplicationRole` live in **Persistence**; `ApplicationDbContext` inherits `IdentityDbContext<ApplicationUser, ApplicationRole, string>`.
- `AddInfrastructure` registers EF context, Identity, JWT bearer authentication, and authorization.
- `IAuthService` (Infrastructure `AuthService`) performs register/login using `UserManager`; new registrations are assigned role **User** (`AppRoles.User`).
- `IJwtTokenGenerator` issues signed JWTs using `Jwt` settings (issuer, audience, symmetric key, expiry).
- **Admin-only** sample: `UsersController` uses `[Authorize(Roles = AppRoles.Admin)]`.
- Seeded admin: `admin@akferp.local` / `Admin@123` (after `060_SeedData.sql`).
