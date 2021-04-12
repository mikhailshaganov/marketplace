using Server.BLL.DTO;

namespace Server.BLL.Interfaces
{
    public interface IReviewService
    {
        void AddReview(ReviewDTO review);

        void UpdateReview(ReviewDTO review);

        void DeleteReview(int? id);

        ReviewResponseDTO GetProductReviews(int productID);

        void Dispose();
    }
}
