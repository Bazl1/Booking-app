import s from "./PopupSignup.module.scss";
import { IoClose } from "react-icons/io5";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput/TextInput";
import { useState } from "react";

interface PopupSignupProps {
    setOpen: (value: boolean) => void;
}

const PopupSignup = ({ setOpen }: PopupSignupProps) => {
    const [fistName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: "onBlur" });

    const Submit = () => {};
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
                        value={fistName}
                        setValue={setFirstName}
                        type="text"
                        placeholder="First name"
                        register={register}
                        registerName="firstname"
                        errors={errors}
                        validationOptions={{
                            required: "Required field",
                        }}
                    />
                    <TextInput
                        value={lastName}
                        setValue={setLastName}
                        type="text"
                        placeholder="Last name"
                        register={register}
                        registerName="lastname"
                        errors={errors}
                        validationOptions={{
                            required: "Required field",
                        }}
                    />
                    <div className={s.popup__line}></div>
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
                    <label className={s.popup__columns}>
                        <InputMask
                            className={s.popup__input}
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
                            <p className={s.popup__error}>{errors["phone"]?.message?.toString()}</p>
                        )}
                    </label>
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
                    <TextInput
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        type="password"
                        placeholder="Confirm password"
                        register={register}
                        registerName="confirmPassword"
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
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupSignup;
