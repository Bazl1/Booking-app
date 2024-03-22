import Search from "@/components/Search/Search";
import s from "./HomePage.module.scss";
import { BsSliders } from "react-icons/bs";
import ProductItem from "@/components/ProductItem/ProductItem";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import { useState } from "react";
import { createPortal } from "react-dom";
import PopupFilter from "@/components/PopupFilter/PopupFilter";

const HomePage = () => {
    const [isFilter, setIsFilter] = useState<boolean>(false);

    return (
        <>
            <section className={s.search}>
                <div className="container">
                    <div className={s.search__inner}>
                        <Search />
                    </div>
                </div>
            </section>
            <section className={s.catalog}>
                <div className="container">
                    <div className={s.catalog__inner}>
                        <div className={s.catalog__top}>
                            <CategoriesList />
                            <button
                                onClick={() => setIsFilter(true)}
                                className={s.catalog__filtres}
                            >
                                <BsSliders />
                                Filtres
                            </button>
                        </div>
                        <div className={s.catalog__items}>
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                            <ProductItem />
                        </div>
                        <button className={s.catalog__more}>Show more</button>
                    </div>
                </div>
            </section>
            {isFilter && createPortal(<PopupFilter setOpen={setIsFilter} />, document.body)}
        </>
    );
};

export default HomePage;
