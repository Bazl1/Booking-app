import { useRef, useState } from "react";
import { useUserStore } from "@/store";
import { MdAttachFile } from "react-icons/md";
import { toast } from "react-hot-toast";
import userAvatar from "@/shared/assets/img/user.png";
import s from "./GlobalSettings.module.scss";
import TextInput from "../TextInput/TextInput";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";

const GlobalSettings = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<any>(null);
    const refImg = useRef<HTMLImageElement | null>(null);

    const user = useUserStore((state) => state.user);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

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

    const Submit = () => {};

    return (
        <form className={s.settings__form} onSubmit={handleSubmit(Submit)}>
            <h3 className={s.settings__title}>Change avatar</h3>
            <div className={s.settings__line}></div>
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
                        Maximum size 2mb.
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
            <h3 className={s.settings__title}>Change name</h3>
            <div className={s.settings__line}></div>
            <div className={s.settings__columns}>
                <TextInput
                    value={firstName}
                    setValue={setFirstName}
                    type="text"
                    register={register}
                    errors={errors}
                    registerName="firstname"
                    placeholder="First name"
                    validationOptions={{
                        required: "Required field",
                    }}
                />
                <TextInput
                    value={lastName}
                    setValue={setLastName}
                    type="text"
                    register={register}
                    errors={errors}
                    registerName="lastname"
                    placeholder="Last name"
                    validationOptions={{
                        required: "Required field",
                    }}
                />
            </div>
            <h3 className={s.settings__title}>Change number</h3>
            <div className={s.settings__line}></div>
            <label className={s.settings__input_box}>
                <InputMask
                    className={s.settings__input}
                    mask="+999 99 999 9999"
                    maskChar="_"
                    alwaysShowMask={false}
                    type="tel"
                    placeholder="Phone number"
                    {...register("phone", {
                        required: "Required field",
                    })}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                {errors["phone"] && (
                    <p className={s.settings__error}>{errors["phone"]?.message?.toString()}</p>
                )}
            </label>
            <button className={s.settings__btn}>Save changes</button>
        </form>
    );
};

export default GlobalSettings;
