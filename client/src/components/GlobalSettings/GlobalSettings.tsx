import { useRef, useState } from "react";
import { useUserStore } from "@/store";
import { MdAttachFile } from "react-icons/md";
import { toast } from "react-hot-toast";
import userAvatar from "@/shared/assets/img/user.png";
import s from "./GlobalSettings.module.scss";

const GlobalSettings = () => {
    const [imgUrl, setImgUrl] = useState<any>(null);
    const refImg = useRef<HTMLImageElement | null>(null);

    const user = useUserStore((state) => state.user);

    const handleUploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (input.files && input.files[0]) {
            const maxSize = 2 * 1024 * 1024;
            if (input.files[0].size > maxSize) {
                toast.error("Maximum image size 2mb");
            } else {
                const reader = new FileReader();
                reader.onload = function (e) {
                    if (refImg.current) {
                        refImg.current.src = e.target?.result as string;
                    }
                };
                reader.readAsDataURL(input.files[0]);
                setImgUrl(input.files[0]);
            }
        }
    };

    return (
        <form className={s.settings__form}>
            <div className={s.settings__avatar}>
                {user.avatar !== "" ? (
                    <img
                        ref={refImg}
                        className={s.settings__avatar_img}
                        src={imgUrl}
                        alt="avatar"
                    />
                ) : (
                    <img className={s.settings__avatar_img} src={userAvatar} alt="avatar" />
                )}
                <label className={s.settings__avatar_input}>
                    <p className={s.settings__avatar_text}>
                        Attach an image in JPG, PNG format.
                        <br />
                        Maximum size 800 KB.
                    </p>
                    <span>
                        <MdAttachFile />
                        <p className={s.settings__avatar_title}>Upload a photo</p>
                    </span>
                    <input
                        className={s.settings__file}
                        onChange={(e) => handleUploadImg(e)}
                        type="file"
                        accept="image/png, image/jpeg"
                    />
                </label>
            </div>
        </form>
    );
};

export default GlobalSettings;
