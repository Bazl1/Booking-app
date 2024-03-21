import Search from "@/components/Search/Search";
import s from "./HomePage.module.scss";
import cabins from "@/shared/assets/img/incons/cabins.jpg";
import { BsSliders } from "react-icons/bs";

const HomePage = () => {
    return (
        <>
            <section className={s.search}>
                <div className="container">
                    <div className={s.search__inner}>
                        <Search />
                    </div>
                </div>
            </section>
            <section className={s.catalog}>
                <div className="container">
                    <div className={s.catalog__inner}>
                        <div className={s.catalog__top}>
                            <div className={s.catalog__categories}>
                                <div
                                    className={`${s.catalog__category} ${s.catalog__category_active}`}
                                >
                                    <img
                                        className={s.catalog__category_img}
                                        src={cabins}
                                        alt="icon"
                                    />
                                    <p className={s.catalog__category_title}>Cabins</p>
                                </div>
                                <div className={s.catalog__category}>
                                    <img
                                        className={s.catalog__category_img}
                                        src={cabins}
                                        alt="icon"
                                    />
                                    <p className={s.catalog__category_title}>Cabins</p>
                                </div>
                                <div className={s.catalog__category}>
                                    <img
                                        className={s.catalog__category_img}
                                        src={cabins}
                                        alt="icon"
                                    />
                                    <p className={s.catalog__category_title}>Cabins</p>
                                </div>
                                <div className={s.catalog__category}>
                                    <img
                                        className={s.catalog__category_img}
                                        src={cabins}
                                        alt="icon"
                                    />
                                    <p className={s.catalog__category_title}>Cabins</p>
                                </div>
                                <div className={s.catalog__category}>
                                    <img
                                        className={s.catalog__category_img}
                                        src={cabins}
                                        alt="icon"
                                    />
                                    <p className={s.catalog__category_title}>Cabins</p>
                                </div>
                                <div className={s.catalog__category}>
                                    <img
                                        className={s.catalog__category_img}
                                        src={cabins}
                                        alt="icon"
                                    />
                                    <p className={s.catalog__category_title}>Cabins</p>
                                </div>
                            </div>
                            <div className={s.catalog__filtres}>
                                <BsSliders />
                                Filtres
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
