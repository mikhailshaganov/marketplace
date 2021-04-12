using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Server.DAL.DBModels
{
    public class User : IdentityUser
    {
        public string Token { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
