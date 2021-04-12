using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.DAL.DBModels;

namespace Server.BLL.DTO.UserAuthenticate
{
    public class UserAuthenticateResponse
    {
        public string Id { get; set; }

        public string Token { get; set; }

        public int StatusCode { get; set; }

        public UserAuthenticateResponse(User user, int statusCode = 200)
        {
            Id = user.Id;
            Token = user.Token;
            StatusCode = statusCode;
        }
    }
}
