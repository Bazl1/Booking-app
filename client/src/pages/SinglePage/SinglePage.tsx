import s from "./SinglePage.module.scss";
import { IoStar } from "react-icons/io5";
import img from "@/shared/assets/img/slide1.webp";
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
import { useState } from "react";
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

const SinglePage = () => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={s.rooms}>
            <div className="container">
                <div className={s.rooms__inner}>
                    <div className={s.rooms__gallery}>
                        <div className={s.rooms__gallery_item}>
                            <img className={s.rooms__gallery_img} src={img} alt="img" />
                        </div>
                        <div className={s.rooms__gallery_item}>
                            <img className={s.rooms__gallery_img} src={img} alt="img" />
                        </div>
                        <div className={s.rooms__gallery_item}>
                            <img className={s.rooms__gallery_img} src={img} alt="img" />
                        </div>
                        <div className={s.rooms__gallery_item}>
                            <img className={s.rooms__gallery_img} src={img} alt="img" />
                        </div>
                        <div className={s.rooms__gallery_item}>
                            <img className={s.rooms__gallery_img} src={img} alt="img" />
                        </div>
                        <button className={s.rooms__imgs_btn} onClick={() => setOpen(true)}>
                            <CgMenuGridO />
                            Show all photos
                        </button>
                        <Lightbox
                            open={open}
                            plugins={[Thumbnails, Zoom]}
                            close={() => setOpen(false)}
                            // slides={strGallery.map((item) => {
                            //     return { src: item };
                            // })}
                            slides={[{ src: img }, { src: img }, { src: img }]}
                        />
                    </div>
                    <div className={s.rooms__row}>
                        <div className={s.rooms__columns}>
                            <div className={s.rooms__box}>
                                <h2 className={s.rooms__title}>
                                    Treehouse in Ģibuļi Parish, Latvia
                                </h2>
                                <button className={s.rooms__like}>
                                    <IoMdHeart />
                                </button>
                            </div>
                            <div className={s.rooms__rating}>
                                <IoStar /> <span>4.9</span>
                            </div>
                            <div className={s.rooms__line}></div>
                            <div className={s.rooms__user}>
                                <img className={s.rooms__user_img} src={user} alt="user" />
                                <h3 className={s.rooms__user_name}>Ostapenko Maxim</h3>
                            </div>
                            <div className={s.rooms__line}></div>
                            <div className={s.rooms__description}>
                                <p
                                    className={
                                        showMore
                                            ? `${s.rooms__description_text} ${s.rooms__description_text_active}`
                                            : `${s.rooms__description_text}`
                                    }
                                >
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius
                                    quis illum ab voluptate maiores, non recusandae error earum
                                    nihil eos eaque quod eum nesciunt perspiciatis neque tenetur
                                    totam dignissimos perferendis! Quod eveniet rerum sunt accusamus
                                    quibusdam harum repudiandae ratione qui reiciendis fugit, culpa
                                    aliquam expedita vero doloribus saepe quae voluptatem mollitia
                                    est ea facere officia enim deserunt. Eum, itaque et. Lorem
                                    ipsum, dolor sit amet consectetur adipisicing elit. Eius quis
                                    illum ab voluptate maiores, non recusandae error earum nihil eos
                                    eaque quod eum nesciunt perspiciatis neque tenetur totam
                                    dignissimos perferendis! Quod eveniet rerum sunt accusamus
                                    quibusdam harum repudiandae ratione qui reiciendis fugit, culpa
                                    aliquam expedita vero doloribus saepe quae voluptatem mollitia
                                    est ea facere officia enim deserunt. Eum, itaque et.
                                </p>
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
                                        <p className={s.rooms__amounts_item_title}>1</p>
                                    </div>
                                    <div className={s.rooms__amounts_item}>
                                        <LuBedDouble />
                                        <span>:</span>
                                        <p className={s.rooms__amounts_item_title}>1</p>
                                    </div>
                                    <div className={s.rooms__amounts_item}>
                                        <BiSolidBath />
                                        <span>:</span>
                                        <p className={s.rooms__amounts_item_title}>1</p>
                                    </div>
                                    <div className={s.rooms__amounts_item}>
                                        <IoPeopleSharp />
                                        <span>:</span>
                                        <p className={s.rooms__amounts_item_title}>3</p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.rooms__line}></div>
                            <div className={s.rooms__amenities}>
                                <h3 className={s.rooms__subtitle}>What this place offers</h3>
                                <div className={s.rooms__amenities_items}>
                                    <div className={s.rooms__amenities_item}>
                                        <FaWifi />
                                        <p className={s.rooms__amenities_item_title}>Fast wifi</p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <TbToolsKitchen3 />
                                        <p className={s.rooms__amenities_item_title}>Kitchen</p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <MdOutlinePets />
                                        <p className={s.rooms__amenities_item_title}>
                                            Pets allowed
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <BiSolidWasher />
                                        <p className={s.rooms__amenities_item_title}>Washer</p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <PiTelevisionSimpleBold />
                                        <p className={s.rooms__amenities_item_title}>TV</p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <FaThermometerThreeQuarters />
                                        <p className={s.rooms__amenities_item_title}>Heating</p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <LuRefrigerator />
                                        <p className={s.rooms__amenities_item_title}>
                                            Refrigerator
                                        </p>
                                    </div>
                                    <div className={s.rooms__amenities_item}>
                                        <BiSolidDryer />
                                        <p
                                            className={`${s.rooms__amenities_item_title} ${s.rooms__amenities_item_title_disable}`}
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
                                    <div className={s.rooms__reviews_item}>
                                        <div className={s.rooms__reviews_item_top}>
                                            <img
                                                className={s.rooms__reviews_item_img}
                                                src={user}
                                                alt="user"
                                            />
                                            <h3 className={s.rooms__reviews_item_name}>
                                                Ostapenko Maxim
                                            </h3>
                                        </div>
                                        <div className={s.rooms__reviews_stars}>
                                            <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStar />
                                        </div>
                                        <p className={s.rooms__reviews_text}>
                                            Place made with love and a lot of thought has been put
                                            into it. Its very friendly for children, and pets. Hats
                                            off to the host. 👌🙏
                                        </p>
                                    </div>
                                    <div className={s.rooms__reviews_item}>
                                        <div className={s.rooms__reviews_item_top}>
                                            <img
                                                className={s.rooms__reviews_item_img}
                                                src={user}
                                                alt="user"
                                            />
                                            <h3 className={s.rooms__reviews_item_name}>
                                                Ostapenko Maxim
                                            </h3>
                                        </div>
                                        <div className={s.rooms__reviews_stars}>
                                            <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStar />
                                        </div>
                                        <p className={s.rooms__reviews_text}>
                                            Place made with love and a lot of thought has been put
                                            into it. Its very friendly for children, and pets. Hats
                                            off to the host. 👌🙏
                                        </p>
                                    </div>
                                    <div className={s.rooms__reviews_item}>
                                        <div className={s.rooms__reviews_item_top}>
                                            <img
                                                className={s.rooms__reviews_item_img}
                                                src={user}
                                                alt="user"
                                            />
                                            <h3 className={s.rooms__reviews_item_name}>
                                                Ostapenko Maxim
                                            </h3>
                                        </div>
                                        <div className={s.rooms__reviews_stars}>
                                            <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStar />
                                        </div>
                                        <p className={s.rooms__reviews_text}>
                                            Place made with love and a lot of thought has been put
                                            into it. Its very friendly for children, and pets. Hats
                                            off to the host. 👌🙏
                                        </p>
                                    </div>
                                    <div className={s.rooms__reviews_item}>
                                        <div className={s.rooms__reviews_item_top}>
                                            <img
                                                className={s.rooms__reviews_item_img}
                                                src={user}
                                                alt="user"
                                            />
                                            <h3 className={s.rooms__reviews_item_name}>
                                                Ostapenko Maxim
                                            </h3>
                                        </div>
                                        <div className={s.rooms__reviews_stars}>
                                            <IoStar /> <IoStar /> <IoStar /> <IoStar /> <IoStar />
                                        </div>
                                        <p className={s.rooms__reviews_text}>
                                            Place made with love and a lot of thought has been put
                                            into it. Its very friendly for children, and pets. Hats
                                            off to the host. 👌🙏
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={s.rooms__columns}>
                            <ReserveForm price={100} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePage;
