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
import { ProductsResponse } from "@/types/response/ProductsResponse";

const HomePage = () => {
    const [activePage, setActivePage] = useState<number>(1);
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductsResponse>();

    const { isLoading, data } = useQuery(["products", activePage], () =>
        ProductsService.getProducts(activePage, 16),
    );

    useEffect(() => {
        getMonth(4);
    }, []);

    useEffect(() => {
        setProducts(data?.data);
    }, [isLoading]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <section className={s.search}>
                <div className="container">
                    <div className={s.search__inner}>
                        <Search setProducts={setProducts} />
                    </div>
                </div>
            </section>
            <section className={s.catalog}>
                <div className="container">
                    <div className={s.catalog__inner}>
                        <div className={s.catalog__top}>
                            <CategoriesList setProducts={setProducts} />
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
                                products?.adverts &&
                                products?.adverts.length !== 0 &&
                                products?.adverts.map((product: IProduct) => {
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
                        {products?.pageCount && products?.pageCount > 0 ? (
                            <Pagination
                                pageCount={products?.pageCount}
                                activePage={activePage}
                                setActivePage={setActivePage}
                            />
                        ) : null}
                    </div>
                </div>
            </section>
            {isFilter &&
                createPortal(
                    <PopupFilter setOpen={setIsFilter} setProducts={setProducts} />,
                    document.body,
                )}
        </>
    );
};

export default HomePage;
