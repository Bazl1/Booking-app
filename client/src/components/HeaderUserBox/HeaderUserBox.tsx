import { FiMenu } from "react-icons/fi";
import user from "../../shared/assets/img/user.png";
import s from "./HeaderUserBox.module.scss";
import { useState } from "react";
import { createPortal } from "react-dom";
import PopupSignup from "../PopupSignup/PopupSignup";
import { Link } from "react-router-dom";
import PopupLogin from "../PopupLogin/PopupLogin";

const HeaderUserBox = () => {
    const [menu, setMenu] = useState<boolean>(false);
    const [openSignup, setOpenSignup] = useState<boolean>(false);
    const [openLogin, setOpenLogin] = useState<boolean>(false);

    const isAuth = false;
    return (
        <>
            <div className={s.user}>
                <button onClick={() => setMenu(!menu)} className={s.user__box}>
                    <FiMenu />
                    <img className={s.user__img} src={user} alt="user" />
                </button>
                <div
                    className={
                        menu
                            ? `${s.user__dropdown} ${s.user__dropdown_active}`
                            : `${s.user__dropdown}`
                    }
                >
                    {isAuth ? null : (
                        <ul className={s.user__list}>
                            <li className={s.user__list_item}>
                                <button
                                    className={s.user__item_link}
                                    onClick={() => setOpenSignup(true)}
                                >
                                    Sign up
                                </button>
                            </li>
                            <li className={s.user__list_item}>
                                <button
                                    className={s.user__item_link}
                                    onClick={() => setOpenLogin(true)}
                                >
                                    Log in
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            {openSignup && createPortal(<PopupSignup setOpen={setOpenSignup} />, document.body)}
            {openLogin && createPortal(<PopupLogin setOpen={setOpenLogin} />, document.body)}
        </>
    );
};

export default HeaderUserBox;
