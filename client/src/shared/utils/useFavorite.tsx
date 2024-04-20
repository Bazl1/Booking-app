import ProductsService from "@/services/ProductsService";
import { useUserStore } from "@/store";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useHandleFavorite = (id: string) => {
    const isAuth = useUserStore((store) => store.isAuth);

    const queryClient = useQueryClient();

    const handleFavorite = async () => {
        if (isAuth) {
            const response = await ProductsService.toggleFavorite(id);
            queryClient.invalidateQueries(["products"]);
            queryClient.invalidateQueries(["favorites"]);
            if (response.data.result) {
                toast.success("The product has been successfully added to your favorites");
            } else {
                toast.success("The product has been successfully removed from favorites");
            }
            return response.data.result;
        } else {
            toast.error("Authorize to add the product to your favorites ");
            return;
        }
    };

    return handleFavorite;
};

export default useHandleFavorite;
