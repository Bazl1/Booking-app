import s from "./Header.module.scss";
import { Link } from "react-router-dom";
import logo from "../../shared/assets/img/logo.png";
import HeaderUserBox from "../HeaderUserBox/HeaderUserBox";

const Header = () => {
    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.header__inner}>
                    <Link className={s.header__logo} to={"/"}>
                        <img className={s.header__logo_img} src={logo} alt="logo" />
                    </Link>
                    <nav className={s.header__menu}>
                        <ul className={s.header__list}>
                            <li className={s.header__list_item}>
                                <Link className={s.header__item_link} to={"/"}>
                                    Home
                                </Link>
                            </li>
                            <li className={s.header__list_item}>
                                <Link className={s.header__item_link} to={"#"}>
                                    Catalog
                                </Link>
                            </li>
                        </ul>

                        <HeaderUserBox />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
