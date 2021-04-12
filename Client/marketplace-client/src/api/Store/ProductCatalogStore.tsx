import { makeAutoObservable, runInAction } from 'mobx';
import { LoadStatus } from '../../Constant/LoadingStatus';
import { ProductSortAttr } from '../../Constant/ProductSortAttr';
import { ISortOrder } from '../../Interface/ISortOrder';
import { IStuff } from '../../Interface/IStuff';
import GetProductsData from '../Service/ProductService';
import { getPaginationPageFromUrl, getSearchingStringFromUrl, getSortOrdersFromUrl, SetCurrentUrl } from '../Service/UrlService';
import RootStore from './RootStore';
import { TimeoutConstant } from '../../Constant/TimeoutConstant'

export default class ProductCatalogStore {
    rootStore: RootStore;
    paginationPage: number = getPaginationPageFromUrl();
    sortOrder: ISortOrder = getSortOrdersFromUrl();
    searchingString: string = getSearchingStringFromUrl();
    productsDTO: IStuff[] = [];
    paginationCount: number = 1;
    loadingStatus: LoadStatus = LoadStatus.NEVER;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    changePaginationPage(currentPage: number) {
        this.paginationPage = currentPage;
        this.updateData();
    }

    changeSortOrder(sortOrder: ISortOrder) {
        this.sortOrder = sortOrder;
        this.updateData();
    }

    changeSearchingString(searchingString: string) {
        this.searchingString = searchingString;
        this.updateData();
    }

    changeProductDTO(productDTO: IStuff[]) {
        this.productsDTO = productDTO;
    }

    changePaginationCount(paginationCount: number) {
        this.paginationCount = paginationCount
    }

    changeLoadingState(loadingState: LoadStatus) {
        this.loadingStatus = loadingState;
    }

    get currentRequestParams() {
        const urlParams = new URLSearchParams();
        if (this.searchingString !== "") {
            urlParams.set("searching", this.searchingString);
        }

        if (this.sortOrder?.sortAttr !== ProductSortAttr.NONE) {
            urlParams.set("sorting", this.sortOrder.sortAttr + this.sortOrder.sortDirection);
        }

        if (this.paginationPage !== 1) {
            urlParams.set("page", `${this.paginationPage}`);
        } 

        return urlParams;
    }

    updateData() {
        SetCurrentUrl(this.currentRequestParams);
        this.changeProductDTO([]);
        this.changeLoadingState(LoadStatus.LOADING);

        const getProductsData = async () => {
            try {
                const productsData = await GetProductsData(this.currentRequestParams.toString());
                runInAction(() => {
                    this.changeProductDTO(productsData['productsDTO']);
                    this.changePaginationCount(+productsData.paginationCount);
                    this.changeLoadingState(LoadStatus.LOADED);
                })
            } catch (error) {
                runInAction(() => {
                    this.changeProductDTO([]);
                    this.changeLoadingState(LoadStatus.ERROR);
                    console.log("Something wrong:" + error.message);
                    console.log("Error status: " + error.status);
                })
            }
        }

        setTimeout(() => {
            getProductsData();
        }, TimeoutConstant.LOADING)
    }
}