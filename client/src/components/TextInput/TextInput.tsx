import s from "./TextInput.module.scss";

interface TextInputProps {
    value: string;
    setValue: (value: any) => void;
    placeholder: string;
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
            />
            {errors[registerName] && (
                <p className={s.input__error}>{errors[registerName]?.message}</p>
            )}
        </label>
    );
};

export default TextInput;
