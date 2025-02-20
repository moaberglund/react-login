
import { redirect } from "react-router-dom";

export const authLoader = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return redirect("/login");
    }

    // If the token is present, we can return null to indicate that the user is authenticated
    return null;
};
