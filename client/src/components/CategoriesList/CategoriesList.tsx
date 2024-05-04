import cabins from "@/shared/assets/img/incons/cabins.jpg";
import treehouses from "@/shared/assets/img/incons/treehouses.jpg";
import beachfront from "@/shared/assets/img/incons/beachfront.jpg";
import tinyhomes from "@/shared/assets/img/incons/tinyhomes.jpg";
import castles from "@/shared/assets/img/incons/castles.jpg";
import farms from "@/shared/assets/img/incons/farms.jpg";
import amazingpools from "@/shared/assets/img/incons/amazingpools.jpg";
import countryside from "@/shared/assets/img/incons/countryside.jpg";
import s from "./CategoriesList.module.scss";
import CategoryItem from "../CategoryItem/CategoryItem";
import { ProductsResponse } from "@/types/response/ProductsResponse";

interface CategoriesListProps {
    setProducts: (value: ProductsResponse) => void;
}

const CategoriesList = ({ setProducts }: CategoriesListProps) => {
    return (
        <div className={s.catalog__categories}>
            <CategoryItem text="Cabins" icon={cabins} setProducts={setProducts} />
            <CategoryItem text="Treehouses" icon={treehouses} setProducts={setProducts} />
            <CategoryItem text="Beachfront" icon={beachfront} setProducts={setProducts} />
            <CategoryItem text="Tiny homes" icon={tinyhomes} setProducts={setProducts} />
            <CategoryItem text="Castles" icon={castles} setProducts={setProducts} />
            <CategoryItem text="Farms" icon={farms} setProducts={setProducts} />
            <CategoryItem text="Amazing pools" icon={amazingpools} setProducts={setProducts} />
            <CategoryItem text="Countryside" icon={countryside} setProducts={setProducts} />
        </div>
    );
};

export default CategoriesList;
