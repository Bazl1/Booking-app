import { useEffect, useState } from "react";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import s from "./ReserveForm.module.scss";
import { MdOutlinePets } from "react-icons/md";
import CountItem from "../CountItem/CountItem";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import toast from "react-hot-toast";
import BookingService from "@/services/BookingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCalendarStore } from "@/store";
dayjs.extend(isBetween);

interface ReserveFormProps {
    price: number;
    productId: string;
    maxPeoples: number;
    petsAllowed: boolean;
}

const ReserveForm = ({ price, productId, maxPeoples, petsAllowed }: ReserveFormProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [bookedArray, setBookedArray] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<any>("");
    const [endDate, setEndDate] = useState<any>("");
    const [adults, setAdults] = useState<number>(0);
    const [childrens, setChildrens] = useState<number>(0);
    const [pets, setPets] = useState<boolean>(false);
    const [cost, setCost] = useState<number>(price);

    const currentMonth = useCalendarStore((state) => state.currentMonth);
    const queryClient = useQueryClient();
    const mutation = useMutation((data: FormData) => BookingService.createBooking(data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            toast.success("You have sent a reservation request");
        },
        onError: (error: any) => {
            toast.error(error.response.data.error.message);
        },
    });

    const Submit = async (e: any) => {
        e.preventDefault();
        if (startDate !== "" && endDate !== "") {
            if (childrens > 0 && adults <= 0) {
                return toast.error("Children must be in the presence of adults");
            }
            if (adults <= 0) {
                return toast.error("The number of people can't be zero");
            }
            if (adults + childrens > maxPeoples) {
                return toast.error("You've exceeded the maximum number of people");
            } else if (!petsAllowed && pets) {
                return toast.error("Pets are not allowed in this apartment");
            }

            const data = new FormData();
            data.append("advertId", productId);
            data.append("startDate", startDate.format("DD/MM/YYYY"));
            data.append("endDate", endDate.format("DD/MM/YYYY"));
            data.append("numberOfAdults", adults.toString());
            data.append("numberOfChildren", childrens.toString());
            data.append("pets", pets.toString());
            data.append("cost", cost.toString());
            await mutation.mutate(data);
        } else {
            toast.error("Select both dates");
            return;
        }
    };

    useEffect(() => {
        if (startDate !== "" && endDate !== "") {
            const sum = endDate.diff(startDate, "day") + 1;
            setCost(sum * price);
        } else {
            setCost(price);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        BookingService.getBooked(productId, currentMonth + 1, 2024).then((res) =>
            setBookedArray(res.data.dates),
        );
    }, [currentMonth]);

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
                        booked={bookedArray}
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
