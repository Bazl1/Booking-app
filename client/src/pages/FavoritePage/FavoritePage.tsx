import { useQuery } from "@tanstack/react-query";
import s from "./FavoritePage.module.scss";
import ProductsService from "@/services/ProductsService";
import Loader from "@/components/Loader/Loader";
import { IProduct } from "@/types/IProduct";
import ProductItem from "@/components/ProductItem/ProductItem";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import Pagination from "@/components/Pagination/Pagination";

const FavoritePage = () => {
    const [activePage, setActivePage] = useState<number>(1);

    const { isLoading, data } = useQuery(["favorites", activePage], () =>
        ProductsService.getFavorites(activePage, 12),
    );

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className={s.favorite}>
            <div className="container">
                <div className={s.favorite__inner}>
                    <h2 className={s.favorite__title}>
                        <FaStar /> My Favorite <FaStar />
                    </h2>
                    <div className={s.favorite__items}>
                        {data &&
                            data.data.adverts.map((item: IProduct) => {
                                return (
                                    <ProductItem
                                        key={item.id}
                                        id={item.id}
                                        title={item.name}
                                        pricePerNight={item.pricePerNight}
                                        images={item.photos}
                                        liked={item.liked}
                                    />
                                );
                            })}
                    </div>
                    <Pagination
                        activePage={activePage}
                        setActivePage={setActivePage}
                        pageCount={data?.data.pageCount || 0}
                    />
                </div>
            </div>
        </section>
    );
};

export default FavoritePage;
