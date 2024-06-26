import s from "./ProductItem.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoStar } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward, IoMdHeart } from "react-icons/io";
import { IoIosHeartDislike } from "react-icons/io";
import { Link } from "react-router-dom";
import { memo, useState } from "react";
import useHandleFavorite from "@/shared/utils/useFavorite";

interface ProductItemProps {
    id: string;
    images: string[];
    title: string;
    pricePerNight: number;
    liked: boolean;
}

const ProductItem = ({ id, images, title, pricePerNight, liked }: ProductItemProps) => {
    const [isLiked, setIsLiked] = useState<boolean>(liked);

    const handleFavorite = useHandleFavorite(id);

    const handleToggleFavorite = async () => {
        const like = await handleFavorite();
        if (like !== undefined) {
            setIsLiked(like);
        }
    };

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
                {images.map((image: string, index: number) => {
                    return (
                        <SwiperSlide key={index} className={s.catalog__slide}>
                            <img className={s.catalog__slide_img} src={image} alt="slide" />
                        </SwiperSlide>
                    );
                })}
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
            <button className={s.catalog__item_like} onClick={handleToggleFavorite}>
                {isLiked ? <IoIosHeartDislike /> : <IoMdHeart />}
            </button>
            <Link to={`/rooms/${id}`} className={s.catalog__item_link}>
                <div className={s.catalog__item_columns}>
                    <h3 className={s.catalog__item_title}>{title}</h3>
                    <div className={s.catalog__rating}>
                        <IoStar /> <span>4.9</span>
                    </div>
                </div>
                <p className={s.catalog__price}>
                    <span>${pricePerNight}</span> night
                </p>
            </Link>
        </div>
    );
};

export default memo(ProductItem);
