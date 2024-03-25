import { useEffect } from "react";
import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { useUserStore } from "./store";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SinglePage = lazy(() => import("./pages/SinglePage/SinglePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));

function App() {
    // const refresh = useUserStore((state) => state.refresh);
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (token) {
    //         refresh();
    //     }
    // }, []);
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout>
                            <HomePage />
                        </MainLayout>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <MainLayout>
                            <SettingsPage />
                        </MainLayout>
                    }
                />
                <Route
                    path="/rooms/:id"
                    element={
                        <MainLayout>
                            <SinglePage />
                        </MainLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
