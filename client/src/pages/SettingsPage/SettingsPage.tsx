import s from "./SettingsPage.module.scss";
import { MdOutlineSecurity } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import GlobalSettings from "@/components/GlobalSettings/GlobalSettings";

const SettingsPage = () => {
    return (
        <section className={s.settings}>
            <div className="container">
                <div className={s.settings__inner}>
                    <h2 className={s.settings__title}>Settings</h2>
                    <div className={s.settings__btns}>
                        <button className={`${s.settings__btn} ${s.settings__btn_active}`}>
                            <RiGlobalLine /> Global settings
                        </button>
                        <button className={s.settings__btn}>
                            <MdOutlineSecurity /> Security settings
                        </button>
                    </div>
                    <div className={s.settings__tabs}>
                        <div className={s.settings__tab}>
                            <GlobalSettings />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SettingsPage;
