import { createContext, useContext } from 'react';
import ProductCartStore from './ProductCartStore';
import ProductCatalogStore from './ProductCatalogStore';

export default class RootStore {
  productCartStore = new ProductCartStore(this);
  productCatalogStore = new ProductCatalogStore(this);
}

export const StoreContext = createContext(new RootStore());

export const useRootStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
      throw new Error("useRootStore must be used within RootStoreProvider");
  }

  return context;
};

export const useProductCartStore = () => {
  const { productCartStore } = useRootStore();

  return productCartStore;
};

export const useProductCatalogStore = () => {
  const { productCatalogStore } = useRootStore();

  return productCatalogStore;
};