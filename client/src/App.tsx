import { Suspense, useEffect } from "react";
import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import { useUserStore } from "./store";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SinglePage = lazy(() => import("./pages/SinglePage/SinglePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));
const CreateProductPage = lazy(() => import("./pages/CreateProductPage/CreateProductPage"));
const FavoritePage = lazy(() => import("./pages/FavoritePage/FavoritePage"));
const MyApartmentsPage = lazy(() => import("./pages/MyApartmentsPage/MyApartmentsPage"));
const ChangeProductPage = lazy(() => import("./pages/ChangeProductPage/ChangeProductPage"));
const MyOrderPage = lazy(() => import("./pages/MyOrdersPage/MyOrdersPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage/HistoryPage"));
const BookingCalendarPage = lazy(() => import("./pages/BookingCalendarPage/BookingCalendarPage"));

function App() {
    const refresh = useUserStore((state) => state.refresh);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            refresh();
        }
    }, []);
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    {/* auth */}
                    <Route
                        path="/create-product"
                        element={
                            <MainLayout>
                                <CreateProductPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/change-product/:id"
                        element={
                            <MainLayout>
                                <ChangeProductPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <MainLayout>
                                <HistoryPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/calendar"
                        element={
                            <MainLayout>
                                <BookingCalendarPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/my-orders"
                        element={
                            <MainLayout>
                                <MyOrderPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/my-apartments"
                        element={
                            <MainLayout>
                                <MyApartmentsPage />
                            </MainLayout>
                        }
                    />
                    <Route
                        path="/favorite"
                        element={
                            <MainLayout>
                                <FavoritePage />
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
                    {/* All */}
                    <Route
                        path="/"
                        element={
                            <MainLayout>
                                <HomePage />
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
            </Suspense>
        </Router>
    );
}

export default App;
