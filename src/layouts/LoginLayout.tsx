import { Outlet } from "react-router-dom"
import LoginNavigation from "../components/LoginNavigation"


const LoginLayout = () => {
  return (
    <>
    <LoginNavigation />

    <main className="login-layout">
        <Outlet />
    </main>
    
    
    </>
  )
}

export default LoginLayout