using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.BLL.DTO
{
    public class ProductResposeDTO
    {
        public IEnumerable<ProductDTO> ProductsDTO { get; set; }

        public int PaginationCount { get; set; } = 1;

    }
}
