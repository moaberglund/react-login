import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { FaPowerOff  } from "react-icons/fa6";


const MainNavigation = () => {

  const { logout } = useAuth();

  return (
    <header>
      <nav className="main-navigation">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/notes">Notes</NavLink></li>
          <li className="logout" onClick={logout}><FaPowerOff /></li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation