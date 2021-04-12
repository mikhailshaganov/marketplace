using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace Server.BLL
{
    public class AuthorizationFilterAttribute : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var jwtToken = context.HttpContext.Request.Cookies["jwt_token"];

            if (!string.IsNullOrEmpty(jwtToken))
            {
                JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadToken(jwtToken) as JwtSecurityToken;
                DateTime expDate = jsonToken.ValidTo;

                if (expDate < DateTime.UtcNow.AddMinutes(1))
                {
                    context.HttpContext.Response.Cookies.Append("valid_token", "false", new CookieOptions() { IsEssential = true });
                    context.Result = new StatusCodeResult(StatusCodes.Status401Unauthorized);
                }
                else
                {
                    context.HttpContext.Response.Cookies.Append("valid_token", "true", new CookieOptions() { IsEssential = true});
                }
            }
            else
            {
                context.HttpContext.Response.Cookies.Append("valid_token", "false", new CookieOptions() { IsEssential = true });
                context.Result = new StatusCodeResult(StatusCodes.Status401Unauthorized);
            }
        }
    }
}