import s from "./ChangeProductPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import TextInput from "@/components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import CategoriesService from "@/services/CategoriesService";
import { ICategory } from "@/types/ICategory";
import { LuBedSingle } from "react-icons/lu";
import { LuBedDouble } from "react-icons/lu";
import { BiSolidBath } from "react-icons/bi";
import { IoPeopleSharp } from "react-icons/io5";
import CountItem from "@/components/CountItem/CountItem";
import { IAmenities, amenitiesState } from "@/shared/utils/amenitiesState";
import getMaximumCapacity from "@/shared/utils/getMaximumCapacity";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ProductsService from "@/services/ProductsService";
import { useParams } from "react-router-dom";
import { IProduct } from "@/types/IProduct";
import GridChangeGallery from "@/components/GridChangeGallery/GridChangeGallery";

const ChangeProductPage = () => {
    const { id } = useParams();
    const idStr = id || "";

    const [oldData, setOldData] = useState<IProduct>({} as IProduct);
    const [gallery, setGallery] = useState<File[]>([]);
    const [oldGallery, setOldGallery] = useState<string[]>([]);
    const [productTitle, setProductTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("");
    const [countBed, setCountBed] = useState<number>(0);
    const [countBedDouble, setCountBedDouble] = useState<number>(0);
    const [countBathrooms, setCountBathrooms] = useState<number>(0);
    const [amenities, setAmenities] = useState<IAmenities[]>(amenitiesState);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const queryClient = useQueryClient();
    const mutation = useMutation((data: FormData) => ProductsService.changeProduct(idStr, data), {
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            queryClient.invalidateQueries(["product", idStr]);
        },
    });

    const handleEditorChange = (content: any) => {
        setContent(content);
    };

    const handleToggleCheck = (e: any, name: string) => {
        e.preventDefault();
        const updateAmenities = amenitiesState.map((item: IAmenities) => {
            if (item.name === name) {
                item.value = !item.value;
            }
            return item;
        });
        setAmenities(updateAmenities);
    };

    const Submit = () => {
        if (gallery.length + oldGallery.length >= 4) {
            if (activeCategory !== "") {
                if (countBed > 0 || countBedDouble > 0) {
                    try {
                        const data = new FormData();

                        data.append("Name", productTitle);
                        data.append("Description", content);
                        data.append("PricePerNight", price?.toString() || "0");
                        data.append("NumberOfSingleBeds", countBed.toString());
                        data.append("NumberOfDoubleBeds", countBedDouble.toString());
                        data.append("NumberOfBathrooms", countBathrooms.toString());
                        data.append("MaxPeople", peopleCount.toString());
                        data.append("Category", activeCategory);
                        amenities.forEach((item: IAmenities) => {
                            return data.append(item.name, item.value.toString());
                        });
                        oldGallery.forEach((image: string) => {
                            return data.append("Urls", image);
                        });
                        gallery.forEach((image: File) => {
                            return data.append("Photos", image);
                        });

                        mutation.mutate(data);
                        toast.success("Successful change");
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    toast.error("Specify the maximum number of people");
                }
            } else {
                toast.error("Select a category");
            }
        } else {
            toast.error("Minimum number of images 5");
        }
    };

    const peopleCount = useMemo(() => {
        return getMaximumCapacity(countBed, countBedDouble);
    }, [countBed, countBedDouble]);

    useEffect(() => {
        CategoriesService.getCategories().then((res) => setCategories(res.data));
        ProductsService.getProductById(idStr).then((res) => setOldData(res.data));
    }, []);

    useEffect(() => {
        if (oldData) {
            setOldGallery(oldData.photos || []);
            setProductTitle(oldData.name);
            setContent(oldData.description);
            setPrice(oldData.pricePerNight);
            setCountBed(oldData.numberOfSingleBeds);
            setCountBedDouble(oldData.numberOfDoubleBeds);
            setCountBathrooms(oldData.numberOfBathrooms);

            setValue("productTitle", oldData.name, { shouldDirty: true });
            setValue("price", oldData.name, { shouldDirty: true });
        }
    }, [oldData]);

    return (
        <section className={s.product}>
            <div className="container">
                <div className={s.product__inner}>
                    <h2 className={s.product__title}>Change your announcement</h2>
                    <div className={s.product__line}></div>
                    <h3 className={s.product__subtitle}>
                        Enter the name and description of your apartment
                    </h3>
                    <form className={s.product__form} onSubmit={handleSubmit(Submit)}>
                        <TextInput
                            type="text"
                            value={productTitle}
                            setValue={setProductTitle}
                            register={register}
                            registerName={"productTitle"}
                            errors={errors}
                            placeholder="Titlte"
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
                            value={content}
                        />
                        <div className={s.product__line}></div>
                        <h3 className={s.product__subtitle}>
                            Enter the daily rate and the number of rooms in your apartment
                        </h3>

                        <label className={s.product__input_width}>
                            <TextInput
                                type="number"
                                value={price}
                                setValue={setPrice}
                                register={register}
                                registerName={"price"}
                                errors={errors}
                                placeholder="Daily rate"
                                validationOptions={{
                                    required: "Required field",
                                }}
                            />
                        </label>
                        <div className={s.product__columns}>
                            <CountItem
                                value={countBedDouble}
                                setValue={setCountBedDouble}
                                img={<LuBedDouble />}
                                text={"Number of double beds"}
                            />
                            <CountItem
                                value={countBed}
                                setValue={setCountBed}
                                img={<LuBedSingle />}
                                text={"Number of single beds"}
                            />
                            <CountItem
                                value={countBathrooms}
                                setValue={setCountBathrooms}
                                img={<BiSolidBath />}
                                text={"Number of bathrooms"}
                            />
                        </div>
                        <div className={s.product__total_people}>
                            <IoPeopleSharp /> Maximum people: <span>{peopleCount}</span>
                        </div>
                        <div className={s.product__line}></div>
                        <h3 className={s.product__subtitle}>What category is your apartment ?</h3>
                        <div className={s.product__categories}>
                            {categories &&
                                categories.map((category: ICategory) => {
                                    return (
                                        <div
                                            key={category.id}
                                            className={
                                                activeCategory !== category.id
                                                    ? `${s.product__category}`
                                                    : `${s.product__category} ${s.product__category_active}`
                                            }
                                            onClick={() => setActiveCategory(category.id)}
                                        >
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
                        <h3 className={s.product__subtitle}>What amenities do you have ?</h3>
                        <div className={s.product__amenities}>
                            {amenities &&
                                amenities.map((item: IAmenities, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={(e) => handleToggleCheck(e, item.name)}
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
                        <h3 className={s.product__subtitle}>Add images to the gallery</h3>
                        <GridChangeGallery
                            gallery={gallery}
                            setGallery={setGallery}
                            oldGallery={oldGallery}
                            setOldGallery={setOldGallery}
                        />
                        <button className={s.product__btn} type="submit">
                            Change
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ChangeProductPage;
