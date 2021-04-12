using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.BLL.DTO
{
    public class ProductQueryDTO
    {
        public string Sorting{ get; set; } = string.Empty;

        public int Page { get; set; } = 1;

        public string Searching { get; set; } = string.Empty;

        public bool GetAll { get; set; } = false;
    }
}
