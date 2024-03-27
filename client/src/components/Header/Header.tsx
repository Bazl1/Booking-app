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
                        <HeaderUserBox />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
