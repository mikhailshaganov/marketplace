using System;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.BLL;
using Server.BLL.DTO;
using Server.BLL.Interfaces;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AuthorizationFilterAttribute]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductsController(IProductService service)
        {
            productService = service;
        }

        [HttpGet("{id:int}")]
        public ProductDTO GetProduct(int? id)
        {
            return productService.GetProduct(id);
        }

        [HttpGet]
        [AuthorizationFilterAttribute]
        public ProductResposeDTO GetProducts([FromQuery]ProductQueryDTO queryDTO)
        {
            return queryDTO.GetAll ? productService.GetAll() : productService.GetProducts(queryDTO);
        }

        [HttpPost]
        public void AddProduct([FromForm] IFormCollection product, [FromForm(Name = "image")] IFormFile image)
        {
            ProductPostQueryDTO productDTO = JsonSerializer.Deserialize<ProductPostQueryDTO>(product["product"][0]);
            productService.AddProduct(productDTO, image);
        }

        [HttpPut]
        public void UpdateProduct([FromForm] IFormCollection product, [FromForm(Name = "image")] IFormFile image)
        {
            ProductPostQueryDTO productDTO = JsonSerializer.Deserialize<ProductPostQueryDTO>(product["product"][0]);
            productService.UpdateProduct(productDTO, image);
            try
            {
                throw new NullReferenceException("something wrong");
            }
            catch
            {

            }
        }

        [HttpDelete("{id:int}")]
        public void DeleteProduct(int? id)
        {
            productService.DeleteProduct(id);
        }

    }
}