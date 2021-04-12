import { ProductSortAttr } from "../Constant/ProductSortAttr";
import { SortingDirection } from "../Constant/SortingDirection";

export interface ISortOrder {
    sortAttr: ProductSortAttr,
    sortDirection: SortingDirection,
}