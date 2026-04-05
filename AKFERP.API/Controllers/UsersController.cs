using AKFERP.Application.Features.Users.Queries.GetUsers;
using AKFERP.Shared.Constants;
using AKFERP.Shared.Responses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AKFERP.API.Controllers;

[ApiController]
[Route("api/users")]
[Authorize(Roles = AppRoles.Admin)]
public class UsersController : ControllerBase
{
    private readonly ISender _sender;

    public UsersController(ISender sender) =>
        _sender = sender;

    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUsers(CancellationToken cancellationToken)
    {
        var users = await _sender.Send(new GetUsersQuery(), cancellationToken);
        return Ok(ApiResponse<object>.Ok(users));
    }
}
