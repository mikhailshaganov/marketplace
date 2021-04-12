using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DAL.DBModels
{
    public enum OrderStatus
    {
        InProcess,
        IsCompleted,
    }

    public class Order
    {
        public int OrderID { get; set; }

        public bool IsBasket { get; set; }

        public OrderStatus Status { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public virtual ICollection<OrderProduct> OrderProducts { get; set; }
    }
}
