import { ProductsResponse } from "@/types/response/ProductsResponse";
import s from "./Search.module.scss";
import { IoIosSearch } from "react-icons/io";
import { useFilterStore } from "@/store";
import { useState } from "react";

interface SearchProps {
    setProducts: (value: ProductsResponse) => void;
}

const Search = ({ setProducts }: SearchProps) => {
    const [queryInput, setQueryInput] = useState<string>("");

    const setQuery = useFilterStore((state) => state.setQuery);
    const setStartDate = useFilterStore((state) => state.setStartDate);
    const setEndDate = useFilterStore((state) => state.setEndDate);
    const search = useFilterStore((state) => state.search);

    const Submit = async (e: any) => {
        e.preventDefault();
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
            <label className={s.search__columns}>
                <span>Check in</span>
                <div className={s.search__datapicker}>add dates</div>
            </label>
            <label className={s.search__columns}>
                <span>Check out</span>
                <div className={s.search__datapicker}>add dates</div>
            </label>
            <button className={s.search__btn} type="submit">
                <IoIosSearch />
            </button>
        </form>
    );
};

export default Search;
