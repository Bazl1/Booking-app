import { Suspense, lazy, useState } from "react";
import s from "./SettingsPage.module.scss";
import { MdOutlineSecurity } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import GlobalSettings from "@/components/GlobalSettings/GlobalSettings";
import Loader from "@/components/Loader/Loader";

const SecuritySettings = lazy(() => import("@/components/SecuritySettings/SecuritySettings"));

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    return (
        <section className={s.settings}>
            <div className="container">
                <div className={s.settings__inner}>
                    <h2 className={s.settings__title}>Settings</h2>
                    <div className={s.settings__btns}>
                        <button
                            onClick={() => setActiveTab(1)}
                            className={
                                activeTab === 1
                                    ? `${s.settings__btn} ${s.settings__btn_active}`
                                    : `${s.settings__btn}`
                            }
                        >
                            <RiGlobalLine /> Global settings
                        </button>
                        <button
                            onClick={() => setActiveTab(2)}
                            className={
                                activeTab === 2
                                    ? `${s.settings__btn} ${s.settings__btn_active}`
                                    : `${s.settings__btn}`
                            }
                        >
                            <MdOutlineSecurity /> Security settings
                        </button>
                    </div>
                    <div className={s.settings__tabs}>
                        {activeTab === 1 && (
                            <div className={s.settings__tab}>
                                <GlobalSettings />
                            </div>
                        )}
                        {activeTab === 2 && (
                            <div className={s.settings__tab}>
                                <Suspense fallback={<Loader />}>
                                    <SecuritySettings />
                                </Suspense>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SettingsPage;
