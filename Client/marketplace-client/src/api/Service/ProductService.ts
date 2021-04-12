import { IPostProduct } from "../../Interface/IPostProduct";
import { ResponseStatus } from "../../Constant/ResponseStatus"

const productsRequestUrl: string = '/api/products?';
const productRequestUrl: string = '/api/products/'

export default async function GetProductsData(requestParams: string = "") {
    let productData = await fetch(productsRequestUrl + requestParams);

    if (productData.status === ResponseStatus.UNAUTHORIZED) {
        window.location.href = "/account/google-login";
    }

    return await productData.json() || {};
}

export async function GetProductData(productID:number) {
    let productData = await fetch(productRequestUrl + productID);
    return await productData.json();
}

export async function CreateNewProduct(newProduct: FormData) {
    const requestOptions = {
        method: 'POST',
        body: newProduct
    };

    const response = await fetch(productsRequestUrl, requestOptions);
    return response.status;
}

export async function UpdateProduct(productData: FormData) {
    const requestOptions = {
        method: 'PUT',
        body: productData
    };

    const response = await fetch(productsRequestUrl, requestOptions);
    return response.status;
    
}

export async function DeleteProduct(productID: number) {
    const requestOptions = {
        method: 'DELETE',
    };

    const response = await fetch(productRequestUrl + productID, requestOptions);
    return response.status;
}