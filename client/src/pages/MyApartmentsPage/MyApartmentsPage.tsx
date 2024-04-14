import { Link } from "react-router-dom";
import s from "./MyApartmentsPage.module.scss";
import { FaTrash } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductsService from "@/services/ProductsService";
import Loader from "@/components/Loader/Loader";
import { useUserStore } from "@/store";
import { IProduct } from "@/types/IProduct";

const MyApartmentsPage = () => {
    const [activePage, setActivePage] = useState<number>(1);

    const userId = useUserStore((state) => state.user.id);

    const { isLoading, data } = useQuery(["MyProducts", activePage], () =>
        ProductsService.getMyProducts(userId, activePage, 12),
    );

    if (isLoading) {
        <Loader />;
    }

    return (
        <section className={s.apartments}>
            <div className="container">
                <div className={s.apartments__inner}>
                    <h2 className={s.apartments__title}>My apartments</h2>
                    <Link className={s.apartments__create_btn} to={"/create-product"}>
                        Add apartment
                    </Link>
                    <div className={s.apartments__items}>
                        {data &&
                            data.data.adverts.map((product: IProduct) => {
                                return (
                                    <div key={product.id} className={s.apartments__item}>
                                        <Link
                                            className={s.apartments__link}
                                            to={`/rooms/${product.id}`}
                                        >
                                            <p className={s.apartments__item_id}>
                                                id: <span>{product.id}</span>
                                            </p>
                                            <h3 className={s.apartments__item_title}>
                                                {product.name}
                                            </h3>
                                            <p className={s.apartments__price}>
                                                <span>${product.pricePerNight}</span> night
                                            </p>
                                        </Link>
                                        <div className={s.apartments__btns}>
                                            <button className={s.apartments__btn}>
                                                <FaPencilAlt />
                                            </button>
                                            <button className={s.apartments__btn}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyApartmentsPage;
