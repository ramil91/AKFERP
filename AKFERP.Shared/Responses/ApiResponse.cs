namespace AKFERP.Shared.Responses;

public class ApiResponse<T>
{
    public bool Success { get; init; }
    public T? Data { get; init; }
    public IReadOnlyCollection<string>? Errors { get; init; }
    public string? Message { get; init; }

    public static ApiResponse<T> Ok(T data, string? message = null) =>
        new() { Success = true, Data = data, Message = message };

    public static ApiResponse<T> Fail(IReadOnlyCollection<string> errors, string? message = null) =>
        new() { Success = false, Errors = errors, Message = message };

    public static ApiResponse<T> Fail(string error, string? message = null) =>
        new() { Success = false, Errors = new[] { error }, Message = message };
}
