import s from "./Pagination.module.scss";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

interface PaginationProps {
    pageCount: number;
    activePage: number;
    setActivePage: (value: number) => void;
}

const Pagination = ({ pageCount, activePage, setActivePage }: PaginationProps) => {
    const handlePrev = () => {
        if (activePage > 0) {
            setActivePage(activePage - 1);
        }
    };

    const handleNext = () => {
        if (activePage < pageCount - 1) {
            setActivePage(activePage + 1);
        }
    };

    return (
        <div className={s.pagination}>
            <button className={s.pagination__btn} onClick={handlePrev}>
                <FaChevronLeft />
            </button>
            <div className={s.pagination__items}>
                {Array.from({ length: pageCount }, (_, index) => (
                    <div
                        key={index}
                        className={
                            activePage == index
                                ? `${s.pagination__item} ${s.pagination__item_active}`
                                : `${s.pagination__item}`
                        }
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <button className={s.pagination__btn} onClick={handleNext}>
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
