import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LoginLayout from "./layouts/LoginLayout";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authLoader } from "./components/auth/authLoader";
import NotePage from "./pages/notes/NotePage";
import NoteDetailPage from "./pages/notes/[id]";
import CreateNotePage from "./pages/notes/create";
import EditNotePage from "./pages/notes/edit";


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
        path: "/notes",
        element: <MainLayout />,
        loader: authLoader,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <NotePage />
                    </ProtectedRoute>)
            },
            {
                path: "create",
                element: (
                    <ProtectedRoute>
                        <CreateNotePage />
                    </ProtectedRoute>
                )
            },
            {
                path: ":id",
                element: (
                    <ProtectedRoute>
                        <NoteDetailPage />
                    </ProtectedRoute>
                )
            },
            {
                path: ":id/edit",
                element: (
                    <ProtectedRoute>
                        <EditNotePage />
                    </ProtectedRoute>
                )
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