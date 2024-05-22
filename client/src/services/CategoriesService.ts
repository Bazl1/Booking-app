import $Api from "@/shared/utils/axios";
import { ICategory } from "@/types/ICategory";
import { AxiosResponse } from "axios";

export default class CategoriesService {
    static getCategories(): Promise<AxiosResponse<ICategory[]>> {
        return $Api.get<ICategory[]>("/categories");
    }
}
