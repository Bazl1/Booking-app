import s from "./CountItem.module.scss";
import { FaMinus, FaPlus } from "react-icons/fa6";

interface CountItemProps {
    value: number;
    setValue: (value: any) => void;
    img?: React.ReactNode;
    text?: string | null;
}

const CountItem = ({ value, setValue, img, text = null }: CountItemProps) => {
    const handlePlus = (e: any) => {
        e.preventDefault();
        if (value >= 0 && value < 100) {
            setValue((current: number) => current + 1);
        }
    };
    const handleMinus = (e: any) => {
        e.preventDefault();
        if (value >= 1) {
            setValue((current: number) => current - 1);
        }
    };
    return (
        <div className={s.count}>
            <div className={s.count__columns}>
                {img && <div className={s.count__img}>{img}</div>}
                {text && <h3 className={s.count__title}>{text}</h3>}
            </div>
            <div className={s.count__columns}>
                <button onClick={(e) => handleMinus(e)} className={s.count__btn}>
                    <FaMinus />
                </button>
                <div className={s.count__input}>{value}</div>
                <button onClick={(e) => handlePlus(e)} className={s.count__btn}>
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default CountItem;
