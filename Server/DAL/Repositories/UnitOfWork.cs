using System;
using Server.DAL.DBContext;
using Server.DAL.DBModels;
using Server.DAL.Interfaces;

namespace Server.DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private ProductRepository productRepository;
        private ReviewRepository reviewRepository;

        private UserRepository userRepository;

        public UnitOfWork(MarketPlaceContext context)
        {
            DBContext = context;
        }

        private MarketPlaceContext DBContext;

        public IRepository<Product> Products
        {
            get
            {
                if (productRepository == null)
                {
                    productRepository = new ProductRepository(DBContext);
                }

                return productRepository;
            }
        }

        public IRepository<User> Users
        {
            get
            {
                if (userRepository == null)
                {
                    userRepository = new UserRepository(DBContext);
                }

                return userRepository;
            }
        }        

        public IRepository<Review> Reviews
        {
            get
            {
                if (reviewRepository == null)
                {
                    reviewRepository = new ReviewRepository(DBContext);
                }

                return reviewRepository;
            }
        }

        public void Save()
        {
            DBContext.SaveChanges();
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    DBContext.Dispose();
                }

                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
