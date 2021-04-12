
namespace Server.BLL.DTO
{
    public class ProductPostQueryDTO
    {

        public int Id { get; set; }

        public string ProductName { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }

        public int Quantity { get; set; }

        public string ImageName { get; set; }
    }
}
