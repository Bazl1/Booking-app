import { FiMenu } from "react-icons/fi";
import userImg from "../../shared/assets/img/user.png";
import s from "./HeaderUserBox.module.scss";
import { useState } from "react";
import { createPortal } from "react-dom";
import PopupSignup from "../PopupSignup/PopupSignup";
import { Link } from "react-router-dom";
import PopupLogin from "../PopupLogin/PopupLogin";
import { useUserStore } from "@/store";

const HeaderUserBox = () => {
    const [menu, setMenu] = useState<boolean>(false);
    const [openSignup, setOpenSignup] = useState<boolean>(false);
    const [openLogin, setOpenLogin] = useState<boolean>(false);

    const user = useUserStore((state) => state.user);
    const isAuth = useUserStore((state) => state.isAuth);
    const logout = useUserStore((state) => state.logout);

    return (
        <>
            <div className={s.user}>
                <button onClick={() => setMenu(!menu)} className={s.user__box}>
                    <FiMenu />
                    {user.avatar !== undefined && user.avatar !== null && user.avatar !== "" ? (
                        <img className={s.user__img} src={user.avatar} alt="user" />
                    ) : (
                        <img className={s.user__img} src={userImg} alt="user" />
                    )}
                </button>
                <div
                    className={
                        menu
                            ? `${s.user__dropdown} ${s.user__dropdown_active}`
                            : `${s.user__dropdown}`
                    }
                >
                    {isAuth ? (
                        <ul className={s.user__list}>
                            <li className={s.user__list_item}>
                                <Link
                                    to={"/my-apartments"}
                                    className={s.user__item_link}
                                    onClick={() => setMenu(false)}
                                >
                                    My apartments
                                </Link>
                            </li>
                            <li className={s.user__list_item}>
                                <Link
                                    to={"/my-orders"}
                                    className={s.user__item_link}
                                    onClick={() => setMenu(false)}
                                >
                                    My Orders
                                </Link>
                            </li>
                            <li className={s.user__list_item}>
                                <Link
                                    to={"/favorite"}
                                    className={s.user__item_link}
                                    onClick={() => setMenu(false)}
                                >
                                    My favorites
                                </Link>
                            </li>
                            <li className={s.user__list_item}>
                                <Link
                                    to={"/settings"}
                                    className={s.user__item_link}
                                    onClick={() => setMenu(false)}
                                >
                                    Settings
                                </Link>
                            </li>
                            <li className={s.user__list_item}>
                                <button
                                    className={s.user__item_link}
                                    onClick={() => {
                                        logout();
                                        setMenu(false);
                                    }}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className={s.user__list}>
                            <li className={s.user__list_item}>
                                <button
                                    className={s.user__item_link}
                                    onClick={() => {
                                        setOpenSignup(true);
                                        setMenu(false);
                                    }}
                                >
                                    Sign up
                                </button>
                            </li>
                            <li className={s.user__list_item}>
                                <button
                                    className={s.user__item_link}
                                    onClick={() => {
                                        setOpenLogin(true);
                                        setMenu(false);
                                    }}
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
