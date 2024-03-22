import s from "./ProductItem.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoStar } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward, IoMdHeart } from "react-icons/io";
import slide1 from "@/shared/assets/img/slide1.webp";
import slide2 from "@/shared/assets/img/slide2.webp";
import slide3 from "@/shared/assets/img/slide3.webp";

const ProductItem = () => {
    return (
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
                    <img className={s.catalog__slide_img} src={slide1} alt="slide" />
                </SwiperSlide>
                <SwiperSlide className={s.catalog__slide}>
                    <img className={s.catalog__slide_img} src={slide2} alt="slide" />
                </SwiperSlide>
                <SwiperSlide className={s.catalog__slide}>
                    <img className={s.catalog__slide_img} src={slide3} alt="slide" />
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
    );
};

export default ProductItem;
