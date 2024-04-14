import s from "./SinglePage.module.scss";
import { IoStar } from "react-icons/io5";
import user from "@/shared/assets/img/user.png";
import ReserveForm from "@/components/ReserveForm/ReserveForm";
import { CgMenuGridO } from "react-icons/cg";
import { FaChevronRight } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { TbToolsKitchen3 } from "react-icons/tb";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidWasher } from "react-icons/bi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { LuRefrigerator } from "react-icons/lu";
import { BiSolidDryer } from "react-icons/bi";
import { useEffect, useState } from "react";
import { LuBedSingle } from "react-icons/lu";
import { LuBedDouble } from "react-icons/lu";
import { BiSolidBath } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { IoMdHeart } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductsService from "@/services/ProductsService";
import Loader from "@/components/Loader/Loader";
import DOMPurify from "dompurify";
import { IReview } from "@/types/IReview";
import useHandleFavorite from "@/shared/utils/useFavorite";
import { IoIosHeartDislike } from "react-icons/io";

const SinglePage = () => {
    const { id } = useParams();
    const idStr = id || "";

    const { isLoading, data } = useQuery(["product", idStr], () =>
        ProductsService.getProductById(idStr),
    );

    const [showMore, setShowMore] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const cleanContent = DOMPurify.sanitize(data?.data.description || "");

    const handleFavorite = useHandleFavorite(idStr);

    const handleToggleFavorite = async () => {
        const like = await handleFavorite();
        if (like !== undefined) {
            setIsLiked(like);
        }
    };

    if (isLoading) {
        <Loader />;
    }

    useEffect(() => {
        setIsLiked(data?.data.liked || false);
    }, [data]);

    return (
        <div className={s.rooms}>
            <div className="container">
                <div className={s.rooms__inner}>
                    <div className={s.rooms__gallery}>
                        {data?.data.photos.slice(0, 5).map((img: string, index: number) => {
                            return (
                                <div key={index} className={s.rooms__gallery_item}>
                                    <img className={s.rooms__gallery_img} src={img} alt="img" />
                                </div>
                            );
                        })}

                        <button className={s.rooms__imgs_btn} onClick={() => setOpen(true)}>
                            <CgMenuGridO />
                            Show all photos
                        </button>
                        <Lightbox
                            open={open}
                            plugins={[Thumbnails, Zoom]}
                            close={() => setOpen(false)}
                            slides={data?.data.photos.map((item: string) => {
                                return { src: item };
                            })}
                        />
                    </div>
                    <div className={s.rooms__row}>
                        <div className={s.rooms__columns}>
                            <div className={s.rooms__box}>
                                <h2 className={s.rooms__title}>{data?.data.name}</h2>
                                <button className={s.rooms__like} onClick={handleToggleFavorite}>
                                    {isLiked ? <IoIosHeartDislike /> : <IoMdHeart />}
                                </button>
                            </div>
                            <div className={s.rooms__rating}>
                                <IoStar /> <span>4.9</span>
                            </div>
                            <div className={s.rooms__line}></div>
                            <div className={s.rooms__user}>
                                {data?.data.owner.avatar !== "" ? (
                                    <img
                                        className={s.rooms__user_img}
                                        src={data?.data.owner.avatar}
                                        alt="user"
                                    />
                                ) : (
                                    <img className={s.rooms__user_img} src={user} alt="user" />
                                )}

                                <h3 className={s.rooms__user_name}>{data?.data.owner.name}</h3>
                            </div>
                            <div className={s.rooms__line}></div>
                            <div className={s.rooms__description}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: cleanContent,
                                    }}
                                    className={
                                        showMore
                                            ? `${s.rooms__description_text} ${s.rooms__description_text_active}`
                                            : `${s.rooms__description_text}`
                                    }
                                />
                                <button
                                    onClick={() => setShowMore(!showMore)}
                                    className={s.rooms__description_more}
                                >
                                    {!showMore ? "Show more" : "Show less"} <FaChevronRight />
                                </button>
                            </div>
                            <div className={s.rooms__line}></div>
                            <div className={s.rooms__amounts}>
                                <h3 className={s.rooms__subtitle}>Places to sleep</h3>
                                <div className={s.rooms__amounts_items}>
                                    <div className={s.rooms__amounts_item}>
                                        <LuBedSingle />
                                        <span>:</span>
                                        <p className={s.rooms__amounts_item_title}>
                                            {data?.data.numberOfSingleBeds}
                                        </p>
                                    </div>
                                    <div className={s.rooms__amounts_item}>
                                        <LuBedDouble />
                                        <span>:</span>
                                        <p className={s.rooms__amounts_item_title}>
                                            {data?.data.numberOfDoubleBeds}
                                        </p>
                                    </div>
                                    <div className={s.rooms__amounts_item}>
                                        <BiSolidBath />
                                        <span>:</span>
                                        <p className={s.rooms__amounts_item_title}>
                                            {data?.data.numberOfBathrooms}
                                        </p>
                                    </div>
                                    <div className={s.rooms__amounts_item}>
                                        <IoPeopleSharp />
                                        <span>:</span>
                                        <p className={s.rooms__amounts_item_title}>
                                            {data?.data.maxPeople}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.rooms__line}></div>
                            <div className={s.rooms__amenities}>
                                <h3 className={s.rooms__subtitle}>What this place offers</h3>
                                <div className={s.rooms__amenities_items}>
                                    <div className={s.rooms__amenities_item}>
                                        <FaWifi />
                                        <p
                                            className={
                                                data?.data.amenities.wifi
                                                    ? `${s.rooms__amenities_item_title}`
                                                    : `${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`
                                            }
                                        >
                                            Fast wifi
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <TbToolsKitchen3 />
                                        <p
                                            className={
                                                data?.data.amenities.kitchen
                                                    ? `${s.rooms__amenities_item_title}`
                                                    : `${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`
                                            }
                                        >
                                            Kitchen
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <MdOutlinePets />
                                        <p
                                            className={
                                                data?.data.amenities.petsAllowed
                                                    ? `${s.rooms__amenities_item_title}`
                                                    : `${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`
                                            }
                                        >
                                            Pets allowed
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <BiSolidWasher />
                                        <p
                                            className={
                                                data?.data.amenities.washer
                                                    ? `${s.rooms__amenities_item_title}`
                                                    : `${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`
                                            }
                                        >
                                            Washer
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <PiTelevisionSimpleBold />
                                        <p
                                            className={
                                                data?.data.amenities.tv
                                                    ? `${s.rooms__amenities_item_title}`
                                                    : `${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`
                                            }
                                        >
                                            TV
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <FaThermometerThreeQuarters />
                                        <p
                                            className={
                                                data?.data.amenities.heating
                                                    ? `${s.rooms__amenities_item_title}`
                                                    : `${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`
                                            }
                                        >
                                            Heating
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <LuRefrigerator />
                                        <p
                                            className={
                                                data?.data.amenities.refrigerator
                                                    ? `${s.rooms__amenities_item_title}`
                                                    : `${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`
                                            }
                                        >
                                            Refrigerator
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <BiSolidDryer />
                                        <p
                                            className={
                                                data?.data.amenities.dryer
                                                    ? `${s.rooms__amenities_item_title}`
                                                    : `${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`
                                            }
                                        >
                                            Dryer
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.rooms__line}></div>
                            <div className={s.rooms__reviews}>
                                <h3 className={s.rooms__subtitle}>Reviews</h3>
                                <div className={s.rooms__reviews_items}>
                                    {data?.data.reviews.map((review: IReview) => {
                                        return (
                                            <div key={review.id} className={s.rooms__reviews_item}>
                                                <div className={s.rooms__reviews_item_top}>
                                                    {review.author.avatar !== "" ? (
                                                        <img
                                                            className={s.rooms__reviews_item_img}
                                                            src={review.author.avatar}
                                                            alt="user"
                                                        />
                                                    ) : (
                                                        <img
                                                            className={s.rooms__reviews_item_img}
                                                            src={user}
                                                            alt="user"
                                                        />
                                                    )}
                                                    <h3 className={s.rooms__reviews_item_name}>
                                                        {review.author.name}
                                                    </h3>
                                                </div>
                                                <div className={s.rooms__reviews_stars}>
                                                    {Array.from(
                                                        { length: review.stars },
                                                        (_, index) => (
                                                            <IoStar key={index} />
                                                        ),
                                                    )}
                                                </div>
                                                <p className={s.rooms__reviews_text}>
                                                    {review.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={s.rooms__columns}>
                            <ReserveForm productId={idStr} price={data?.data.pricePerNight || 0} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;
