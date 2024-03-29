import s from "./CreateProductPage.module.scss";
import { useEffect, useState } from "react";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import TextInput from "@/components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import GridGallery from "@/components/GridGallery/GridGallery";
import { Editor } from "@tinymce/tinymce-react";
import CategoriesService from "@/services/CategoriesService";
import { ICategory } from "@/types/ICategory";
import { FaWifi } from "react-icons/fa";
import { TbToolsKitchen3 } from "react-icons/tb";
import { MdOutlinePets } from "react-icons/md";
import { BiSolidDryer, BiSolidWasher } from "react-icons/bi";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import { LuRefrigerator } from "react-icons/lu";

interface IAmenities {
    icon: React.ReactNode;
    name: string;
    value: boolean;
}

const amenitiesState: IAmenities[] = [
    {
        icon: <FaWifi />,
        name: "Wifi",
        value: false,
    },
    {
        icon: <MdOutlinePets />,
        name: "PetsAllowed",
        value: false,
    },
    {
        icon: <PiTelevisionSimpleBold />,
        name: "TV",
        value: false,
    },
    {
        icon: <LuRefrigerator />,
        name: "Refrigerator",
        value: false,
    },
    {
        icon: <TbToolsKitchen3 />,
        name: "Kitchen",
        value: false,
    },
    {
        icon: <BiSolidWasher />,
        name: "Washer",
        value: false,
    },
    {
        icon: <FaThermometerThreeQuarters />,
        name: "Heating",
        value: false,
    },
    {
        icon: <BiSolidDryer />,
        name: "Dryer",
        value: false,
    },
];

const CreateProductPage = () => {
    const [gallery, setGallery] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");
    const [productTitle, setProductTitle] = useState<string>("");
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [amenities, setAmenities] = useState<IAmenities[]>(amenitiesState);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const handleEditorChange = (content: any) => {
        setContent(content);
    };

    const handleToggleCheck = (name: string) => {
        const updateAmenities = amenitiesState.map((item: IAmenities) => {
            if (item.name === name) {
                item.value = !item.value;
            }
            return item;
        });
        setAmenities(updateAmenities);
    };

    const Submit = () => {};

    useEffect(() => {
        CategoriesService.getCategories().then((res) => setCategories(res.data));
    }, []);

    return (
        <section className={s.product}>
            <div className="container">
                <div className={s.product__inner}>
                    <h2 className={s.product__title}>Create a new announcement</h2>
                    <div className={s.product__line}></div>
                    <form className={s.product__form} onSubmit={handleSubmit(Submit)}>
                        <TextInput
                            type="text"
                            value={productTitle}
                            setValue={setProductTitle}
                            register={register}
                            registerName={"productTitle"}
                            errors={errors}
                            placeholder="Product titlte"
                            validationOptions={{
                                required: "Required field",
                            }}
                        />
                        <Editor
                            apiKey={import.meta.env.VITE_TINY_KEY}
                            init={{
                                plugins:
                                    "anchor autolink charmap emoticons link lists table wordcount checklist casechange formatpainter pageembed linkchecker tinymcespellchecker permanentpen powerpaste advtable editimage mentions tableofcontents footnotes autocorrect typography inlinecss markdown",
                                toolbar:
                                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                menubar: false,
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </form>
                    <div className={s.product__line}></div>
                    <div className={s.product__amenities}>
                        {amenities &&
                            amenities.map((item: IAmenities, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleToggleCheck(item.name)}
                                        className={
                                            item.value
                                                ? `${s.product__amenities_item} ${s.product__amenities_item_active}`
                                                : `${s.product__amenities_item}`
                                        }
                                    >
                                        {item.icon}
                                        {item.name}
                                    </button>
                                );
                            })}
                    </div>
                    <div className={s.product__line}></div>
                    <div className={s.product__categories}>
                        {categories &&
                            categories.map((category: ICategory) => {
                                return (
                                    <div key={category.id} className={s.product__category}>
                                        <img
                                            className={s.product__category_img}
                                            src={category.icon}
                                            alt="icon"
                                        />
                                        <h3 className={s.product__category_title}>
                                            {category.name}
                                        </h3>
                                    </div>
                                );
                            })}
                    </div>
                    <div className={s.product__line}></div>
                    <h3 className={s.product__subtitle}>Add images to the gallery</h3>
                    <GridGallery gallery={gallery} setGallery={setGallery} />
                </div>
            </div>
        </section>
    );
};

export default CreateProductPage;
