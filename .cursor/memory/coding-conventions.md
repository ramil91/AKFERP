# Coding conventions (AKFERP)

- **Nullable reference types** enabled; avoid null-forgiving unless justified.
- **Feature folders** under `AKFERP.Application/Features/<Area>/{Commands|Queries|Common}`.
- **Records** for immutable commands/queries when practical.
- **Validators**: one `AbstractValidator<TRequest>` per command/query that needs rules.
- **Controllers**: thin; delegate to `ISender`; return `ApiResponse<T>` envelopes for success paths where used.
- **Exceptions**: use `ValidationException` (FluentValidation), `UnauthorizedAccessException` (auth), `InvalidOperationException` (business rule violations); global middleware maps them to HTTP status codes.
- **Logging**: Serilog via `UseSerilog` and request logging; avoid logging secrets or tokens.
