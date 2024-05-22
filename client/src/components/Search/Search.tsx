import { ProductsResponse } from "@/types/response/ProductsResponse";
import s from "./Search.module.scss";
import { IoIosSearch } from "react-icons/io";
import { useFilterStore } from "@/store";
import { useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import toast from "react-hot-toast";

interface SearchProps {
    setProducts: (value: ProductsResponse) => void;
}

const Search = ({ setProducts }: SearchProps) => {
    const [queryInput, setQueryInput] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [startDateOpen, setStartDateOpen] = useState<boolean>(false);
    const [endDateOpen, setEndDateOpen] = useState<boolean>(false);

    const setQuery = useFilterStore((state) => state.setQuery);
    const setStartDateForm = useFilterStore((state) => state.setStartDate);
    const setEndDateForm = useFilterStore((state) => state.setEndDate);
    const search = useFilterStore((state) => state.search);

    const handleStartDateOpen = (e: any) => {
        e.preventDefault();
        setStartDateOpen((current) => !current);
    };

    const handleEndDateOpen = (e: any) => {
        e.preventDefault();
        setEndDateOpen((current) => !current);
    };

    const Submit = async (e: any) => {
        e.preventDefault();
        if ((startDate === "" && endDate !== "") || (startDate !== "" && endDate === "")) {
            toast.error("Select both dates ");
        } else {
            if (startDate !== "" && endDate !== "") {
                await setStartDateForm(startDate);
                await setEndDateForm(endDate);
            }
        }

        await setQuery(queryInput);
        await search().then((res: ProductsResponse) => setProducts(res));
    };

    return (
        <form className={s.search} onSubmit={Submit}>
            <label className={s.search__columns}>
                <span>Where</span>
                <input
                    className={s.search__input}
                    type="text"
                    placeholder="Search query"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                />
            </label>
            <label className={s.search__columns} onClick={handleStartDateOpen}>
                <span>Check in</span>
                <div className={s.search__datapicker}>
                    {startDate !== "" ? startDate : "add dates"}
                </div>
                {startDateOpen && (
                    <DatePicker
                        value={startDate}
                        onChange={setStartDate}
                        setOpen={setStartDateOpen}
                    />
                )}
            </label>
            <label className={s.search__columns} onClick={handleEndDateOpen}>
                <span>Check out</span>
                <div className={s.search__datapicker}>{endDate !== "" ? endDate : "add dates"}</div>
                {endDateOpen && (
                    <DatePicker value={endDate} onChange={setEndDate} setOpen={setEndDateOpen} />
                )}
            </label>
            <button className={s.search__btn} type="submit">
                <IoIosSearch />
            </button>
        </form>
    );
};

export default Search;
