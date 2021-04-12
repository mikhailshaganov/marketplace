import { ProductSortAttr } from '../../Constant/ProductSortAttr';
import { SortingDirection } from '../../Constant/SortingDirection';
import { ISortOrder } from '../../Interface/ISortOrder';
import { customHistory } from '../../history';


export function getSortOrdersFromUrl(currentUrl: URLSearchParams = new URLSearchParams()): ISortOrder {
    currentUrl = GetCurrentUrl();
    if (currentUrl.has("sorting")) {
        const sortingParams = currentUrl.get("sorting")?.split("_") || [];

        if (sortingParams.length > 1) {
            return { sortAttr: sortingParams[0] as ProductSortAttr, sortDirection: ("_" + sortingParams[1]) as SortingDirection };
        }
    }

    return { sortAttr: ProductSortAttr.NONE, sortDirection: SortingDirection.ASC };
}

export function getPaginationPageFromUrl(currentUrl: URLSearchParams = new URLSearchParams()): number {
    currentUrl = GetCurrentUrl();
    if (currentUrl.has("page")) {
        const currentPage = currentUrl.get("page") || 1;
        return +currentPage;
    }

    return 1;
}

export function getSearchingStringFromUrl(currentUrl: URLSearchParams = new URLSearchParams()): string {
    currentUrl = GetCurrentUrl();
    if (currentUrl.has("searching")) {
        const searchingString = currentUrl.get("sorting") || "";
        return searchingString;
    }

    return "";
}

function GetCurrentUrl(): URLSearchParams {
    const currentLocation = customHistory.location;
    return new URLSearchParams(currentLocation.search);
}

export function SetCurrentUrl(currentUrlParams: URLSearchParams) {
    const currentLocation = customHistory.location;

    if (!currentLocation.pathname.includes("products")) {
        customHistory.push({ pathname: "/products" })
    }
    
    customHistory.push("?" + currentUrlParams.toString())
}




