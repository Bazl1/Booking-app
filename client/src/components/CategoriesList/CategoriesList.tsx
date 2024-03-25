import cabins from "@/shared/assets/img/incons/cabins.jpg";
import treehouses from "@/shared/assets/img/incons/treehouses.jpg";
import beachfront from "@/shared/assets/img/incons/beachfront.jpg";
import tinyhomes from "@/shared/assets/img/incons/tinyhomes.jpg";
import castles from "@/shared/assets/img/incons/castles.jpg";
import farms from "@/shared/assets/img/incons/farms.jpg";
import amazingpools from "@/shared/assets/img/incons/amazingpools.jpg";
import countryside from "@/shared/assets/img/incons/countryside.jpg";
import s from "./CategoriesList.module.scss";

const CategoriesList = () => {
    return (
        <div className={s.catalog__categories}>
            <div className={`${s.catalog__category} ${s.catalog__category_active}`}>
                <img className={s.catalog__category_img} src={cabins} alt="icon" />
                <p className={s.catalog__category_title}>Cabins</p>
            </div>
            <div className={s.catalog__category}>
                <img className={s.catalog__category_img} src={treehouses} alt="icon" />
                <p className={s.catalog__category_title}>Treehouses</p>
            </div>
            <div className={s.catalog__category}>
                <img className={s.catalog__category_img} src={beachfront} alt="icon" />
                <p className={s.catalog__category_title}>Beachfront</p>
            </div>
            <div className={s.catalog__category}>
                <img className={s.catalog__category_img} src={tinyhomes} alt="icon" />
                <p className={s.catalog__category_title}>Tiny homes</p>
            </div>
            <div className={s.catalog__category}>
                <img className={s.catalog__category_img} src={castles} alt="icon" />
                <p className={s.catalog__category_title}>Castles</p>
            </div>
            <div className={s.catalog__category}>
                <img className={s.catalog__category_img} src={farms} alt="icon" />
                <p className={s.catalog__category_title}>Farms</p>
            </div>
            <div className={s.catalog__category}>
                <img className={s.catalog__category_img} src={amazingpools} alt="icon" />
                <p className={s.catalog__category_title}>Amazing pools</p>
            </div>
            <div className={s.catalog__category}>
                <img className={s.catalog__category_img} src={countryside} alt="icon" />
                <p className={s.catalog__category_title}>Countryside</p>
            </div>
        </div>
    );
};

export default CategoriesList;
