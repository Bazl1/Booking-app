import { IProduct } from "../IProduct";

export interface ProductsResponse {
    adverts: IProduct[];
    pageCount: number;
}
