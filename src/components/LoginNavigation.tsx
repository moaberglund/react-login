import { NavLink } from "react-router-dom"

const LoginNavigation = () => {
  return (
    <nav className="login-navigation">
        <ul>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/signup">Sign up</NavLink></li>
        </ul>
    </nav>
  )
}

export default LoginNavigation