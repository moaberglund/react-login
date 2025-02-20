import { NavLink } from "react-router-dom"

const LoginNavigation = () => {
  return (
    <nav>
        <ul>
            <li><NavLink to="/">Log in</NavLink></li>
        </ul>
    </nav>
  )
}

export default LoginNavigation