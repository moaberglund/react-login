import { useAuth } from "../context/AuthContext"


const LandingPage = () => {

    const {user, logout} = useAuth();

    return (
        <div>
            <h1>Landingpage</h1>
            <p>Welcome {user ? user.username : ""}</p>

            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default LandingPage