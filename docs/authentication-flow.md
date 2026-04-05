# Authentication and JWT

## Components

1. **ASP.NET Core Identity** — user store, password hashing, roles (`ApplicationUser`, `ApplicationRole`, EF stores).
2. **JWT bearer authentication** — after login or registration, the API returns an **access token** signed with a symmetric key (`Jwt:Key` in configuration).
3. **Authorization** — endpoints use `[Authorize]`; admin-only endpoints use `[Authorize(Roles = AppRoles.Admin)]`.

## Registration and login flow

1. Client calls `POST /api/auth/register` or `POST /api/auth/login`.
2. `IAuthService` uses `UserManager<ApplicationUser>` to create or validate the user.
3. `IJwtTokenGenerator` builds a JWT containing:
   - Subject / name identifier (user id)
   - Email claims
   - Role claims (`ClaimTypes.Role`)
4. Client sends `Authorization: Bearer <token>` on subsequent requests.

## Configuration

`appsettings.json` section `Jwt`:

- `Issuer`, `Audience` — validated on every request.
- `Key` — **must be a long, random secret** (at least 32 characters for HMAC-SHA256).
- `ExpireMinutes` — token lifetime.

## Swagger

Swagger UI includes a **Bearer** security scheme. Click **Authorize**, enter `Bearer <your-token>`, and try secured endpoints.

## Middleware

`ExceptionHandlingMiddleware` maps `UnauthorizedAccessException` (failed login) to HTTP 401 and validation failures to HTTP 400.
