import { Link } from "react-router-dom";
import userImg from "@/shared/assets/img/user.png";
import { IoPeopleSharp } from "react-icons/io5";
import { IoIosPricetags } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { TbBrandDaysCounter } from "react-icons/tb";
import { FaExternalLinkAlt } from "react-icons/fa";
import styles from "./MyOrdersPage.module.scss";
import BookingService from "@/services/BookingService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IOrderProduct } from "@/types/IOrderProduct";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

const MyOrdersPage = () => {
    const [data, setData] = useState<IOrderProduct[]>();

    const queryClient = useQueryClient();
    const { isLoading, data: responseData } = useQuery(["products"], () =>
        BookingService.getMyOrders(),
    );

    const handleAccept = async (id: string) => {
        try {
            await BookingService.acceptOrder(id);
            queryClient.invalidateQueries(["products"]);
        } catch (error) {
            toast.error("Acceptance error");
        }
    };

    const handleReject = async (id: string) => {
        try {
            await BookingService.rejectOrder(id);
            queryClient.invalidateQueries(["products"]);
        } catch (error) {
            toast.error("Rejected error");
        }
    };

    useEffect(() => {
        setData(responseData?.data.reservations);
    }, [responseData]);

    if (isLoading) {
        <Loader />;
    }

    return (
        <section className={styles.order}>
            <div className="container">
                <div className={styles.order__inner}>
                    <h2 className={styles.order__title}>My orders</h2>
                    <div className={styles.order__items}>
                        {data &&
                            data.length > 0 &&
                            data.map((item: IOrderProduct) => {
                                return (
                                    <div key={item.id} className={styles.order__item}>
                                        <div className={styles.order__top}>
                                            <img
                                                className={styles.order__poster}
                                                src={item.poster}
                                                alt="poster"
                                            />
                                            <h3 className={styles.order__item_title}>
                                                {item.title}
                                            </h3>
                                            <Link
                                                className={styles.order__link}
                                                to={`/rooms/${item.advertId}`}
                                            >
                                                <FaExternalLinkAlt />
                                            </Link>
                                        </div>
                                        <div className={styles.order__bottom}>
                                            {item.author?.avatar !== "" ? (
                                                <img
                                                    className={styles.order__user_img}
                                                    src={item.author?.avatar}
                                                    alt="img"
                                                />
                                            ) : (
                                                <img
                                                    className={styles.order__user_img}
                                                    src={userImg}
                                                    alt="img"
                                                />
                                            )}

                                            <div className={styles.order__user_box}>
                                                <h4 className={styles.order__user_title}>
                                                    {item.author.name}
                                                </h4>
                                                <div className={styles.order__number}>
                                                    {item.author.phoneNumber}
                                                </div>
                                            </div>
                                            <div className={styles.order__columns}>
                                                <div className={styles.order__count}>
                                                    <FaCalendarAlt />
                                                    {item.startDate} <span>-</span> {item.endDate}
                                                </div>
                                                <div className={styles.order__count}>
                                                    <TbBrandDaysCounter /> <span>days:</span>{" "}
                                                    {item.numberOfDays}
                                                </div>
                                            </div>
                                            <div className={styles.order__columns}>
                                                <div className={styles.order__count}>
                                                    <IoPeopleSharp /> <span>number of people</span>
                                                    {item.numberOfPeople}
                                                </div>
                                                <div className={styles.order__count}>
                                                    <IoIosPricetags />
                                                    <span>cost</span>${item.cost}
                                                </div>
                                            </div>
                                            <div className={styles.order__btns}>
                                                <button
                                                    className={`${styles.order__btn} ${styles.order__btn_accept}`}
                                                    onClick={() => handleAccept(item.id)}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className={`${styles.order__btn} ${styles.order__btn_reject} `}
                                                    onClick={() => handleReject(item.id)}
                                                >
                                                    Reject
                                                </button>
                                            </div>
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

export default MyOrdersPage;
