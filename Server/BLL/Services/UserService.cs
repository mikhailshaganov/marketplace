using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Server.BLL.DTO.UserAuthenticate;
using Server.BLL.Infrastructure;
using Server.DAL.DBModels;
using Server.DAL.Interfaces;

namespace Server.BLL.Services
{
    public class UserService
    {
        private readonly IUnitOfWork database;

        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public UserService(UserManager<User> userManager, SignInManager<User> signInManager, IUnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.database = unitOfWork;
        }

        public async Task<UserAuthenticateResponse> Authenticate(bool validToken = false)
        {
            User user = await GetLoginUser();

            if (user == null)
            {
                user = await AddUser();
                await signInManager.SignInAsync(user, false);
            }
            else
            {
                if (!validToken)
                {
                    await UpdateJwtToken(user);
                }
            }

            return new UserAuthenticateResponse(user);
        }

        public void UpdateUser(UserAuthenticateRequest userAuthenticate)
        {
        }

        public async Task<UserAuthenticateResponse> GetAuthenticateResponse(IRequestCookieCollection requestCookies)
        {
            string userId = requestCookies["User_Id"];
            string jwtToken = requestCookies["jwt_token"];
            string validToken = requestCookies["valid_token"];
            User user = string.IsNullOrEmpty(userId) ? null : database.Users.Find(user => user.Id.Equals(userId)).First();

            if (user != null && user.Id == userId)
            {
                if (!user.Token.Equals(jwtToken) || validToken.Equals("false"))
                {
                    await UpdateJwtToken(user);
                }
            } else {
                SignOut();
                return new UserAuthenticateResponse(new User { Id = string.Empty, Token = string.Empty }, StatusCodes.Status401Unauthorized);
            }

            return new UserAuthenticateResponse(user, StatusCodes.Status200OK);
        }

        public void DeleteUser(int? id)
        {
            if (id == null)
            {
                throw new ValidationException("User not found", string.Empty);
            }

            database.Users.Delete(id.Value);
            database.Save();
        }

        public void Dispose()
        {
            database.Dispose();
        }

        public async void SignOut()
        {
            await signInManager.SignOutAsync();
        }

        private async Task<User> AddUser()
        {
            ExternalLoginInfo loginInfo = await signInManager.GetExternalLoginInfoAsync();
            var externalUser = loginInfo.Principal;

            User user = new User
            {
                Id = externalUser.FindFirstValue(ClaimTypes.NameIdentifier),
                UserName = externalUser.FindFirstValue(ClaimTypes.Name),
                Email = externalUser.FindFirstValue(ClaimTypes.Email),
            };

            user.Token = GenerateJwtToken(user);
            await userManager.CreateAsync(user);
            await userManager.AddLoginAsync(user, loginInfo);

            return user;
        }

        private async Task UpdateJwtToken(User user)
        {
            user.Token = GenerateJwtToken(user);
            await userManager.UpdateAsync(user);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim("id", user.Id.ToString()),
                    new Claim("UserName", user.UserName.ToString()),
                    new Claim("Email", user.Email.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<User> GetLoginUser()
        {
            ExternalLoginInfo loginInfo = await signInManager.GetExternalLoginInfoAsync();
            return await userManager.FindByLoginAsync(loginInfo.LoginProvider, loginInfo.ProviderKey);
        }
    }
}
