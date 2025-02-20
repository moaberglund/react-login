import LoginForm from "../components/LoginForm"
import LoginNavigation from "../components/LoginNavigation"

const LoginPage = () => {
  return (
    <div>
        <LoginNavigation />
        <h1>Login</h1>
        <LoginForm />
    </div>
  )
}

export default LoginPage