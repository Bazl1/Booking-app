import { InputHTMLAttributes } from "react";
import s from "./TextInput.module.scss";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value: any;
    setValue: (value: any) => void;
    placeholder?: string;
    type: string;
    register: any;
    registerName: string;
    errors: any;
    validationOptions?: any;
}

const TextInput = ({
    value,
    setValue,
    placeholder,
    type,
    register,
    registerName,
    errors,
    validationOptions,
    ...props
}: TextInputProps) => {
    return (
        <label className={s.input__columns}>
            <input
                {...register(registerName, validationOptions)}
                className={s.input}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                {...props}
            />
            {errors[registerName] && (
                <p className={s.input__error}>{errors[registerName]?.message}</p>
            )}
        </label>
    );
};

export default TextInput;
