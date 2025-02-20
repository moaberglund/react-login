import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <>
    <h1>Main layout</h1>
    <Outlet />
    </>
  )
}

export default MainLayout