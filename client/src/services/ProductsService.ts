import $Api from "@/shared/utils/axios";
import { IProduct } from "@/types/IProduct";
import { AxiosResponse } from "axios";

export default class ProductsService {
    static createProduct(data: FormData): Promise<AxiosResponse<IProduct>> {
        return $Api.post<IProduct>("/adverts", data);
    }

    static getProducts(page: number, limit: number) {
        return $Api.get(`/adverts?page=${page}&limit=${limit}`);
    }
}
