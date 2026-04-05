using System.Net;
using System.Text.Json;
using AKFERP.Shared.Responses;
using FluentValidation;

namespace AKFERP.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception");
            await WriteErrorAsync(context, ex);
        }
    }

    private static async Task WriteErrorAsync(HttpContext context, Exception exception)
    {
        var (status, response) = exception switch
        {
            ValidationException ve => (
                HttpStatusCode.BadRequest,
                ApiResponse<object>.Fail(ve.Errors.Select(e => e.ErrorMessage).ToList(), "Validation failed")),
            UnauthorizedAccessException ue => (
                HttpStatusCode.Unauthorized,
                ApiResponse<object>.Fail(ue.Message)),
            KeyNotFoundException ke => (
                HttpStatusCode.NotFound,
                ApiResponse<object>.Fail(ke.Message)),
            InvalidOperationException ie => (
                HttpStatusCode.BadRequest,
                ApiResponse<object>.Fail(ie.Message)),
            _ => (
                HttpStatusCode.InternalServerError,
                ApiResponse<object>.Fail("An unexpected error occurred."))
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)status;

        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        await context.Response.WriteAsync(json);
    }
}
