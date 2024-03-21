import s from "./Search.module.scss";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
    const Submit = () => {};
    return (
        <form className={s.search} onSubmit={Submit}>
            <label className={s.search__columns}>
                <span>Where</span>
                <input className={s.search__input} type="text" placeholder="Search query" />
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
