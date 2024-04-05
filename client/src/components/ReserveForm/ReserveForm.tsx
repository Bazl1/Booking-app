import { useState } from "react";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import s from "./ReserveForm.module.scss";

interface ReserveFormProps {
    price: number;
}

const ReserveForm = ({ price }: ReserveFormProps) => {
    const [startDate, setStartDate] = useState<any>("");
    const [endDate, setEndDate] = useState<any>("");

    const Submit = () => {};
    return (
        <form className={s.form} onSubmit={Submit}>
            <h3 className={s.form__title}>Add dates for prices</h3>
            <label className={s.form__columns}>
                <div className={s.form__date_input}>
                    <span>Check-in</span>
                    4/26/2024
                </div>
                <div className={s.form__date_input}>
                    <span>Checkout</span>
                    4/26/2024
                </div>
                <SmallCalendar
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </label>
            <p className={s.form__price}>
                <span>$</span>
                {price}
            </p>
            <button className={s.form__btn} type="submit">
                Reserve
            </button>
        </form>
    );
};

export default ReserveForm;
