import s from "./CreateProductPage.module.scss";
import { useEffect, useState } from "react";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import TextInput from "@/components/TextInput/TextInput";
import { useForm } from "react-hook-form";
import GridGallery from "@/components/GridGallery/GridGallery";
import { Editor } from "@tinymce/tinymce-react";

const CreateProductPage = () => {
    const [gallery, setGallery] = useState<string[]>([]);
    const [content, setContent] = useState<string>("");
    const [productTitle, setProductTitle] = useState<string>("");

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

    const Submit = () => {};

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
                                    "anchor autolink charmap emoticons link lists table wordcount checklist casechange formatpainter pageembed linkchecker tinymcespellchecker permanentpen powerpaste advtable editimage mentions tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                                toolbar:
                                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                                menubar: false,
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </form>
                    <div className={s.product__line}></div>

                    <div className={s.product__line}></div>
                    <h3 className={s.product__subtitle}>Add images to the gallery</h3>
                    <GridGallery gallery={gallery} setGallery={setGallery} />
                </div>
            </div>
        </section>
    );
};

export default CreateProductPage;
