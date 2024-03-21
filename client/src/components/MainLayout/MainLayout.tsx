import Header from "../Header/Header";

const MainLayout = ({ children }: any) => {
    return (
        <div className="wrapper">
            <Header />
            <main className="main">{children}</main>
        </div>
    );
};

export default MainLayout;
