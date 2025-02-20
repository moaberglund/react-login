import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoginLayout from "./layouts/LoginLayout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginLayout />,
        children: [
            {
                path: "/",
                element: <LoginPage />
            },
            {
                path: "/signup",
                element: <SignupPage />
            }
        ]
    }
])