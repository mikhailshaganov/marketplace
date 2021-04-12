import React, { useEffect } from 'react';
import { Switch, Route, Redirect, withRouter, useLocation } from 'react-router-dom'
import {Catalog} from '../Pages/Catalog';
import {Cart} from '../Pages/Cart';
import ProductCard from '../Pages/ProductCard'
import ManagementProductsPage from './ManagementProductsPage';
import ProductUpdatingPage from './ManagementProductUpdatingPage';

function _ScrollToTop(props: any) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return props.children
}

const ScrollToTop = withRouter(_ScrollToTop)

export default function Main () {

  return (
    <main style={{ marginTop: 60 }}>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={() => <Catalog  />} />
          <Route exact path='/products' component={() => <Catalog  />} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/products/:productID(\d+)' component={() => <ProductCard />} />
          <Route exact path='/management/products' component={() => <ManagementProductsPage />} />
          <Route exact path='/management/products/create' component={() => <ProductUpdatingPage />} />
          <Route exact path='/management/products/editing/:productID(\d+)' component={() => <ProductUpdatingPage />} /> 
          <Redirect from='/' to='/products' />
        </Switch>
      </ScrollToTop>
    </main>)
}

