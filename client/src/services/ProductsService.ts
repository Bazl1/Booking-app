import $Api from "@/shared/utils/axios";
import { IProduct } from "@/types/IProduct";
import { ProductsResponse } from "@/types/response/ProductsResponse";
import { AxiosResponse } from "axios";

export default class ProductsService {
    static createProduct(data: FormData): Promise<AxiosResponse<IProduct>> {
        return $Api.post<IProduct>("/adverts", data);
    }

    static getProducts(page: number, limit: number): Promise<AxiosResponse<ProductsResponse>> {
        return $Api.get<ProductsResponse>(`/adverts?page=${page}&limit=${limit}`);
    }

    static getProductById(id: string): Promise<AxiosResponse<IProduct>> {
        return $Api.get<IProduct>(`/adverts/${id}`);
    }

    static toggleFavorite(id: string): Promise<AxiosResponse<{ result: boolean }>> {
        return $Api.put<{ result: boolean }>(`/adverts/${id}/like`);
    }

    static getFavorites(): Promise<AxiosResponse<ProductsResponse>> {
        return $Api.get<ProductsResponse>("/favorites");
    }
}
