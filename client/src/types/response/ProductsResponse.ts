import { IProduct } from "../IProduct";

export interface ProductsResponse {
    products: IProduct[];
    pageCount: number;
}
