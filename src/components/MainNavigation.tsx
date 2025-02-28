import { NavLink } from "react-router-dom"


const MainNavigation = () => {
  return (
    <header>
      <nav className="main-navigation">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/notes">Notes</NavLink></li>

        </ul>
      </nav>
      
    </header>
  )
}

export default MainNavigation