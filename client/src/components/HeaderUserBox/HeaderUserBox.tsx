import { FiMenu } from "react-icons/fi";
import user from "../../shared/assets/img/user.png";
import s from "./HeaderUserBox.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const HeaderUserBox = () => {
    const [menu, setMenu] = useState<boolean>(false);

    const isAuth = false;
    return (
        <div className={s.user}>
            <button onClick={() => setMenu(!menu)} className={s.user__box}>
                <FiMenu />
                <img className={s.user__img} src={user} alt="user" />
            </button>
            <div
                className={
                    menu ? `${s.user__dropdown} ${s.user__dropdown_active}` : `${s.user__dropdown}`
                }
            >
                {isAuth ? null : (
                    <ul className={s.user__list}>
                        <li className={s.user__list_item}>
                            <Link className={s.user__item_link} to={"/"}>
                                Sign up
                            </Link>
                        </li>
                        <li className={s.user__list_item}>
                            <Link className={s.user__item_link} to={"/"}>
                                Log in
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HeaderUserBox;
