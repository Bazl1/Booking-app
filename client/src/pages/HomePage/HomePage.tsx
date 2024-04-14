import Search from "@/components/Search/Search";
import s from "./HomePage.module.scss";
import { BsSliders } from "react-icons/bs";
import ProductItem from "@/components/ProductItem/ProductItem";
import CategoriesList from "@/components/CategoriesList/CategoriesList";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PopupFilter from "@/components/PopupFilter/PopupFilter";
import ProductsService from "@/services/ProductsService";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader/Loader";
import { IProduct } from "@/types/IProduct";
import Pagination from "@/components/Pagination/Pagination";
import { getMonth } from "@/shared/utils/getMonth";

const HomePage = () => {
    const [activePage, setActivePage] = useState<number>(1);
    const [isFilter, setIsFilter] = useState<boolean>(false);

    const { isLoading, data } = useQuery(["products", activePage], () =>
        ProductsService.getProducts(activePage, 16),
    );

    useEffect(() => {
        getMonth(4);
    }, []);

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
                                data?.data.adverts &&
                                data?.data.adverts.length !== 0 &&
                                data?.data.adverts.map((product: IProduct) => {
                                    return (
                                        <ProductItem
                                            key={product.id}
                                            id={product.id}
                                            images={product.photos}
                                            title={product.name}
                                            pricePerNight={product.pricePerNight}
                                            liked={product.liked}
                                        />
                                    );
                                })
                            )}
                        </div>
                        {data?.data.pageCount && data?.data.pageCount > 0 && (
                            <Pagination
                                pageCount={data?.data.pageCount}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        )}
                    </div>
                </div>
            </section>
            {isFilter && createPortal(<PopupFilter setOpen={setIsFilter} />, document.body)}
        </>
    );
};

export default HomePage;
