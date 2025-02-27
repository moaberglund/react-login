import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import MainNavigation from "../components/MainNavigation";


const MainLayout = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
     <MainNavigation />
     
      <main className="main-layout">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout