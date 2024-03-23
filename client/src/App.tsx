import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SinglePage = lazy(() => import("./pages/SinglePage/SinglePage"));

function App() {
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
