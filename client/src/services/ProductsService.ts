import $Api from "@/shared/utils/axios";

export default class ProductsService {
    static createProduct(data: FormData) {
        return $Api.post("/adverts", data);
    }
}
