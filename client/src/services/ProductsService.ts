import $Api from "@/shared/utils/axios";

export default class ProductsService {
    static createProduct() {
        return $Api.post("");
    }
}
