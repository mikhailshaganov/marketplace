using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Server.DAL.DBModels
{
    public class Review
    {
        public int ReviewID { get; set; }

        public byte Rate { get; set; }

        public string Description { get; set; }

        public string UserId { get; set; }

        public int ProductID { get; set; }

        public virtual User User { get; set; }

        public virtual Product Product { get; set; }
    }
}
