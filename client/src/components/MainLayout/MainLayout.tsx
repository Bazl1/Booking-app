import Header from "../Header/Header";
import { Toaster } from "react-hot-toast";

const MainLayout = ({ children }: any) => {
    return (
        <div className="wrapper">
            <Header />
            <main className="main">{children}</main>
            <Toaster position="bottom-left" reverseOrder={false} />
        </div>
    );
};

export default MainLayout;
