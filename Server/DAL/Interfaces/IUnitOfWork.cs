using System;
using Microsoft.EntityFrameworkCore;
using Server.DAL.DBContext;
using Server.DAL.DBModels;

namespace Server.DAL.Interfaces {

    public interface IUnitOfWork : IDisposable
    {
        IRepository<Product> Products { get; }

        IRepository<User> Users { get; }
        
        IRepository<Review> Reviews { get; }

        void Save();
    }
}
