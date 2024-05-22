import s from "./CategoriesList.module.scss";
import CategoryItem from "../CategoryItem/CategoryItem";
import { ProductsResponse } from "@/types/response/ProductsResponse";
import { ICategory } from "@/types/ICategory";
import CategoriesService from "@/services/CategoriesService";
import { useEffect, useState } from "react";

interface CategoriesListProps {
    setProducts: (value: ProductsResponse) => void;
}

const CategoriesList = ({ setProducts }: CategoriesListProps) => {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        CategoriesService.getCategories().then((res) => setCategories(res.data));
    }, []);

    return (
        <div className={s.catalog__categories}>
            {categories &&
                categories.map((category: ICategory) => {
                    return (
                        <CategoryItem
                            key={category.id}
                            id={category.id}
                            text={category.name}
                            icon={category.icon}
                            setProducts={setProducts}
                        />
                    );
                })}
        </div>
    );
};

export default CategoriesList;
