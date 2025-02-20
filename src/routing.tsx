import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
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