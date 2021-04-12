using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DAL.DBModels
{
    public class OrderProduct
    {
        public int OrderProductID { get; set; }

        public int Quantity { get; set; }

        public float Cost { get; set; }

        public int OrderID { get; set; }

        public int ProductID { get; set; }

        public virtual Order Order { get; set; }

        public virtual Product Product { get; set; }
    }
}
