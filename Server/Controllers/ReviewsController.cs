using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.BLL.DTO;
using Server.BLL.Interfaces;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewService reviewService;

        public ReviewsController(IReviewService service)
        {
            reviewService = service;
        }

        [HttpPost]
        public void AddReviews(ReviewDTO reviewDTO)
        {
            reviewService.AddReview(reviewDTO);
        }

        [HttpGet]
        public ReviewResponseDTO GetReviews([FromQuery]int productID)
        {
            return reviewService.GetProductReviews(productID);
        }
    }
}