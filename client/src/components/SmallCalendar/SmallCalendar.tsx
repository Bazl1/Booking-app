import { useEffect, useState } from "react";
import s from "./SmallCalendar.module.scss";
import { getMonth } from "@/shared/utils/getMonth";
import { useCalendarStore } from "@/store";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import dayjs from "dayjs";

interface SmallCalendarProps {
    setStartDate: (value: any) => void;
    setEndDate: (value: any) => void;
    startDate: any;
    endDate: any;
    setOpen: (value: boolean) => void;
    booked: string[];
}

const dayOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const SmallCalendar = ({
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    setOpen,
    booked,
}: SmallCalendarProps) => {
    const [month, setMonth] = useState(getMonth());

    const currentMonth = useCalendarStore((state) => state.currentMonth);
    const setCurrentMonth = useCalendarStore((state) => state.setMonth);

    const getPreviousDays = (day: any) => {
        const classNames: string[] = [];
        if (day.format("MM") !== dayjs(new Date(dayjs().year(), currentMonth)).format("MM")) {
            classNames.push(`${s.calendar__previous}`);
        }
        if (
            (day.isBefore(dayjs(), "day") && day.month() === dayjs().month()) ||
            day.isBefore(dayjs(), "day") ||
            (startDate !== "" && day.isBefore(startDate, "day"))
        ) {
            classNames.push(`${s.calendar__close}`);
        }
        const className: string = classNames.join(" ");
        return className;
    };

    const getBetweenDays = (day: any) => {
        if (!startDate && !endDate) {
            return "";
        } else if (startDate && !endDate) {
            if (dayjs(day).isSame(startDate, "day")) {
                return `${s.calendar__active}`;
            }
        } else {
            if (dayjs(day).isSame(startDate, "day") || dayjs(day).isSame(endDate, "day")) {
                return `${s.calendar__active}`;
            }
            if (dayjs(day).isAfter(startDate, "day") && dayjs(day).isBefore(endDate, "day")) {
                return `${s.calendar__between}`;
            }
        }
    };

    const getBooked = (day: any) => {
        if (booked.some((item: string) => item === day.format("DD/MM/YY"))) {
            return `${s.calendar__close}`;
        }
        return "";
    };

    const handleSelectDayes = (e: any, day: any) => {
        if (!day.isBefore(dayjs())) {
            if (startDate === "") {
                setStartDate(day);
            } else {
                if (booked.includes(day.format("DD/MM/YY")) && day.isAfter(startDate)) {
                    return;
                } else {
                    if (day.isAfter(startDate)) {
                        setEndDate(day);
                    } else {
                        return;
                    }
                }
            }
        } else {
            return;
        }
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
        <div
            className={s.calendar}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
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
                                    className={`${getBetweenDays(day)} ${getPreviousDays(day)} ${getBooked(day)} ${s.calendar__day}`}
                                    onClick={(e) => handleSelectDayes(e, day)}
                                >
                                    {day.format("D")}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            <div className={s.calendar__bottom}>
                <div
                    className={s.calendar__bottom_clear}
                    onClick={(e) => {
                        e.preventDefault();
                        setStartDate("");
                        setEndDate("");
                    }}
                >
                    Clear dates
                </div>
                <div
                    className={s.calendar__bottom_close}
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                    }}
                >
                    Close
                </div>
            </div>
        </div>
    );
};

export default SmallCalendar;
