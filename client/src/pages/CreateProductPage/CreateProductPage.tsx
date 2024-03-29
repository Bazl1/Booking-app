import s from "./CreateProductPage.module.scss";
import { useState } from "react";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import toast from "react-hot-toast";
import TextInput from "@/components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import GridGallery from "@/components/GridGallery/GridGallery";

const CreateProductPage = () => {
    const [gallery, setGallery] = useState<string[]>([]);
    const [productTitle, setProductTitle] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const Submit = () => {};

    return (
        <section className={s.product}>
            <div className="container">
                <div className={s.product__inner}>
                    <h2 className={s.product__title}>Create a new announcement</h2>
                    <div className={s.product__line}></div>
                    <h3 className={s.product__subtitle}>Add images to the gallery</h3>
                    <GridGallery gallery={gallery} setGallery={setGallery} />
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
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CreateProductPage;
