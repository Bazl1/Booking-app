import { memo } from "react";
import s from "./CategoryItem.module.scss";

interface CategoryItemProps {
    text: string;
    icon: string;
    active?: boolean;
}

const CategoryItem = memo(({ text, icon, active = false }: CategoryItemProps) => {
    return (
        <div
            className={
                active
                    ? `${s.catalog__category_active} ${s.catalog__category}`
                    : `${s.catalog__category}`
            }
        >
            <img className={s.catalog__category_img} src={icon} alt="icon" />
            <p className={s.catalog__category_title}>{text}</p>
        </div>
    );
});
export default CategoryItem;
