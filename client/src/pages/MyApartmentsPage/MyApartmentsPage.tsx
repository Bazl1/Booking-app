import { Link, useNavigate } from "react-router-dom";
import s from "./MyApartmentsPage.module.scss";
import { FaTrash } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ProductsService from "@/services/ProductsService";
import Loader from "@/components/Loader/Loader";
import { useUserStore } from "@/store";
import { IProduct } from "@/types/IProduct";
import toast from "react-hot-toast";
import Pagination from "@/components/Pagination/Pagination";

const MyApartmentsPage = () => {
    const [activePage, setActivePage] = useState<number>(1);

    const userId = useUserStore((state) => state.user.id);

    const queryClient = useQueryClient();
    const { isLoading, data } = useQuery(["MyProducts", activePage], () =>
        ProductsService.getMyProducts(userId, activePage, 12),
    );

    const navigate = useNavigate();

    const handleDeleteProduct = async (id: string) => {
        try {
            await ProductsService.deleteProduct(id);
            queryClient.invalidateQueries(["MyProducts", activePage]);
            toast.success("The product has been successfully removed");
        } catch (error: any) {
            throw Error(error.message);
        }
    };

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
                                            <button
                                                className={s.apartments__btn}
                                                onClick={() =>
                                                    navigate(`/change-product/${product.id}`)
                                                }
                                            >
                                                <FaPencilAlt />
                                            </button>
                                            <button
                                                className={s.apartments__btn}
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
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

export default MyApartmentsPage;
