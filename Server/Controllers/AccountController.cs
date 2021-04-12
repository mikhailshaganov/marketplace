using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Server.BLL;
using Server.BLL.DTO.UserAuthenticate;
using Server.BLL.Services;
using Server.DAL.DBModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.Controllers
{
    [Route("account")]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly UserService userService;

        public AccountController(UserService service, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.userService = service;
        }

        [AllowAnonymous, Route("google-login")]
        public IActionResult GoogleLogin()
        {
            var redirectUrl = Url.Action("GoogleResponse");
            var properties = signInManager.ConfigureExternalAuthenticationProperties(GoogleDefaults.DisplayName, redirectUrl);
            return new ChallengeResult(GoogleDefaults.DisplayName, properties);
        }

        [AllowAnonymous, Route("signin-google")]
        public async Task<IActionResult> GoogleResponse()
        {
            var auth = await HttpContext.AuthenticateAsync(GoogleDefaults.AuthenticationScheme);

            if (auth?.Succeeded != true)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, "External authentication error");
            }

            bool validToken = false;
            bool.TryParse(HttpContext.Request.Cookies["valid_token"], out validToken);

            UserAuthenticateResponse userAuthenticateResponse = await userService.Authenticate(validToken);

            HttpContext.Response.Cookies.Append("User_Id", userAuthenticateResponse.Id, new CookieOptions { IsEssential = true });
            HttpContext.Response.Cookies.Append("jwt_token", userAuthenticateResponse.Token, new CookieOptions { IsEssential = true });

            return Redirect("/");
        }

        [AllowAnonymous, Route("authMe")]
        public async Task<UserAuthenticateResponse> AuthMe()
        {
            return await userService.GetAuthenticateResponse(HttpContext.Request.Cookies);
        }

        [AllowAnonymous, Route("signout")]
        public async Task<IActionResult> SignOut()
        {
            HttpContext.Response.Cookies.Delete("User_Id");
            HttpContext.Response.Cookies.Delete("jwt_token");
            HttpContext.Response.Cookies.Delete("valid_token");
            userService.SignOut();
            return Redirect("/");
        }

    }
}
