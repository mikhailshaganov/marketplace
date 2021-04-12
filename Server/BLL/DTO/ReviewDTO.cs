using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.BLL.DTO
{
    public class ReviewDTO
    {
        public byte Rate { get; set; }

        public string Description { get; set; }

        public int ProductID { get; set; }

        public string UserID { get; set; }
    }
}
