import s from "./GridGallery.module.scss";
import toast from "react-hot-toast";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { IoMdDownload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

interface GridGalleryProps {
    gallery: string[];
    setGallery: (value: string[]) => void;
}

const GridGallery = ({ gallery, setGallery }: GridGalleryProps) => {
    const [open, setOpen] = useState<boolean>(false);

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
        e.preventDefault();
        setGallery((gallery) => {
            return gallery.filter((_, index) => index !== id);
        });
    };

    return (
        <div className={s.product__gallery}>
            {gallery.length > 0 &&
                gallery.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={s.product__gallery_item}
                            onClick={() => setOpen(true)}
                        >
                            <img className={s.product__gallery_img} src={item} alt="img" />
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
    );
};

export default GridGallery;
