import { ProductSortAttr } from "../Constant/ProductSortAttr";
import { SortingDirection } from "../Constant/SortingDirection";
import { ISortOrder } from "./ISortOrder";

export interface IFilteringGroup {
    sortOrder: ISortOrder;
    setSortOrder: (sortAttr: ProductSortAttr, sortDirection: SortingDirection) => void;
    setPaginationPage: (pageNumber: number) => void

}