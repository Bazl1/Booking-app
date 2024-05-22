import { useEffect, useState } from "react";
import { getMonth } from "@/shared/utils/getMonth";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import ProductsService from "@/services/ProductsService";
import Loader from "@/components/Loader/Loader";
import Day from "@/components/Day/Day";
import { useBigCalendarStore, useUserStore } from "@/store";

import { IProduct } from "@/types/IProduct";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

import styles from "./BookingCalendarPage.module.scss";
import BookingService from "@/services/BookingService";
import { BookedDateResponse } from "@/types/response/BookedDateResponse";

const dayOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const BookingCalendarPage = () => {
    const [month, setMonth] = useState(getMonth());
    const [productId, setProductId] = useState<string>("");
    const [bookedData, setBookedData] = useState<BookedDateResponse>();

    const currentMonth = useBigCalendarStore((state) => state.currentMonth);
    const setCurrentMonth = useBigCalendarStore((state) => state.setMonth);
    const userId = useUserStore((state) => state.user.id);

    const { isLoading, data: myProductsData } = useQuery(["MyProducts"], () =>
        ProductsService.getMyProductsList(userId),
    );

    const handleNext = (e: any) => {
        e.preventDefault();
        setCurrentMonth(currentMonth + 1);
    };

    const handlePrev = (e: any) => {
        e.preventDefault();
        setCurrentMonth(currentMonth - 1);
    };

    const handleReset = (e: any) => {
        e.preventDefault();
        setCurrentMonth(dayjs().month());
    };

    useEffect(() => {
        setMonth(getMonth(currentMonth));
    }, [currentMonth]);

    useEffect(() => {
        if (productId !== "") {
            BookingService.getCalendarBooked(productId, currentMonth + 1, 2024).then((res) =>
                setBookedData(res.data),
            );
        }
    }, [productId, currentMonth]);

    if (isLoading) {
        <Loader />;
    }

    return (
        <section className={styles.booking}>
            <div className="container-fluid">
                <div className={styles.booking__inner}>
                    <div className={styles.booking__top}>
                        <h2 className={styles.booking__title}>Booking Calendar</h2>
                        <h3 className={styles.booking__date}>
                            {dayjs(new Date(dayjs().year(), currentMonth)).format("MMMM YYYY")}
                        </h3>
                        <button
                            className={styles.booking__btn_outline}
                            onClick={(e) => handleReset(e)}
                        >
                            Today
                        </button>
                        <div className={styles.booking__btns}>
                            <button className={styles.booking__btn} onClick={(e) => handlePrev(e)}>
                                <FaChevronLeft />
                            </button>
                            <button className={styles.booking__btn} onClick={(e) => handleNext(e)}>
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                    <div className={styles.booking__row}>
                        <div className={styles.booking__columns}>
                            <h3 className={styles.booking__subtitle}>Select your product</h3>
                            <div className={styles.booking__products}>
                                {myProductsData?.data &&
                                    myProductsData.data.adverts &&
                                    myProductsData.data.adverts.length > 0 &&
                                    myProductsData.data.adverts.map((item: IProduct) => {
                                        return (
                                            <button
                                                key={item.id}
                                                className={styles.booking__product}
                                                onClick={() => setProductId(item.id)}
                                            >
                                                <div
                                                    className={
                                                        productId === item.id
                                                            ? `${styles.booking__checkbox} ${styles.booking__checkbox_active}`
                                                            : `${styles.booking__checkbox}`
                                                    }
                                                />
                                                <div className={styles.booking__product_text}>
                                                    {item.name}
                                                </div>
                                            </button>
                                        );
                                    })}
                            </div>
                        </div>
                        <div className={styles.booking__columns}>
                            <div className={styles.booking__head}>
                                {dayOfWeek.map((day: string, i: number) => {
                                    return (
                                        <div key={i} className={styles.booking__head_day}>
                                            {day}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={styles.booking__calendar}>
                                {month.map((row: any, i: number) => {
                                    return (
                                        <div key={i} className={styles.booking__calendar_row}>
                                            {row.map((day: any, i: number) => {
                                                const booked = bookedData?.dates.find(
                                                    (item) => item.date === day.format("DD/MM/YY"),
                                                );
                                                return (
                                                    <Day
                                                        key={i}
                                                        day={day}
                                                        bookedDate={booked || ""}
                                                    />
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingCalendarPage;
