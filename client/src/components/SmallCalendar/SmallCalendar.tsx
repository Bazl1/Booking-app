import { useEffect, useState } from "react";
import s from "./SmallCalendar.module.scss";
import { getMonth } from "@/shared/utils/getMonth";
import { useCalendarStore } from "@/store";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";

interface SmallCalendarProps {
    setStartDate?: (value: number) => void;
    setEndDate?: (value: number) => void;
}

const dayOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const test = ["01/04/24", "07/04/24", "10/04/24"];

const SmallCalendar = ({ setStartDate, setEndDate }: SmallCalendarProps) => {
    const [month, setMonth] = useState(getMonth());

    const currentMonth = useCalendarStore((state) => state.currentMonth);
    const setCurrentMonth = useCalendarStore((state) => state.setMonth);

    const getPreviousDays = (day: any) => {
        const classNames: string[] = [];
        if (day.format("MM") !== dayjs(new Date(dayjs().year(), currentMonth)).format("MM")) {
            classNames.push(`${s.calendar__previous}`);
        }
        if (day.isBefore(dayjs())) {
            classNames.push(`${s.calendar__close}`);
        }
        const className: string = classNames.join(" ");
        return className;
    };

    const getCurrentDay = (day: any) => {
        if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
            return `${s.calendar__day} ${s.calendar__day_current}`;
        } else {
            return `${s.calendar__day}`;
        }
    };

    const getBooked = (day: any) => {
        if (test.some((item: string) => item === day.format("DD/MM/YY"))) {
            return `${s.calendar__close}`;
        }
        return;
    };

    const handleNext = (e: any) => {
        e.preventDefault();
        setCurrentMonth(currentMonth + 1);
    };

    const handlePrev = (e: any) => {
        e.preventDefault();
        setCurrentMonth(currentMonth - 1);
    };

    useEffect(() => {
        setMonth(getMonth(currentMonth));
    }, [currentMonth]);

    return (
        <div className={s.calendar}>
            <div className={s.calendar__box}>
                <div className={s.calendar__text_box}>
                    <h3 className={s.calendar__title}>
                        {dayjs(new Date(dayjs().year(), currentMonth)).format("MMMM YYYY")}
                    </h3>
                    <p className={s.calendar__text}>
                        To see the exact price, please specify your travel dates
                    </p>
                </div>
                <div className={s.calendar__btns}>
                    <div className={s.calendar__btn} onClick={(e) => handlePrev(e)}>
                        <FaChevronLeft />
                    </div>
                    <div className={s.calendar__btn} onClick={(e) => handleNext(e)}>
                        <FaChevronRight />
                    </div>
                </div>
            </div>
            <div className={s.calendar__head}>
                {dayOfWeek.map((day: string, i) => {
                    return (
                        <div key={i} className={s.calendar__head_day}>
                            {day}
                        </div>
                    );
                })}
            </div>
            {month.map((row, i) => {
                return (
                    <div key={i} className={s.calendar__row}>
                        {row.map((day, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`${getCurrentDay(day)} ${getPreviousDays(day)} ${getBooked(day)}`}
                                    onClick={() => console.log("click")}
                                >
                                    {day.format("D")}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default SmallCalendar;
