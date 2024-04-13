import ProductsService from "@/services/ProductsService";
import { useUserStore } from "@/store";
import toast from "react-hot-toast";

const useHandleFavorite = (id: string) => {
    const isAuth = useUserStore((store) => store.isAuth);

    const handleFavorite = async () => {
        if (isAuth) {
            const response = await ProductsService.toggleFavorite(id);
            toast.success("The product has been successfully added to your favorites");
            return response.data.result;
        } else {
            toast.error("Authorize to add the product to your favorites ");
            return;
        }
    };

    return handleFavorite;
};

export default useHandleFavorite;
