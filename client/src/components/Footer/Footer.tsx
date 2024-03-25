import s from "./Footer.module.scss";

const Footer = () => {
    return (
        <footer className={`${s.footer} footer`}>
            <div className="container">
                <div className={s.footer__inner}>
                    <p className={s.footer__copywriting}>© 2024 Booking app</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
