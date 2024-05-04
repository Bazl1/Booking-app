import { memo } from "react";
import s from "./CategoryItem.module.scss";
import { useFilterStore } from "@/store";
import { ProductsResponse } from "@/types/response/ProductsResponse";

interface CategoryItemProps {
    text: string;
    icon: string;
    setProducts: (value: ProductsResponse) => void;
}

const CategoryItem = memo(({ text, icon, setProducts }: CategoryItemProps) => {
    const category = useFilterStore((state) => state.category);
    const setCategory = useFilterStore((state) => state.setCategory);
    const search = useFilterStore((state) => state.search);

    const handleOnClick = async () => {
        await setCategory(text);
        await search().then((res: ProductsResponse) => setProducts(res));
    };

    return (
        <div
            className={
                category === text
                    ? `${s.catalog__category_active} ${s.catalog__category}`
                    : `${s.catalog__category}`
            }
            onClick={handleOnClick}
        >
            <img className={s.catalog__category_img} src={icon} alt="icon" />
            <p className={s.catalog__category_title}>{text}</p>
        </div>
    );
});
export default CategoryItem;
