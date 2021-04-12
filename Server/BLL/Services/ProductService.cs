using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using AutoMapper.Internal;
using Server.BLL.DTO;
using Server.BLL.Infrastructure;
using Server.BLL.Interfaces;
using Server.DAL.DBModels;
using Server.DAL.Interfaces;

namespace Server.BLL.Services
{
    public class ProductService : IProductService
    {
        public static Dictionary<string, Func<IEnumerable<ProductDTO>, IEnumerable<ProductDTO>>> SortAttrs = new Dictionary<string, Func<IEnumerable<ProductDTO>, IEnumerable<ProductDTO>>>
        {
            {"price_asc", (listProduct) => listProduct.OrderBy(product => product.Price) },
            {string.Empty, (listProduct) => listProduct },
            {"price_desc", (listProduct) => listProduct.OrderByDescending(product => product.Price) },
            {"name_asc", (listProduct) => listProduct.OrderBy(product => product.ProductName) },
            {"name_desc", (listProduct) => listProduct.OrderByDescending(product => product.ProductName) },
            {"rating_asc", (listProduct) => listProduct.OrderByDescending(product => product.Rate) },
            {"relevance_asc", (listProduct) => listProduct },
        };

        private const int ProductsOnPage = 12;

        private IUnitOfWork Database { get; set; }

        private readonly IWebHostEnvironment env;

        public ProductService(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            Database = unitOfWork;
            this.env = env;
        }

        public void AddProduct(ProductPostQueryDTO productDTO, IFormFile image)
        {
            string imageName = AddOrGetImage(image, productDTO.ImageName);

            Product product = new Product()
            {
                ProductName = productDTO.ProductName,
                Description = productDTO.Description,
                Price = productDTO.Price,
                Quantity = productDTO.Quantity,
                Image = imageName,
            };

            Database.Products.Create(product);
            Database.Save();
        }

        public void UpdateProduct(ProductPostQueryDTO updatedProductDTO, IFormFile image)
        {
            string imageName = AddOrGetImage(image, updatedProductDTO.ImageName);

            Product updatedProduct = new Product()
            {
                ProductID = updatedProductDTO.Id,
                ProductName = updatedProductDTO.ProductName,
                Description = updatedProductDTO.Description,
                Price = updatedProductDTO.Price,
                Quantity = updatedProductDTO.Quantity,
                Image = imageName,
            };

            Database.Products.Update(updatedProduct);
            Database.Save();
        }

        public ProductDTO GetProduct(int? id)
        {
            if (id == null)
            {
                throw new ValidationException("Product not found", string.Empty);
            }

            var product = Database.Products.Get(id.Value);
            if (product == null)
            {
                throw new ValidationException("Product not found", string.Empty);
            }

            return new ProductDTO {
                Id = product.ProductID,
                ProductName = product.ProductName,
                Description = product.Description,
                Price = product.Price,
                Quantity = product.Quantity,
                Image = product.Image,
                Rate = GetProductRate(product.ProductID),
                Vote = GetProductVotes(product.ProductID),
            };
        }

        public ProductResposeDTO GetProducts(ProductQueryDTO queryDTO)
        {
            IEnumerable<Product> productsDB = string.IsNullOrEmpty(queryDTO.Searching) ? Database.Products.GetAll() : GetSearchingProducts(queryDTO.Searching);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Product, ProductDTO>().ForMember("Id", product => product.MapFrom(p => p.ProductID))).CreateMapper();

            IEnumerable<ProductDTO> productDTO = mapper.Map<IEnumerable<Product>, List<ProductDTO>>(productsDB);
            productDTO.ForAll(product => {
                product.Rate = GetProductRate(product.Id);
                product.Vote = GetProductVotes(product.Id);
            });
            productDTO = SortAttrs[queryDTO.Sorting].Invoke(productDTO);

            int paginationCount = (int)Math.Ceiling((double)productsDB.Count() / ProductsOnPage);
            try
            {
                int rangeProducts = (queryDTO.Page - 1) * ProductsOnPage;
                productDTO = productDTO.ToList().GetRange(
                    rangeProducts, (rangeProducts + ProductsOnPage) < productDTO.Count() ? ProductsOnPage : productDTO.Count() - rangeProducts);
            }
            catch
            {
                return null;
            }

            ProductResposeDTO productResposeDTO = new ProductResposeDTO {
                ProductsDTO = productDTO,
                PaginationCount = paginationCount,
            };

            return productResposeDTO;
        }

        public ProductResposeDTO GetAll()
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Product, ProductDTO>().ForMember("Id", product => product.MapFrom(p => p.ProductID))).CreateMapper();
            ProductResposeDTO productResposeDTO = new ProductResposeDTO
            {
                ProductsDTO = mapper.Map<IEnumerable<Product>, List<ProductDTO>>(Database.Products.GetAll()),
                PaginationCount = 0,
            };

            return productResposeDTO;
        }

        public IEnumerable<Product> GetSearchingProducts(string text)
        {
            return Database.Products.Find(product => product.ProductName.Contains(text) || product.Description.Contains(text));
        }

        public void DeleteProduct(int? id)
        {
            if (id == null)
            {
                throw new ValidationException("Product not found", string.Empty);
            }

            Database.Products.Delete(id.Value);
            Database.Save();
        }

        public void Dispose()
        {
            Database.Dispose();
        }

        private string AddOrGetImage(IFormFile image, string imageName)
        {
            var webRoot = env.WebRootPath;
            var imagePath = Path.Combine(webRoot, "images");

            if (File.Exists(imagePath + "/" + imageName))
            {
                return "/images/" + imageName;
            }

            if (image != null)
            {
                byte[] imageData = null;

                using (var binaryReader = new BinaryReader(image.OpenReadStream()))
                {
                    imageData = binaryReader.ReadBytes((int)image.Length);
                }

                Image productImage;
                using (MemoryStream ms = new MemoryStream(imageData))
                {
                    productImage = Image.FromStream(ms);
                }

                productImage.Save(imagePath + "/" + imageName);
                return "/images/" + imageName;
            }

            return "/images/base.png";
        }
        
        private float GetProductRate(int productID)
        {
            IEnumerable<Review> reviewsDB = Database.Reviews.Find(review => review.ProductID == productID);

            if (reviewsDB.Count() > 0)
            {
                return (float)Math.Round((float)reviewsDB.Average(review => review.Rate), 2);
            }

            return 0;
        }

        private int GetProductVotes(int productID)
        {
            return Database.Reviews.Find(review => review.ProductID == productID).Count();
        }
    }
}
