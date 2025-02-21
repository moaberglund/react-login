import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";


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
      <h1>Future navigation</h1>
      <main className="main-layout">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout