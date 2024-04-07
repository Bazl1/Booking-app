import { useEffect, useState } from "react";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import s from "./ReserveForm.module.scss";
import { MdOutlinePets } from "react-icons/md";
import CountItem from "../CountItem/CountItem";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import toast from "react-hot-toast";
dayjs.extend(isBetween);

interface ReserveFormProps {
    price: number;
}

const booked = ["01/04/24", "07/04/24", "10/04/24"];

const ReserveForm = ({ price }: ReserveFormProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<any>("");
    const [endDate, setEndDate] = useState<any>("");
    const [adults, setAdults] = useState<number>(0);
    const [childrens, setChildrens] = useState<number>(0);
    const [pets, setPets] = useState<boolean>(false);
    const [cost, setCost] = useState<number>(price);

    useEffect(() => {
        if (startDate !== "" && endDate !== "") {
            const sum = endDate.diff(startDate, "day") + 1;
            setCost(sum * price);
        } else {
            setCost(price);
        }
    }, [startDate, endDate]);

    const Submit = (e: any) => {
        e.preventDefault();
        if (startDate !== "" && endDate !== "") {
            // for (let i = 0; i < booked.length; i++) {
            //     const date = dayjs(booked[i], "DD/MM/YY");
            //     if (
            //         date.isBetween(
            //             startDate.format("DD/MM/YY"),
            //             endDate.format("DD/MM/YY"),
            //             null,
            //             "[]",
            //         )
            //     ) {
            //         toast.error(`The date of ${booked[i]} is already booked`);
            //         throw new Error(`The date of ${booked[i]} is already booked`);
            //     }
            // }
        } else {
            toast.error("Select both dates");
            return;
        }
    };

    return (
        <form className={s.form} onSubmit={(e) => Submit(e)}>
            <h3 className={s.form__title}>Add dates for prices</h3>
            <label className={s.form__columns} onClick={() => setOpen((current) => !current)}>
                <div className={s.form__date_input}>
                    <span>Check-in</span>
                    {startDate !== "" ? startDate.format("D/MM/YYYY") : "Select a date"}
                </div>
                <div className={s.form__date_input}>
                    <span>Checkout</span>
                    {endDate !== "" ? endDate.format("D/MM/YYYY") : "Select a date"}
                </div>
                {open && (
                    <SmallCalendar
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setOpen={setOpen}
                        booked={booked}
                    />
                )}
            </label>
            <div className={s.form__line} />
            <CountItem setValue={setAdults} value={adults} text={"number of adults"} />
            <div className={s.form__line} />
            <CountItem setValue={setChildrens} value={childrens} text={"number of children"} />
            <div className={s.form__line} />
            <div
                className={pets ? `${s.form__pets} ${s.form__pets_active}` : `${s.form__pets}`}
                onClick={() => {
                    setPets(!pets);
                }}
            >
                <MdOutlinePets />
                Pets
            </div>
            <div className={s.form__line} />
            <p className={s.form__price}>
                <span>$</span>
                {cost}
            </p>
            <button className={s.form__btn} type="submit">
                Reserve
            </button>
        </form>
    );
};

export default ReserveForm;
