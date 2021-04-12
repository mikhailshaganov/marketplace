using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.BLL.DTO
{
    public class ReviewResponseDTO
    {
        public IEnumerable<ReviewDTO> ReviewsDTO { get; set; }

        public float MiddleRate { get; set; } = 0;

        public int ReviewsCount { get; set; } = 0;

        public IEnumerable<int> ReviewPoints { get; set; } = new List<int>() { 0, 0, 0, 0, 0 };
    }
}
