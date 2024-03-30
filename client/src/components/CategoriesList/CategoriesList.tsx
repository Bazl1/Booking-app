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

const CategoriesList = () => {
    return (
        <div className={s.catalog__categories}>
            <CategoryItem text="Cabins" icon={cabins} active={true} />
            <CategoryItem text="Treehouses" icon={treehouses} />
            <CategoryItem text="Beachfront" icon={beachfront} />
            <CategoryItem text="Tiny homes" icon={tinyhomes} />
            <CategoryItem text="Castles" icon={castles} />
            <CategoryItem text="Farms" icon={farms} />
            <CategoryItem text="Amazing pools" icon={amazingpools} />
            <CategoryItem text="Countryside" icon={countryside} />
        </div>
    );
};

export default CategoriesList;
