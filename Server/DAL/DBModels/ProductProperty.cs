using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DAL.DBModels
{
    public class ProductProperty
    {
        public int ProductPropertyID { get; set; }

        public string PropertyName { get; set; }

        public string Description { get; set; }

        public int ProductID { get; set; }

        public virtual Product Product { get; set; }
    }
}
