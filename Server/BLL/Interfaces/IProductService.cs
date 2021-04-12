using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Server.BLL.DTO;

namespace Server.BLL.Interfaces
{
    public interface IProductService
    {
        void AddProduct(ProductPostQueryDTO product, IFormFile image);

        void UpdateProduct(ProductPostQueryDTO product, IFormFile image);

        void DeleteProduct(int? id);

        ProductDTO GetProduct(int? id);

        ProductResposeDTO GetAll();

        ProductResposeDTO GetProducts(ProductQueryDTO queryDTO);

        void Dispose();
    }
}
