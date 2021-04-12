import { IStuff } from "./IStuff";

export interface ISettingResponseParams {
    setRequestParams: (requestParams: string) => void 
    products: IStuff[];
    paginationCount: number;
}