import { ICartProducts } from "../../Interface/ICartProducts";

export default function addCartProduct(cartProduct: ICartProducts) {
    const cartStuffs = cartProducts();
    const cartStuff = cartStuffs.findIndex(p => p.productID === cartProduct.productID);

    if (cartStuff !== -1) {
        let cartStuffQuantity: number = cartStuffs[cartStuff].quantity + cartProduct.quantity
        cartStuffs[cartStuff].quantity =  cartStuffQuantity > +cartStuffs[cartStuff].inStock ? +cartStuffs[cartStuff].inStock : cartStuffQuantity;
    } else {
        cartStuffs.push(cartProduct);
    }

    localStorage.setItem('cartProducts', JSON.stringify(cartStuffs));
}

export function cartProducts(): ICartProducts[] { 
   return JSON.parse(localStorage.getItem('cartProducts') || '[]');
}

export function isProductInCart(productID: number): boolean {
    return cartProducts().findIndex(p => p.productID === productID) !== -1;
}

export function totalPrice() {
    return cartProducts().reduce((total, product) => total + product.price * product.quantity, 0)
}

export function removeCartProduct(productID: number) {
    const cartStuffs = cartProducts();
    localStorage.setItem('cartProducts', JSON.stringify(cartStuffs.filter(p => p.productID !== productID)));
}

export function countCartProducts() {
    return cartProducts().reduce((countProduct, product) => countProduct + product.quantity, 0)
}

export function changeCartProductQuantity(productID: number, quantity: number, fromField: boolean = false) {
    const cartStuffs = cartProducts();
    const cartStuff = cartStuffs.findIndex(p => p.productID === productID);

    if(cartStuff !== -1) {
        const cartStuffQuantity: number = fromField ? quantity : +cartStuffs[cartStuff].quantity + quantity;

        if (cartStuffQuantity < 1) {
            cartStuffs[cartStuff].quantity = 1;
        } else {
            if (cartStuffQuantity > +cartStuffs[cartStuff].inStock) {
                cartStuffs[cartStuff].quantity = +cartStuffs[cartStuff].inStock;
            } else {
                cartStuffs[cartStuff].quantity = cartStuffQuantity;
            }
        }

        cartStuffs[cartStuff].amount = cartStuffs[cartStuff].price * cartStuffs[cartStuff].quantity;
        localStorage.setItem('cartProducts', JSON.stringify(cartStuffs));
    }
}
