import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authLoader } from "./components/auth/authLoader";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        loader: authLoader,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <LandingPage />
                    </ProtectedRoute>)
            }
        ]
    },
    {
        path: "/login",
        element: <LoginLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />
            },
        ]
    },
    {
        path: "/signup",
        element: <LoginLayout />,
        children: [
            {
                index: true,
                element: <SignupPage />
            },
        ]
    }
])