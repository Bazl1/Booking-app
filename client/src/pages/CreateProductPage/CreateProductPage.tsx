import s from "./CreateProductPage.module.scss";
import { IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import toast from "react-hot-toast";
import TextInput from "@/components/TextInput/TextInput";
import { useForm } from "react-hook-form";

const CreateProductPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [gallery, setGallery] = useState<string[]>([]);
    const [productTitle, setProductTitle] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            const maxSize = 2 * 1024 * 1024;
            if (input.files.length + gallery.length > 15) {
                toast.error("The maximum number of images is 15");
                return;
            }
            for (let i = 0; i < input.files.length; i++) {
                const file = input.files[i];
                if (input.files[i].size > maxSize) {
                    toast.error("Maximum image size 2mb");
                } else {
                    await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            if (gallery.length > 20) {
                                toast.error("The maximum number of images is 15");
                                resolve(null);
                            } else {
                                setGallery((gallery) => [...gallery, e.target?.result as string]);
                                resolve(null);
                            }
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                }
            }
        }
    };

    const handleDeleteImages = (e: any, id: number) => {
        e.stopPropagation();
        setGallery((gallery) => {
            return gallery.filter((_, index) => index !== id);
        });
    };

    const Submit = () => {};

    return (
        <section className={s.product}>
            <div className="container">
                <div className={s.product__inner}>
                    <h2 className={s.product__title}>Create a new announcement</h2>
                    <div className={s.product__line}></div>
                    <h3 className={s.product__subtitle}>Add images to the gallery</h3>
                    <div className={s.product__gallery}>
                        {gallery.length > 0 &&
                            gallery.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={s.product__gallery_item}
                                        onClick={() => setOpen(true)}
                                    >
                                        <img
                                            className={s.product__gallery_img}
                                            src={item}
                                            alt="img"
                                        />
                                        <button
                                            className={s.product__gallery_close}
                                            onClick={(e) => handleDeleteImages(e, index)}
                                        >
                                            <IoClose />
                                        </button>
                                    </div>
                                );
                            })}

                        <label className={s.product__gallery_add}>
                            <span>
                                <IoMdDownload />
                            </span>
                            <span>Upload image</span>
                            <input
                                className={s.product__file_input}
                                onChange={(e) => handleAddImages(e)}
                                type="file"
                                accept="image/png, image/jpeg"
                                multiple={true}
                            />
                        </label>
                        <Lightbox
                            open={open}
                            plugins={[Thumbnails, Zoom]}
                            close={() => setOpen(false)}
                            slides={gallery.map((item) => {
                                return { src: item };
                            })}
                        />
                    </div>
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
