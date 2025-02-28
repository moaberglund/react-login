import { useAuth } from "../context/AuthContext"


const LandingPage = () => {

    const {user} = useAuth();

    return (
        <div>
            <h1>Landingpage</h1>
            <p>Welcome {user ? user.username : ""}</p>
        </div>
    )
}

export default LandingPage