using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoticeBoardBLL;
using NoticeBoardDAL.Dtos;
using NoticeBoardDAL.Models;

namespace NoticeBoardWebApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<Advertiser> AuthUser([FromBody] UserAuthDto userAuthDetails)
        {
            var UserDetails = _authService.AuthUser(userAuthDetails);

            if (UserDetails == null)
                return NotFound("Invalid username or password");

            return Ok(UserDetails);
        }


    }
}
