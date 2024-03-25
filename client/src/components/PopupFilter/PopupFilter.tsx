import s from "./PopupFilter.module.scss";
import { IoClose } from "react-icons/io5";

interface PopupFilterProps {
    setOpen: (value: boolean) => void;
}

const PopupFilter = ({ setOpen }: PopupFilterProps) => {
    return (
        <div className={s.filter}>
            <div className="container">
                <div className={s.filter__inner}>
                    <button onClick={() => setOpen(false)} className={s.filter__close}>
                        <IoClose />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopupFilter;
