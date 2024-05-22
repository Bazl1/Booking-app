import { useEffect, useState } from "react";
import { IOrderProduct } from "@/types/IOrderProduct";
import { useQuery } from "@tanstack/react-query";
import BookingService from "@/services/BookingService";
import Loader from "@/components/Loader/Loader";
import { MdOutlineRateReview } from "react-icons/md";
import styles from "./HistoryPage.module.scss";
import PopupReviews from "@/components/PopupReviews/PopupReviews";
import { createPortal } from "react-dom";

const HistoryPage = () => {
    const [data, setData] = useState<IOrderProduct[]>();
    const [open, setOpen] = useState<boolean>(false);
    const [productId, setProductId] = useState<string>("");

    const { isLoading, data: historyData } = useQuery(["products"], () =>
        BookingService.getMyHistory(),
    );

    const handleStatus = (status: string) => {
        if (status === "Waiting") {
            return `${styles.history__status} ${styles.history__status_waiting}`;
        } else if (status === "Accepted") {
            return `${styles.history__status} ${styles.history__status_accept}`;
        } else if (status === "Rejected") {
            return `${styles.history__status} ${styles.history__status_reject}`;
        }
    };

    useEffect(() => {
        setData(historyData?.data.reservations);
    }, [historyData]);

    if (isLoading) {
        <Loader />;
    }

    return (
        <>
            <section className={styles.history}>
                <div className="container">
                    <div className={styles.history__inner}>
                        <h2 className={styles.history__title}>My history</h2>
                        <div className={styles.history__items}>
                            {data &&
                                data.length > 0 &&
                                data.map((item: IOrderProduct) => {
                                    return (
                                        <div key={item.id} className={styles.history__item}>
                                            <img
                                                className={styles.history__poster}
                                                src={item.poster}
                                                alt="poster"
                                            />
                                            <div className={styles.history__columns}>
                                                <h3 className={styles.history__item_title}>
                                                    {item.title}
                                                </h3>
                                                <div className={styles.history__cost}>
                                                    ${item.cost}
                                                </div>
                                            </div>
                                            <div className={styles.history__row}>
                                                {item.status === "Accepted" && (
                                                    <button
                                                        className={styles.history__review_btn}
                                                        onClick={() => {
                                                            setProductId(item.advertId);
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        <MdOutlineRateReview />
                                                    </button>
                                                )}
                                                <div className={`${handleStatus(item.status)}`}>
                                                    {item.status}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </section>
            {open && createPortal(<PopupReviews setOpen={setOpen} id={productId} />, document.body)}
        </>
    );
};

export default HistoryPage;
