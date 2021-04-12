using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.DAL.DBModels;

namespace Server.DAL.DBContext
{
    public class MarketPlaceContext : IdentityDbContext<User, IdentityRole, string>
    {
        public DbSet<User> Users { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderProduct> OrderProducts { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<ProductProperty> ProductProperties { get; set; }

        public MarketPlaceContext(DbContextOptions<MarketPlaceContext> options)
            : base(options)
        {
            this.Database.Migrate();
        }
    }
}
