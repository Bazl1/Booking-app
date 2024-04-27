import { memo } from "react";
import { useBigCalendarStore } from "@/store";
import { IBookedDate } from "@/types/IBookedDate";
import dayjs from "dayjs";

import styles from "./Day.module.scss";

interface DayProps {
    day: any;
    bookedDate: IBookedDate | "";
}

const Day = ({ day, bookedDate }: DayProps) => {
    const currentMonth = useBigCalendarStore((state) => state.currentMonth);

    const getCurrentDay = () => {
        if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
            return `${styles.day__current}`;
        } else {
            return "";
        }
    };

    const getPreviousDays = () => {
        if (day.format("MM") !== dayjs(new Date(dayjs().year(), currentMonth)).format("MM")) {
            return `${styles.day__previous}`;
        }
        return "";
    };

    return (
        <div className={styles.day}>
            <p className={`${styles.day__number} ${getPreviousDays()} ${getCurrentDay()}`}>
                {day.format("D")}
            </p>
            {bookedDate && (
                <div className={styles.day__event}>
                    {bookedDate.user.name} <br /> {bookedDate.user.phoneNumber}
                </div>
            )}
        </div>
    );
};

export default memo(Day);
