﻿using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Server.DAL.Interfaces
{
    public interface IRepository<T>
        where T : class
    {
        IEnumerable<T> GetAll();

        T Get(int id);

        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);

        void Create(T item);

        void Update(T item);

        void Delete(int id);
    }
}
