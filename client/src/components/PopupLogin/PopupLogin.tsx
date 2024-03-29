import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import s from "./PopupLogin.module.scss";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/store";

interface PopupLoginProps {
    setOpen: (value: boolean) => void;
}

const PopupLogin = ({ setOpen }: PopupLoginProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const login = useUserStore((state) => state.login);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const Submit = async () => {
        await login({ email, password });
        setOpen(false);
    };
    return (
        <div className={s.popup}>
            <div className={s.popup__inner}>
                <button
                    className={s.popup__close}
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <IoClose />
                </button>
                <h2 className={s.popup__title}>Welcome to Booking app</h2>
                <form className={s.popup__form} onSubmit={handleSubmit(Submit)}>
                    <TextInput
                        value={email}
                        setValue={setEmail}
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerName="email"
                        errors={errors}
                        validationOptions={{
                            required: "Required field",
                            pattern: {
                                value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                                message: "Enter a valid email",
                            },
                        }}
                    />
                    <div className={s.popup__line}></div>
                    <TextInput
                        value={password}
                        setValue={setPassword}
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerName="password"
                        errors={errors}
                        validationOptions={{
                            required: "Required field",
                            minLength: {
                                value: 8,
                                message: "Minimum password length is 8 characters",
                            },
                            maxLength: {
                                value: 32,
                                message: "Maximum password length 32 characters",
                            },
                        }}
                    />
                    <button className={s.popup__btn} type="submit">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupLogin;
