import { useAuth } from "../context/AuthContext"


const LandingPage = () => {

    const {user} = useAuth();

    return (
        <div>
            <h1>Landingpage</h1>
            <p>Welcome {user ? user.username : ""}</p>

            <section style={{ marginTop: '2em' }}>
                <h2>Note to Everyone</h2>
                <p>On this platform you can post Notes that you think Everyone should know about.</p>
            </section>
        </div>
    )
}

export default LandingPage