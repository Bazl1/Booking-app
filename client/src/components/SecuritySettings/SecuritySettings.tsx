import { useForm } from "react-hook-form";
import s from "./SecuritySettings.module.scss";
import TextInput from "../TextInput/TextInput";
import { useState } from "react";
import toast from "react-hot-toast";
import SettingsService from "@/services/SettingsService";

const SecuritySettings = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [configPassword, setConfigPassword] = useState<string>("");

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const Submit = async () => {
        if (newPassword === configPassword) {
            try {
                await SettingsService.securitySettings(oldPassword, newPassword);
                toast.success("Settings changed");
            } catch (error: any) {
                toast.error(error.response.data.error.message);
            }
        } else {
            toast.error("Password mismatch");
        }
    };

    return (
        <form className={s.settings__form} onSubmit={handleSubmit(Submit)}>
            <h3 className={s.settings__title}>Change password</h3>
            <div className={s.settings__line}></div>
            <TextInput
                value={oldPassword}
                setValue={setOldPassword}
                type="password"
                register={register}
                errors={errors}
                registerName="oldPassword"
                placeholder="Current password"
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
                value={newPassword}
                setValue={setNewPassword}
                type="password"
                register={register}
                errors={errors}
                registerName="newPassword"
                placeholder="New password"
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
                value={configPassword}
                setValue={setConfigPassword}
                type="password"
                register={register}
                errors={errors}
                registerName="confirmPassword"
                placeholder="Confirm password"
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
            <button className={s.settings__btn} type="submit">
                Save changes
            </button>
        </form>
    );
};

export default SecuritySettings;
