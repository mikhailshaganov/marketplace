using Microsoft.EntityFrameworkCore;
using Server.DAL.DBContext;
using Server.DAL.DBModels;
using Server.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Server.DAL.Repositories
{
    public class ReviewRepository : IRepository<Review>
    {
        private MarketPlaceContext db;

        public ReviewRepository(MarketPlaceContext context)
        {
            this.db = context;
        }

        public IEnumerable<Review> GetAll()
        {
            return db.Reviews;
        }

        public Review Get(int id)
        {
            return db.Reviews.Find(id);
        }

        public void Create(Review review)
        {
            db.Reviews.Add(review);
        }

        public void Update(Review review)
        {
            db.Entry(review).State = EntityState.Modified;
        }

        public IEnumerable<Review> Find(Expression<Func<Review, bool>> predicate)
        {
            return db.Reviews.Where(predicate).ToList();
        }

        public void Delete(int id)
        {
            Review review = db.Reviews.Find(id);
            if (review != null)
            {
                db.Reviews.Remove(review);
            }
        }

    }
}
