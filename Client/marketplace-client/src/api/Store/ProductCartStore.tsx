import { makeAutoObservable } from 'mobx';
import { computedFn } from 'mobx-utils';
import { ICartProducts } from '../../Interface/ICartProducts';
import addCartProduct, { cartProducts, changeCartProductQuantity, countCartProducts, removeCartProduct, totalPrice } from '../Service/CartProductService';
import RootStore from './RootStore';


export default class ProductCartStore {
    rootStore: RootStore;
    cartCount: number = countCartProducts();
    cartSumPrice: number = totalPrice();
    cartProducts: ICartProducts[] = cartProducts();
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    addProduct(cartProduct: ICartProducts) {
        addCartProduct(cartProduct);
        this.updateCartData();
    }

    changeCartProducts(productID: number, quantity: number, fromField: boolean = false) {
        changeCartProductQuantity(productID, quantity, fromField);
        this.updateCartData();
    }

    removeCartItem(productID: number) {
        removeCartProduct(productID);
        this.updateCartData();
    }

    updateCartData() {
        this.cartProducts = cartProducts();
        this.cartCount = countCartProducts();
        this.cartSumPrice = totalPrice();
    }

    isInCart = computedFn((productID: number) => {
        return this.cartProducts.findIndex(p => p.productID === productID) !== -1;
    })
    

}