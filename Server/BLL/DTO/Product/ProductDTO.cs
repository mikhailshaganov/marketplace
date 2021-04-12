using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.BLL.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string ProductName { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }

        public int Quantity { get; set; }

        public string Image { get; set; }

        public float Rate { get; set; }

        public int Vote { get; set; }
    }
}
