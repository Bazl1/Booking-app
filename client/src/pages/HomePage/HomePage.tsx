import Search from "@/components/Search/Search";
import s from "./HomePage.module.scss";
import { BsSliders } from "react-icons/bs";
import ProductItem from "@/components/ProductItem/ProductItem";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import { useState } from "react";
import { createPortal } from "react-dom";
import PopupFilter from "@/components/PopupFilter/PopupFilter";
import ProductsService from "@/services/ProductsService";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";
import { IProduct } from "@/types/IProduct";
import Pagination from "@/components/Pagination/Pagination";

const HomePage = () => {
    const [activePage, setActivePage] = useState<number>(0);
    const [isFilter, setIsFilter] = useState<boolean>(false);

    const { isLoading, data } = useQuery(["products"], () =>
        ProductsService.getProducts(activePage, 16),
    );

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
                            {isLoading ? (
                                <Loader />
                            ) : (
                                data &&
                                data?.data &&
                                data?.data.map((product: IProduct) => {
                                    return <ProductItem key={product.id} />;
                                })
                            )}
                        </div>
                        <Pagination
                            pageCount={10}
                            activePage={activePage}
                            setActivePage={setActivePage}
                        />
                    </div>
                </div>
            </section>
            {isFilter && createPortal(<PopupFilter setOpen={setIsFilter} />, document.body)}
        </>
    );
};

export default HomePage;
