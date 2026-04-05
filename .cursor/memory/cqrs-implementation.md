# CQRS implementation memory (AKFERP)

- Requests implement `MediatR.IRequest<TResponse>` (or non-generic `IRequest` if no return value).
- Handlers implement `IRequestHandler<TRequest,TResponse>` in the same assembly as the request.
- `ValidationBehavior<TRequest,TResponse>` is registered as `IPipelineBehavior<,>` and runs all `IValidator<TRequest>` instances before the handler.
- `AddApplication()` registers MediatR from the Application assembly, FluentValidation validators from the same assembly, AutoMapper profiles, and the validation behavior.
- New features: add command/query + handler + validator (+ mapping + persistence abstraction as needed).
