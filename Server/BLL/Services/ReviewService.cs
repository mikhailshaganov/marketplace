using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Server.BLL.DTO;
using Server.BLL.Infrastructure;
using Server.BLL.Interfaces;
using Server.DAL.DBModels;
using Server.DAL.Interfaces;

namespace Server.BLL.Services
{
    public class ReviewService : IReviewService
    {
        private IUnitOfWork Database { get; set; }

        public ReviewService(IUnitOfWork unitOfWork)
        {
            Database = unitOfWork;
        }

        public void AddReview(ReviewDTO reviewDTO)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<ReviewDTO, Review>()).CreateMapper();
            Review review = mapper.Map<ReviewDTO, Review>(reviewDTO);
            Database.Reviews.Create(review);
            Database.Save();
        }

        public void UpdateReview(ReviewDTO updatedReviewDTO)
        {
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<ReviewDTO, Review>()).CreateMapper();
            Review updatedReview = mapper.Map<ReviewDTO, Review>(updatedReviewDTO);
            Database.Reviews.Update(updatedReview);
            Database.Save();
        }

        public ReviewResponseDTO GetProductReviews(int productID)
        {
            IEnumerable<Review> reviewsDB = Database.Reviews.Find(review => review.ProductID == productID);
            var mapper = new MapperConfiguration(cfg => cfg.CreateMap<Review, ReviewDTO>()).CreateMapper();

            ReviewResponseDTO reviewResponseDTO = new ReviewResponseDTO();

            if (reviewsDB.Count() > 0)
            {
                reviewResponseDTO.MiddleRate = (float)Math.Round((float)reviewsDB.Sum(review => review.Rate) / reviewsDB.Count(), 2);
                reviewResponseDTO.ReviewsCount = reviewsDB.Count();
                reviewResponseDTO.ReviewPoints = new List<int>(Enumerable.Range(1, 5).Select(n => reviewsDB.Where(review => review.Rate == n).Count()));
            }

            reviewResponseDTO.ReviewsDTO = mapper.Map<IEnumerable<Review>, List<ReviewDTO>>(reviewsDB);

            return reviewResponseDTO;
        }

        public void DeleteReview(int? id)
        {
            if (id == null)
            {
                throw new ValidationException("Review not found", string.Empty);
            }

            Database.Reviews.Delete(id.Value);
            Database.Save();
        }

        public void Dispose()
        {
            Database.Dispose();
        }

    }
}
