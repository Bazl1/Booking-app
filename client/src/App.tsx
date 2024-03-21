import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

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
            </Routes>
        </Router>
    );
}

export default App;
