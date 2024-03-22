import Search from "@/components/Search/Search";
import s from "./HomePage.module.scss";
import cabins from "@/shared/assets/img/incons/cabins.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BsSliders } from "react-icons/bs";
import { IoStar } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward, IoMdHeart } from "react-icons/io";
import slide1 from "@/shared/assets/img/slide1.webp";
import slide2 from "@/shared/assets/img/slide2.webp";
import slide3 from "@/shared/assets/img/slide3.webp";

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
                        <div className={s.catalog__items}>
                            <div className={s.catalog__item}>
                                <Swiper
                                    className={s.catalog__slider}
                                    modules={[Navigation, Pagination]}
                                    pagination={{ clickable: true }}
                                    navigation={{
                                        nextEl: ".catalog-swiper-button-next",
                                        prevEl: ".catalog-swiper-button-prev",
                                    }}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                >
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide1}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide2}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide3}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <button
                                        className={`${s.catalog__item_arrow} ${s.catalog__item_arrow_left} catalog-swiper-button-prev`}
                                    >
                                        <IoIosArrowBack />
                                    </button>
                                    <button
                                        className={`${s.catalog__item_arrow} ${s.catalog__item_arrow_right} catalog-swiper-button-next`}
                                    >
                                        <IoIosArrowForward />
                                    </button>
                                </Swiper>
                                <div className={s.catalog__item_like}>
                                    <IoMdHeart />
                                </div>
                                <div className={s.catalog__item_columns}>
                                    <h3 className={s.catalog__item_title}>Moisei, Rumania</h3>
                                    <div className={s.catalog__rating}>
                                        <IoStar /> <span>4.9</span>
                                    </div>
                                </div>
                                <p className={s.catalog__price}>
                                    <span>$100</span> night
                                </p>
                            </div>
                            <div className={s.catalog__item}>
                                <Swiper
                                    className={s.catalog__slider}
                                    modules={[Navigation, Pagination]}
                                    pagination={{ clickable: true }}
                                    navigation={{
                                        nextEl: ".catalog-swiper-button-next",
                                        prevEl: ".catalog-swiper-button-prev",
                                    }}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                >
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide1}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide2}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide3}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <button
                                        className={`${s.catalog__item_arrow} ${s.catalog__item_arrow_left} catalog-swiper-button-prev`}
                                    >
                                        <IoIosArrowBack />
                                    </button>
                                    <button
                                        className={`${s.catalog__item_arrow} ${s.catalog__item_arrow_right} catalog-swiper-button-next`}
                                    >
                                        <IoIosArrowForward />
                                    </button>
                                </Swiper>
                                <div className={s.catalog__item_like}>
                                    <IoMdHeart />
                                </div>
                                <div className={s.catalog__item_columns}>
                                    <h3 className={s.catalog__item_title}>Moisei, Rumania</h3>
                                    <div className={s.catalog__rating}>
                                        <IoStar /> <span>4.9</span>
                                    </div>
                                </div>
                                <p className={s.catalog__price}>
                                    <span>$100</span> night
                                </p>
                            </div>
                            <div className={s.catalog__item}>
                                <Swiper
                                    className={s.catalog__slider}
                                    modules={[Navigation, Pagination]}
                                    pagination={{ clickable: true }}
                                    navigation={{
                                        nextEl: ".catalog-swiper-button-next",
                                        prevEl: ".catalog-swiper-button-prev",
                                    }}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                >
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide1}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide2}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide3}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <button
                                        className={`${s.catalog__item_arrow} ${s.catalog__item_arrow_left} catalog-swiper-button-prev`}
                                    >
                                        <IoIosArrowBack />
                                    </button>
                                    <button
                                        className={`${s.catalog__item_arrow} ${s.catalog__item_arrow_right} catalog-swiper-button-next`}
                                    >
                                        <IoIosArrowForward />
                                    </button>
                                </Swiper>
                                <div className={s.catalog__item_like}>
                                    <IoMdHeart />
                                </div>
                                <div className={s.catalog__item_columns}>
                                    <h3 className={s.catalog__item_title}>Moisei, Rumania</h3>
                                    <div className={s.catalog__rating}>
                                        <IoStar /> <span>4.9</span>
                                    </div>
                                </div>
                                <p className={s.catalog__price}>
                                    <span>$100</span> night
                                </p>
                            </div>
                            <div className={s.catalog__item}>
                                <Swiper
                                    className={s.catalog__slider}
                                    modules={[Navigation, Pagination]}
                                    pagination={{ clickable: true }}
                                    navigation={{
                                        nextEl: ".catalog-swiper-button-next",
                                        prevEl: ".catalog-swiper-button-prev",
                                    }}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                >
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide1}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide2}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide className={s.catalog__slide}>
                                        <img
                                            className={s.catalog__slide_img}
                                            src={slide3}
                                            alt="slide"
                                        />
                                    </SwiperSlide>
                                    <button
                                        className={`${s.catalog__item_arrow} ${s.catalog__item_arrow_left} catalog-swiper-button-prev`}
                                    >
                                        <IoIosArrowBack />
                                    </button>
                                    <button
                                        className={`${s.catalog__item_arrow} ${s.catalog__item_arrow_right} catalog-swiper-button-next`}
                                    >
                                        <IoIosArrowForward />
                                    </button>
                                </Swiper>
                                <div className={s.catalog__item_like}>
                                    <IoMdHeart />
                                </div>
                                <div className={s.catalog__item_columns}>
                                    <h3 className={s.catalog__item_title}>Moisei, Rumania</h3>
                                    <div className={s.catalog__rating}>
                                        <IoStar /> <span>4.9</span>
                                    </div>
                                </div>
                                <p className={s.catalog__price}>
                                    <span>$100</span> night
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
