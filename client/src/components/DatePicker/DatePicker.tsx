import dayjs from "dayjs";
import styles from "./DatePicker.module.scss";
import { useEffect, useState } from "react";
import { getMonth } from "@/shared/utils/getMonth";
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface DatePickerProps {
    value: string;
    onChange: (value: any) => void;
    setOpen: (value: boolean) => void;
}

const dayOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const DatePicker = ({ value, onChange, setOpen }: DatePickerProps) => {
    const [month, setMonth] = useState<any>(getMonth());
    const [currentMonth, setCurrentMonth] = useState<any>(dayjs().month());

    const getPreviousDays = (day: any) => {
        if (day.format("MM") !== dayjs(new Date(dayjs().year(), currentMonth)).format("MM")) {
            return `${styles.calendar__day_previous}`;
        }
        return "";
    };

    const getActiveDay = (day: any) => {
        if (day.format("DD/MM/YYYY") === value) {
            return `${styles.calendar__day_active}`;
        }
        return "";
    };

    const getCurrentDay = (day: any) => {
        if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
            return `${styles.calendar__day_current}`;
        } else {
            return "";
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

    const handleExtraPrev = (e: any) => {
        e.preventDefault();
        setCurrentMonth(currentMonth - 12);
    };

    const handleExtraNext = (e: any) => {
        e.preventDefault();
        setCurrentMonth(currentMonth + 12);
    };

    const handleToday = (e: any) => {
        e.preventDefault();
        setCurrentMonth(dayjs().month());
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSetDate = (e: any, day: any) => {
        e.preventDefault();
        onChange(day.format("DD/MM/YYYY"));
    };

    useEffect(() => {
        setMonth(getMonth(currentMonth));
    }, [currentMonth]);

    return (
        <div
            className={styles.calendar}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <div className={styles.calendar__top}>
                <div className={styles.calendar__btns}>
                    <button className={styles.calendar__btn} onClick={(e) => handleExtraPrev(e)}>
                        <MdKeyboardDoubleArrowLeft />
                    </button>
                    <button className={styles.calendar__btn} onClick={(e) => handlePrev(e)}>
                        <MdKeyboardArrowLeft />
                    </button>
                </div>
                <div className={styles.calendar__date}>
                    {dayjs(new Date(dayjs().year(), currentMonth)).format("MMMM YYYY")}
                </div>
                <div className={styles.calendar__btns}>
                    <button className={styles.calendar__btn} onClick={(e) => handleNext(e)}>
                        <MdKeyboardArrowRight />
                    </button>
                    <button className={styles.calendar__btn} onClick={(e) => handleExtraNext(e)}>
                        <MdKeyboardDoubleArrowRight />
                    </button>
                </div>
            </div>
            <div className={styles.calendar__head}>
                {dayOfWeek.map((day: string, i: number) => {
                    return (
                        <div key={i} className={styles.calendar__head_day}>
                            {day}
                        </div>
                    );
                })}
            </div>
            {month.map((row: any, i: number) => {
                return (
                    <div key={i} className={styles.calendar__row}>
                        {row.map((day: any, i: number) => {
                            return (
                                <div
                                    key={i}
                                    className={`${getPreviousDays(day)} ${getActiveDay(day)} ${getCurrentDay(day)} ${styles.calendar__day}`}
                                    onClick={(e) => handleSetDate(e, day)}
                                >
                                    {day.format("D")}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
            <div className={styles.calendar__bottom}>
                <button className={styles.calendar__today} onClick={handleToday}>
                    Today
                </button>
                <button className={styles.calendar__close} onClick={handleClose}>
                    Ok
                </button>
            </div>
        </div>
    );
};

export default DatePicker;
