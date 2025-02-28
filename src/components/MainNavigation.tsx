import { NavLink } from "react-router-dom"


const MainNavigation = () => {
  return (
    <nav className="main-navigation">
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/notes">Notes</NavLink></li>            
            
        </ul>
    </nav>
  )
}

export default MainNavigation