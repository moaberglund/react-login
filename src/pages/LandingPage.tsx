import { useAuth } from "../context/AuthContext"


const LandingPage = () => {

    const {logout} = useAuth();

    return (
        <div>
            <h1>Landingpage</h1>

            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default LandingPage