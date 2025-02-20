import { NavLink } from "react-router-dom"

const LoginNavigation = () => {
  return (
    <nav>
        <ul>
            <li><NavLink to="/">Login</NavLink></li>
            <li><NavLink to="/signup">Sign up</NavLink></li>
        </ul>
    </nav>
  )
}

export default LoginNavigation